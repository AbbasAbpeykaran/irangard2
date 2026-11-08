import { Stack, useRouter } from 'expo-router';
import {
  Alert,
  GestureResponderEvent,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMemo, useState } from 'react';
import { cities } from '../data/cities';
import provincesData from '../data/provinces.json';
import { toPersianDigits, useVisited } from '../lib/visited';

type ProvinceShape = {
  code: string;
  name: string;
  nameEn: string;
  polygons: { outer: number[][]; holes: number[][][] }[];
};

type MapLayout = { width: number; height: number };

const provinces = provincesData as unknown as ProvinceShape[];
const provinceMasks: Record<string, number> = {
  'IR-01': require('../../assets/images/province-masks/IR-01.png'),
  'IR-02': require('../../assets/images/province-masks/IR-02.png'),
  'IR-03': require('../../assets/images/province-masks/IR-03.png'),
  'IR-04': require('../../assets/images/province-masks/IR-04.png'),
  'IR-05': require('../../assets/images/province-masks/IR-05.png'),
  'IR-06': require('../../assets/images/province-masks/IR-06.png'),
  'IR-07': require('../../assets/images/province-masks/IR-07.png'),
  'IR-08': require('../../assets/images/province-masks/IR-08.png'),
  'IR-09': require('../../assets/images/province-masks/IR-09.png'),
  'IR-10': require('../../assets/images/province-masks/IR-10.png'),
  'IR-11': require('../../assets/images/province-masks/IR-11.png'),
  'IR-12': require('../../assets/images/province-masks/IR-12.png'),
  'IR-13': require('../../assets/images/province-masks/IR-13.png'),
  'IR-14': require('../../assets/images/province-masks/IR-14.png'),
  'IR-15': require('../../assets/images/province-masks/IR-15.png'),
  'IR-16': require('../../assets/images/province-masks/IR-16.png'),
  'IR-17': require('../../assets/images/province-masks/IR-17.png'),
  'IR-18': require('../../assets/images/province-masks/IR-18.png'),
  'IR-19': require('../../assets/images/province-masks/IR-19.png'),
  'IR-20': require('../../assets/images/province-masks/IR-20.png'),
  'IR-21': require('../../assets/images/province-masks/IR-21.png'),
  'IR-22': require('../../assets/images/province-masks/IR-22.png'),
  'IR-23': require('../../assets/images/province-masks/IR-23.png'),
  'IR-24': require('../../assets/images/province-masks/IR-24.png'),
  'IR-25': require('../../assets/images/province-masks/IR-25.png'),
  'IR-26': require('../../assets/images/province-masks/IR-26.png'),
  'IR-27': require('../../assets/images/province-masks/IR-27.png'),
  'IR-28': require('../../assets/images/province-masks/IR-28.png'),
  'IR-29': require('../../assets/images/province-masks/IR-29.png'),
  'IR-30': require('../../assets/images/province-masks/IR-30.png'),
  'IR-31': require('../../assets/images/province-masks/IR-31.png'),
};
const MAP_WIDTH = 1200;
const MAP_HEIGHT = 900;
// These bounds and plot margins match assets/images/iran-atlas-offline.png.
const MIN_LAT = 25.0593;
const MAX_LAT = 39.7817;
const MIN_LON = 44.0319;
const MAX_LON = 63.3333;
const MAP_LEFT = 62;
const MAP_RIGHT = 1138;
const MAP_TOP = 38;
const MAP_BOTTOM = 862;

const palette = {
  background: '#F6F3EB',
  paper: '#FFFCF5',
  ink: '#203B33',
  muted: '#78867E',
  forest: '#194D40',
  forestLight: '#2F725F',
  mint: '#E3EEE7',
  gold: '#D4A66C',
  terracotta: '#C87855',
  line: '#E8E5DC',
  neutral: '#9AA69E',
};

function pointInRing(latitude: number, longitude: number, ring: number[][]): boolean {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [latI, lonI] = ring[i];
    const [latJ, lonJ] = ring[j];
    const crosses = (latI > latitude) !== (latJ > latitude);
    if (!crosses) continue;
    const intersectionLongitude =
      ((lonJ - lonI) * (latitude - latI)) / (latJ - latI) + lonI;
    if (longitude < intersectionLongitude) inside = !inside;
  }
  return inside;
}

function provinceAt(latitude: number, longitude: number): ProvinceShape | undefined {
  return provinces.find((province) =>
    province.polygons.some((polygon) => {
      const inOuter = pointInRing(latitude, longitude, polygon.outer);
      const inHole = polygon.holes.some((hole) => pointInRing(latitude, longitude, hole));
      return inOuter && !inHole;
    }),
  );
}

function projectPoint(latitude: number, longitude: number) {
  return {
    left: ((longitude - MIN_LON) / (MAX_LON - MIN_LON)) *
      ((MAP_RIGHT - MAP_LEFT) / MAP_WIDTH) * 100 + (MAP_LEFT / MAP_WIDTH) * 100,
    top: ((MAX_LAT - latitude) / (MAX_LAT - MIN_LAT)) *
      ((MAP_BOTTOM - MAP_TOP) / MAP_HEIGHT) * 100 + (MAP_TOP / MAP_HEIGHT) * 100,
  };
}

function provinceCenter(province: ProvinceShape) {
  const largest = province.polygons.reduce((best, current) =>
    current.outer.length > best.outer.length ? current : best,
  );
  const points = largest.outer;
  return {
    latitude: points.reduce((sum, point) => sum + point[0], 0) / points.length,
    longitude: points.reduce((sum, point) => sum + point[1], 0) / points.length,
  };
}

function provincePercent(provinceCode: string, visited: string[]): number {
  const attractions = cities
    .filter((city) => city.provinceCode === provinceCode)
    .flatMap((city) => city.attractions);
  if (attractions.length === 0) return 0;
  const done = attractions.filter((place) => visited.includes(place.id)).length;
  return Math.round((done / attractions.length) * 100);
}

function provinceTint(percent: number): string {
  const start = { r: 211, g: 214, b: 211 };
  const end = { r: 35, g: 119, b: 87 };
  const amount = Math.max(0, Math.min(100, percent)) / 100;
  const channel = (a: number, b: number) => Math.round(a + (b - a) * amount);
  return `#${[channel(start.r, end.r), channel(start.g, end.g), channel(start.b, end.b)]
    .map((value) => value.toString(16).padStart(2, '0')).join('')}`;
}

export default function MapScreen() {
  const router = useRouter();
  const { visited } = useVisited();
  const [query, setQuery] = useState('');
  const [selectedCode, setSelectedCode] = useState('IR-14');
  const [mapLayout, setMapLayout] = useState<MapLayout>({ width: 0, height: 0 });

  const readyCodes = useMemo(
    () => new Set(cities.map((city) => city.provinceCode)),
    [],
  );
  const selectedProvince = provinces.find((province) => province.code === selectedCode) ?? provinces[0];
  const selectedCity = cities.find((city) => city.provinceCode === selectedProvince.code);
  const selectedCenter = provinceCenter(selectedProvince);
  const markerPosition = projectPoint(selectedCenter.latitude, selectedCenter.longitude);
  const selectedAttractions = cities
    .filter((city) => city.provinceCode === selectedProvince.code)
    .flatMap((city) => city.attractions);
  const selectedPercent = provincePercent(selectedProvince.code, visited);
  const visitedAttractions = selectedAttractions.filter((place) => visited.includes(place.id)).length;

  const searchResults = useMemo(() => {
    const normalize = (value: string) => value
      .toLocaleLowerCase()
      .replace(/[ي]/g, 'ی')
      .replace(/[ك]/g, 'ک')
      .replace(/[ۀة]/g, 'ه')
      .replace(/[‌\s]+/g, ' ')
      .trim();
    const normalized = normalize(query);
    if (!normalized) return [] as Array<
      | { kind: 'province'; id: string; title: string; subtitle: string; code: string }
      | { kind: 'city'; id: string; title: string; subtitle: string; code: string }
      | { kind: 'attraction'; id: string; title: string; subtitle: string; cityId: string; code: string }
    >;

    const results: Array<
      | { kind: 'province'; id: string; title: string; subtitle: string; code: string }
      | { kind: 'city'; id: string; title: string; subtitle: string; code: string }
      | { kind: 'attraction'; id: string; title: string; subtitle: string; cityId: string; code: string }
    > = [];
    for (const province of provinces) {
      if (normalize(province.name).includes(normalized) || normalize(province.nameEn).includes(normalized)) {
        results.push({ kind: 'province', id: province.code, title: province.name, subtitle: 'استان', code: province.code });
      }
    }
    for (const city of cities) {
      const province = provinces.find((item) => item.code === city.provinceCode);
      if (normalize(city.name).includes(normalized)) {
        results.push({ kind: 'city', id: city.id, title: city.name, subtitle: `شهر • ${province?.name ?? ''}`, code: city.provinceCode });
      }
      for (const place of city.attractions) {
        if (normalize(place.name).includes(normalized) || normalize(place.description).includes(normalized) || (place.tags ?? []).some((tag) => normalize(tag).includes(normalized))) {
          results.push({ kind: 'attraction', id: place.id, title: place.name, subtitle: `جاذبه • ${city.name}`, cityId: city.id, code: city.provinceCode });
        }
      }
    }
    return results.slice(0, 12);
  }, [query]);

  const selectProvince = (province: ProvinceShape) => setSelectedCode(province.code);

  const handleMapPress = (event: GestureResponderEvent) => {
    if (!mapLayout.width || !mapLayout.height) return;
    const imageX = (event.nativeEvent.locationX / mapLayout.width) * MAP_WIDTH;
    const imageY = (event.nativeEvent.locationY / mapLayout.height) * MAP_HEIGHT;
    if (
      imageX < MAP_LEFT || imageX > MAP_RIGHT ||
      imageY < MAP_TOP || imageY > MAP_BOTTOM
    ) return;

    const longitude = MIN_LON +
      ((imageX - MAP_LEFT) / (MAP_RIGHT - MAP_LEFT)) * (MAX_LON - MIN_LON);
    const latitude = MAX_LAT -
      ((imageY - MAP_TOP) / (MAP_BOTTOM - MAP_TOP)) * (MAX_LAT - MIN_LAT);
    const province = provinceAt(latitude, longitude);
    if (province) selectProvince(province);
  };

  const openGuide = () => {
    if (selectedCity) {
      router.push(`/city/${selectedCity.id}`);
      return;
    }
    Alert.alert(
      `استان ${selectedProvince.name}`,
      'راهنمای گردشگری این استان هنوز تکمیل نشده است. نقشه‌ی استان و نام آن در اطلس آفلاین در دسترس است و اطلاعات سفر به‌مرور اضافه می‌شود.',
      [{ text: 'متوجه شدم' }],
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <Stack.Screen
        options={{
          title: 'اطلس پیشرفت ایران',
          headerShown: true,
          headerStyle: { backgroundColor: palette.background },
          headerTintColor: palette.ink,
          headerTitleStyle: { fontWeight: '900' },
        }}
      />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.introRow}>
          <View style={styles.introCopy}>
            <Text style={styles.eyebrow}>اطلس تعاملی ایران</Text>
            <Text style={styles.title}>ایران را لمس کن، کشف کن</Text>
            <Text style={styles.subtitle}>روی نقشه یکی از ۳۱ استان را انتخاب کن.</Text>
          </View>
          <View style={styles.offlineBadge}>
            <Text style={styles.offlineIcon}>⌁</Text>
            <Text style={styles.offlineText}>آفلاین</Text>
          </View>
        </View>

        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>⌕</Text>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="جست‌وجوی استان یا شهر..."
            placeholderTextColor="#9AA39B"
            style={styles.searchInput}
            textAlign="right"
            returnKeyType="search"
            accessibilityLabel="جست‌وجوی استان یا شهر در اطلس"
          />
          {!!query && (
            <Pressable onPress={() => setQuery('')} hitSlop={10} accessibilityLabel="پاک‌کردن جست‌وجو">
              <Text style={styles.clearSearch}>×</Text>
            </Pressable>
          )}
        </View>

        {!!query.trim() && (
          <View style={styles.searchResults}>
            <Text style={styles.searchResultsTitle}>نتیجه جست‌وجو • استان، شهر و جاذبه</Text>
            {searchResults.length ? searchResults.map((result) => (
              <Pressable
                key={`${result.kind}-${result.id}`}
                onPress={() => {
                  if (result.kind === 'attraction' || result.kind === 'city') {
                    setSelectedCode(result.code);
                    router.push(`/city/${result.kind === 'attraction' ? result.cityId : result.id}`);
                  } else {
                    setSelectedCode(result.code);
                  }
                  setQuery('');
                }}
                style={({ pressed }) => [styles.searchResultItem, pressed && styles.pressed]}
                accessibilityRole="button"
              >
                <Text style={styles.searchResultArrow}>←</Text>
                <View style={styles.searchResultCopy}>
                  <Text style={styles.searchResultName}>{result.title}</Text>
                  <Text style={styles.searchResultSubtitle}>{result.subtitle}</Text>
                </View>
              </Pressable>
            )) : (
              <Text style={styles.searchResultsEmpty}>موردی با این نام در راهنماهای فعلی پیدا نشد.</Text>
            )}
          </View>
        )}

        <View style={styles.mapFrame}>
          <Pressable
            style={styles.mapPressable}
            onLayout={(event) =>
              setMapLayout({
                width: event.nativeEvent.layout.width,
                height: event.nativeEvent.layout.height,
              })
            }
            onPress={handleMapPress}
            accessibilityRole="imagebutton"
            accessibilityLabel="نقشه تعاملی آفلاین ایران؛ برای انتخاب استان روی نقشه لمس کنید"
          >
            <Image
              source={require('../../assets/images/iran-atlas-grayscale.png')}
              style={styles.mapImage}
              resizeMode="stretch"
              accessibilityIgnoresInvertColors
            />
            {provinces.map((province) => (
              <Image
                key={province.code}
                source={provinceMasks[province.code]}
                style={[styles.provinceOverlay, { tintColor: provinceTint(provincePercent(province.code, visited)) }]}
                resizeMode="stretch"
                fadeDuration={0}
                accessible={false}
              />
            ))}
            <View
              pointerEvents="none"
              style={[
                styles.selectedMarker,
                { left: `${markerPosition.left}%`, top: `${markerPosition.top}%` },
              ]}
            >
              <View style={styles.selectedMarkerCore} />
            </View>
          </Pressable>
          <View style={styles.mapCaption} pointerEvents="none">
            <Text style={styles.mapCaptionText}>رنگ هر استان بر اساس درصد بازدید توست</Text>
            <Text style={styles.mapCaptionSpark}>✦</Text>
          </View>
        </View>

        <View style={styles.mapLegend}>
          <Text style={styles.legendTitle}>میزان بازدید استان‌ها</Text>
          <View style={styles.legendScale}>
            <View style={styles.legendItem}><View style={[styles.legendSwatch, { backgroundColor: '#D3D6D3' }]} /><Text style={styles.legendText}>۰٪</Text></View>
            <View style={styles.legendItem}><View style={[styles.legendSwatch, { backgroundColor: '#A4BDB1' }]} /><Text style={styles.legendText}>۲۵٪</Text></View>
            <View style={styles.legendItem}><View style={[styles.legendSwatch, { backgroundColor: '#759F8B' }]} /><Text style={styles.legendText}>۵۰٪</Text></View>
            <View style={styles.legendItem}><View style={[styles.legendSwatch, { backgroundColor: '#4D896D' }]} /><Text style={styles.legendText}>۷۵٪</Text></View>
            <View style={styles.legendItem}><View style={[styles.legendSwatch, { backgroundColor: '#237757' }]} /><Text style={styles.legendText}>۱۰۰٪</Text></View>
          </View>
        </View>

        <View style={styles.selectedCard}>
          <View style={styles.selectedCardTop}>
            <View style={styles.selectedTitleBlock}>
              <Text style={styles.selectedEyebrow}>استان انتخاب‌شده</Text>
              <Text style={styles.selectedName}>{selectedProvince.name}</Text>
              <Text style={styles.selectedMeta}>
                {selectedCity
                  ? `${toPersianDigits(selectedAttractions.length)} جاذبه در راهنمای فعلی`
                  : 'راهنمای گردشگری در حال تکمیل'}
              </Text>
            </View>
            <View style={[styles.guideStatus, selectedCity ? styles.guideReady : styles.guideSoon]}>
              <Text style={[styles.guideStatusText, selectedCity ? styles.guideReadyText : styles.guideSoonText]}>
                {selectedCity ? 'راهنمای آماده' : 'به‌زودی'}
              </Text>
            </View>
          </View>

          {selectedAttractions.length > 0 ? (
            <View style={styles.selectedProgressArea}>
              <View style={styles.selectedProgressTop}>
                <Text style={styles.selectedProgressLabel}>ردپای سفر تو</Text>
                <Text style={styles.selectedProgressValue}>{toPersianDigits(selectedPercent)}٪</Text>
              </View>
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: `${selectedPercent}%` }]} />
              </View>
              <Text style={styles.selectedProgressHint}>
                {toPersianDigits(visitedAttractions)} از {toPersianDigits(selectedAttractions.length)} جاذبه بازدیدشده
              </Text>
            </View>
          ) : null}

          <Pressable
            onPress={openGuide}
            style={({ pressed }) => [styles.openGuideButton, pressed && styles.pressed]}
            accessibilityRole="button"
          >
            <Text style={styles.openGuideButtonText}>
              {selectedCity ? 'بازکردن راهنمای استان' : 'اطلاعات این استان به‌زودی'}
            </Text>
            <Text style={styles.openGuideArrow}>←</Text>
          </Pressable>
        </View>

        {!query.trim() && (
          <>
            <View style={styles.sectionHeading}>
              <View>
                <Text style={styles.sectionTitle}>استان‌ها را پیدا کن</Text>
                <Text style={styles.sectionSubtitle}>۳۱ استان در فهرست</Text>
              </View>
              <Text style={styles.sectionHint}>انتخاب سریع</Text>
            </View>

            <View style={styles.provinceGrid}>
              {provinces.map((province) => {
                const isSelected = province.code === selectedCode;
                const hasGuide = readyCodes.has(province.code);
                return (
                  <Pressable
                    key={province.code}
                    onPress={() => selectProvince(province)}
                    style={({ pressed }) => [
                      styles.provinceChip,
                      isSelected && styles.provinceChipSelected,
                      pressed && styles.pressed,
                    ]}
                    accessibilityRole="button"
                    accessibilityState={{ selected: isSelected }}
                    accessibilityLabel={`${province.name}${hasGuide ? '، راهنمای آماده' : '، راهنمای در حال تکمیل'}`}
                  >
                    <View style={[styles.provinceDot, hasGuide && styles.provinceDotReady]} />
                    <Text style={[styles.provinceChipText, isSelected && styles.provinceChipTextSelected]}>
                      {province.name}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </>
        )}

        <View style={styles.offlineNote}>
          <View style={styles.offlineNoteIcon}>
            <Text style={styles.offlineNoteIconText}>✓</Text>
          </View>
          <View style={styles.offlineNoteCopy}>
            <Text style={styles.offlineNoteTitle}>همراه تو، حتی بدون اینترنت</Text>
            <Text style={styles.offlineNoteText}>
              نقشه، نام استان‌ها و راهنماهای فعلی داخل برنامه هستند؛ بازدیدها هم روی همین گوشی ذخیره می‌شوند.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: palette.background },
  content: { paddingHorizontal: 16, paddingTop: 13, paddingBottom: 34, gap: 15 },
  introRow: { flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between', gap: 10 },
  introCopy: { flex: 1, gap: 3 },
  eyebrow: { color: palette.terracotta, fontSize: 10, fontWeight: '900', textAlign: 'right' },
  title: { color: palette.ink, fontSize: 20, fontWeight: '900', textAlign: 'right' },
  subtitle: { color: palette.muted, fontSize: 11, textAlign: 'right' },
  offlineBadge: {
    flexDirection: 'row-reverse', alignItems: 'center', gap: 5,
    backgroundColor: palette.mint, borderRadius: 99, paddingHorizontal: 11, paddingVertical: 8,
  },
  offlineIcon: { color: palette.forest, fontSize: 17, fontWeight: '900' },
  offlineText: { color: palette.forest, fontSize: 10, fontWeight: '900' },
  searchBox: {
    minHeight: 48, borderRadius: 15, backgroundColor: '#FFFFFF', borderWidth: 1,
    borderColor: palette.line, paddingHorizontal: 13, flexDirection: 'row-reverse',
    alignItems: 'center', gap: 9,
  },
  searchIcon: { color: palette.forestLight, fontSize: 25, lineHeight: 28 },
  searchInput: { flex: 1, color: palette.ink, fontSize: 13, paddingVertical: 9 },
  clearSearch: { color: palette.muted, fontSize: 23, paddingHorizontal: 2 },
  searchResults: {
    backgroundColor: '#FFFFFF', borderRadius: 14, borderWidth: 1,
    borderColor: palette.line, padding: 10, gap: 6,
  },
  searchResultsTitle: { color: palette.muted, fontSize: 10, fontWeight: '900', textAlign: 'right' },
  searchResultItem: {
    minHeight: 38, flexDirection: 'row-reverse', alignItems: 'center',
    justifyContent: 'space-between', paddingHorizontal: 10, borderRadius: 10,
    backgroundColor: '#F5F7F3',
  },
  searchResultCopy: { flex: 1, alignItems: 'flex-end', gap: 2 },
  searchResultName: { color: palette.ink, fontSize: 12, fontWeight: '800', textAlign: 'right' },
  searchResultSubtitle: { color: palette.muted, fontSize: 10, textAlign: 'right' },
  searchResultArrow: { color: palette.forestLight, fontSize: 16 },
  searchResultsEmpty: { color: palette.muted, fontSize: 11, textAlign: 'right', paddingVertical: 8 },
  mapFrame: {
    width: '100%', aspectRatio: 4 / 3, borderRadius: 22, overflow: 'hidden',
    backgroundColor: '#EEE9DB', borderWidth: 1, borderColor: '#E8E0CF',
  },
  mapPressable: { flex: 1 },
  mapImage: { width: '100%', height: '100%' },
  provinceOverlay: { position: 'absolute', width: '100%', height: '100%', opacity: 0.92 },
  mapLegend: { backgroundColor: '#FFFCF5', borderRadius: 14, borderWidth: 1, borderColor: palette.line, padding: 11, gap: 8 },
  legendTitle: { color: palette.ink, fontSize: 10, fontWeight: '900', textAlign: 'right' },
  legendScale: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center' },
  legendItem: { alignItems: 'center', gap: 4 },
  legendSwatch: { width: 27, height: 9, borderRadius: 5 },
  legendText: { color: palette.muted, fontSize: 9, fontWeight: '700' },
  selectedMarker: {
    position: 'absolute', width: 22, height: 22, marginLeft: -11, marginTop: -11,
    borderRadius: 11, backgroundColor: 'rgba(255,252,245,0.86)',
    borderWidth: 2, borderColor: palette.terracotta, alignItems: 'center', justifyContent: 'center',
  },
  selectedMarkerCore: { width: 8, height: 8, borderRadius: 4, backgroundColor: palette.terracotta },
  mapCaption: {
    position: 'absolute', bottom: 9, right: 10, flexDirection: 'row-reverse', alignItems: 'center',
    gap: 6, borderRadius: 99, paddingHorizontal: 10, paddingVertical: 6,
    backgroundColor: 'rgba(255,252,245,0.91)',
  },
  mapCaptionText: { color: palette.ink, fontSize: 9, fontWeight: '800' },
  mapCaptionSpark: { color: palette.terracotta, fontSize: 12 },
  selectedCard: {
    backgroundColor: palette.paper, borderRadius: 19, padding: 15,
    borderWidth: 1, borderColor: palette.line, gap: 12,
  },
  selectedCardTop: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 },
  selectedTitleBlock: { flex: 1, gap: 3 },
  selectedEyebrow: { color: palette.muted, fontSize: 10, textAlign: 'right' },
  selectedName: { color: palette.ink, fontSize: 21, fontWeight: '900', textAlign: 'right' },
  selectedMeta: { color: palette.muted, fontSize: 10, textAlign: 'right' },
  guideStatus: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 99 },
  guideReady: { backgroundColor: '#E4F0E7' },
  guideSoon: { backgroundColor: '#F1EDE3' },
  guideStatusText: { fontSize: 9, fontWeight: '900' },
  guideReadyText: { color: palette.forestLight },
  guideSoonText: { color: '#887C67' },
  selectedProgressArea: { gap: 6 },
  selectedProgressTop: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center' },
  selectedProgressLabel: { color: palette.muted, fontSize: 10 },
  selectedProgressValue: { color: palette.forestLight, fontSize: 12, fontWeight: '900' },
  progressTrack: { height: 7, borderRadius: 99, backgroundColor: '#E8E9DF', overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 99, backgroundColor: palette.forestLight },
  selectedProgressHint: { color: palette.muted, fontSize: 9, textAlign: 'right' },
  openGuideButton: {
    minHeight: 43, borderRadius: 13, backgroundColor: palette.forest,
    flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'center', gap: 9,
  },
  openGuideButtonText: { color: '#FFFFFF', fontSize: 11, fontWeight: '900' },
  openGuideArrow: { color: '#F1D4A6', fontSize: 17 },
  sectionHeading: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 },
  sectionTitle: { color: palette.ink, fontSize: 15, fontWeight: '900', textAlign: 'right' },
  sectionSubtitle: { color: palette.muted, fontSize: 10, textAlign: 'right', marginTop: 2 },
  sectionHint: { color: palette.terracotta, fontSize: 10, fontWeight: '800' },
  provinceGrid: { flexDirection: 'row-reverse', flexWrap: 'wrap', gap: 8 },
  provinceChip: {
    flexDirection: 'row-reverse', alignItems: 'center', gap: 7,
    backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: palette.line,
    paddingHorizontal: 10, paddingVertical: 9, borderRadius: 12,
  },
  provinceChipSelected: { backgroundColor: '#E5EFE7', borderColor: '#A8C7B1' },
  provinceDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#C9C8BD' },
  provinceDotReady: { backgroundColor: '#5F9C77' },
  provinceChipText: { color: '#53645B', fontSize: 10, fontWeight: '700' },
  provinceChipTextSelected: { color: palette.forest, fontWeight: '900' },
  emptyState: { paddingVertical: 23, backgroundColor: '#FFFFFF', borderRadius: 15, alignItems: 'center', gap: 5 },
  emptyStateTitle: { color: palette.ink, fontWeight: '900', fontSize: 13 },
  emptyStateText: { color: palette.muted, fontSize: 10 },
  offlineNote: {
    flexDirection: 'row-reverse', alignItems: 'center', gap: 10,
    padding: 13, borderRadius: 16, backgroundColor: '#EAF0E8',
  },
  offlineNoteIcon: {
    width: 31, height: 31, borderRadius: 11, backgroundColor: palette.forest,
    alignItems: 'center', justifyContent: 'center',
  },
  offlineNoteIconText: { color: '#FFFFFF', fontSize: 17, fontWeight: '900' },
  offlineNoteCopy: { flex: 1, gap: 3 },
  offlineNoteTitle: { color: palette.forest, fontSize: 11, fontWeight: '900', textAlign: 'right' },
  offlineNoteText: { color: '#67776D', fontSize: 9, lineHeight: 16, textAlign: 'right' },
  pressed: { opacity: 0.84 },
});
