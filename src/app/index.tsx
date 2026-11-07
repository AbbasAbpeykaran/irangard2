import { Stack, useRouter } from 'expo-router';
import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProgressBar from '../components/ProgressBar';
import { cities } from '../data/cities';
import provincesData from '../data/provinces.json';
import { toPersianDigits, useVisited } from '../lib/visited';

type Province = {
  code: string;
  name: string;
  nameEn: string;
  polygons: { outer: number[][]; holes: number[][][] }[];
};

const provinces = provincesData as unknown as Province[];
const palette = {
  background: '#F6F3EB',
  surface: '#FFFFFF',
  ink: '#203B33',
  muted: '#78867E',
  forest: '#194D40',
  forestLight: '#2F725F',
  mint: '#E3EEE7',
  sand: '#E9D9BE',
  terracotta: '#C87855',
  line: '#E8E5DC',
};

export default function HomeScreen() {
  const router = useRouter();
  const { visited } = useVisited();
  const totalAttractions = cities.reduce(
    (total, city) => total + city.attractions.length,
    0,
  );
  const visitedCount = cities.reduce(
    (total, city) =>
      total + city.attractions.filter((place) => visited.includes(place.id)).length,
    0,
  );
  const overall =
    totalAttractions === 0
      ? 0
      : Math.round((visitedCount / totalAttractions) * 100);
  const readyCount = new Set(cities.map((city) => city.provinceCode)).size;


  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="dark-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.topBar}>
          <View style={styles.brandBlock}>
            <View style={styles.brandMark}>
              <Text style={styles.brandMarkText}>✦</Text>
            </View>
            <View>
              <Text style={styles.brandName}>ایرانگرد</Text>
              <Text style={styles.brandSubtitle}>قصه‌ی سفرهای تو</Text>
            </View>
          </View>
          <View style={styles.topBadge}>
            <Text style={styles.topBadgeText}>اطلس آفلاین ایران</Text>
          </View>
        </View>

        <View style={styles.heroCard}>
          <View style={styles.heroGlow} />
          <Image
            source={require('../../assets/images/iran-provinces-illustration.png')}
            style={styles.heroMap}
            resizeMode="contain"
            accessibilityLabel="نقشه رنگی استان‌های ایران"
          />
          <View style={styles.heroCopy}>
            <View style={styles.heroEyebrow}>
              <Text style={styles.heroEyebrowText}>سفر از اینجا شروع می‌شود</Text>
            </View>
            <Text style={styles.heroTitle}>ایران، هزار رنگِ کشف‌کردنی</Text>
            <Text style={styles.heroDescription}>
              از شهرهای تاریخی تا طبیعت شگفت‌انگیز؛ مقصد بعدی‌ات را پیدا کن.
            </Text>
            <Pressable
              onPress={() => router.push('/map')}
              style={({ pressed }) => [styles.heroButton, pressed && styles.pressed]}
              accessibilityRole="button"
            >
              <Text style={styles.heroButtonText}>رفتن به نقشه</Text>
              <Text style={styles.heroButtonArrow}>←</Text>
            </Pressable>
          </View>
          <Text style={styles.heroFootnote}>۳۱ استان • نقشه و راهنماهای فعلی، آفلاین</Text>
        </View>

        <View style={styles.sectionHeadingRow}>
          <View>
            <Text style={styles.sectionTitle}>گزارش سفرهای تو</Text>
            <Text style={styles.sectionSubtitle}>هر جاذبه، یک خاطره‌ی تازه</Text>
          </View>
          <View style={styles.progressPercentPill}>
            <Text style={styles.progressPercentText}>{toPersianDigits(overall)}٪</Text>
          </View>
        </View>

        <View style={styles.progressCard}>
          <View style={styles.progressTopRow}>
            <View style={styles.progressIcon}>
              <Text style={styles.progressIconText}>✧</Text>
            </View>
            <View style={styles.progressCopy}>
              <Text style={styles.progressTitle}>ردپای تو در ایران</Text>
              <Text style={styles.progressCaption}>
                {toPersianDigits(visitedCount)} از {toPersianDigits(totalAttractions)} جاذبه‌ی ثبت‌شده
              </Text>
            </View>
          </View>
          <ProgressBar percent={overall} color={palette.forestLight} height={9} />
          <View style={styles.progressBottomRow}>
            <Text style={styles.progressBottomText}>پیشرفت راهنمای فعلی</Text>
            <Text style={styles.progressBottomText}>{toPersianDigits(readyCount)} از {toPersianDigits(provinces.length)} استان دارای راهنما</Text>
          </View>
        </View>

        <View style={styles.offlineCard}>
          <View style={styles.offlineCardIcon}>
            <Text style={styles.offlineCardIconText}>✓</Text>
          </View>
          <View style={styles.offlineCardCopy}>
            <Text style={styles.offlineCardTitle}>همراه تو، حتی بدون اینترنت</Text>
            <Text style={styles.offlineCardText}>
              نقشه، استان‌ها و راهنماهای فعلی داخل برنامه‌اند؛ بازدیدها هم روی همین گوشی ذخیره می‌شوند.
            </Text>
          </View>
        </View>

        <View style={styles.sectionHeadingRow}>
          <View>
            <Text style={styles.sectionTitle}>یک مقصد برای شروع</Text>
            <Text style={styles.sectionSubtitle}>پیشنهاد ایرانگرد برای اولین قدم</Text>
          </View>
          <Text style={styles.sectionAccent}>پیشنهاد</Text>
        </View>

        <Pressable
          style={({ pressed }) => [styles.featuredCard, pressed && styles.pressed]}
          onPress={() => router.push('/city/shiraz')}
          accessibilityRole="button"
        >
          <Image
            source={require('../../assets/images/shiraz-stained-glass.png')}
            style={styles.featuredArt}
            resizeMode="contain"
          />
          <View style={styles.featuredShade} />
          <View style={styles.featuredContent}>
            <View style={styles.featuredTag}>
              <Text style={styles.featuredTagText}>راهنمای آماده‌ی سفر</Text>
            </View>
            <Text style={styles.featuredTitle}>شیراز</Text>
            <Text style={styles.featuredSubtitle}>شهر شعر، باغ و رنگ</Text>
            <View style={styles.featuredAction}>
              <Text style={styles.featuredActionText}>دیدن جاذبه‌ها</Text>
              <Text style={styles.featuredActionArrow}>←</Text>
            </View>
          </View>
          <View style={styles.featuredCount}>
            <Text style={styles.featuredCountNumber}>{toPersianDigits(cities[0]?.attractions.length ?? 0)}</Text>
            <Text style={styles.featuredCountLabel}>جاذبه</Text>
          </View>
        </Pressable>

        <View style={styles.mapTeaser}>
          <View style={styles.mapTeaserCopy}>
            <Text style={styles.mapTeaserTitle}>ایران هنوز کلی دیدنی دارد</Text>
            <Text style={styles.mapTeaserText}>نقشه را باز کن و استان‌ها را ببین؛ راهنمای کامل فعلی ما از فارس و شیراز شروع می‌شود.</Text>
            <Pressable onPress={() => router.push('/map')} style={({ pressed }) => [styles.mapTeaserButton, pressed && styles.pressed]}>
              <Text style={styles.mapTeaserButtonText}>دیدن نقشه ایران  ←</Text>
            </Pressable>
          </View>
          <Image source={require('../../assets/images/iran-provinces-illustration.png')} style={styles.mapTeaserImage} resizeMode="contain" />
        </View>

        <View style={styles.footerNote}>
          <Text style={styles.footerNoteText}>ایرانگرد؛ برای دیدن ایران، وجب به وجب</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function FilterChip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.filterChip,
        selected && styles.filterChipSelected,
        pressed && styles.pressed,
      ]}
      accessibilityRole="button"
      accessibilityState={{ selected }}
    >
      <Text style={[styles.filterChipText, selected && styles.filterChipTextSelected]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: palette.background },
  scrollContent: { paddingHorizontal: 18, paddingBottom: 34, gap: 19 },
  topBar: {
    minHeight: 62,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brandBlock: { flexDirection: 'row-reverse', alignItems: 'center', gap: 10 },
  brandMark: {
    width: 43,
    height: 43,
    borderRadius: 15,
    backgroundColor: palette.forest,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandMarkText: { color: '#F2D5A5', fontSize: 24, fontWeight: '800' },
  brandName: { color: palette.ink, fontSize: 20, fontWeight: '900', textAlign: 'right' },
  brandSubtitle: { color: palette.muted, fontSize: 11, textAlign: 'right', marginTop: 1 },
  topBadge: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 99,
    backgroundColor: '#EAE7DD',
  },
  topBadgeText: { color: '#65766D', fontSize: 11, fontWeight: '700' },
  heroCard: {
    minHeight: 238,
    borderRadius: 27,
    overflow: 'hidden',
    backgroundColor: palette.forest,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 18,
    justifyContent: 'center',
  },
  heroGlow: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#2B6656',
    left: -86,
    top: -80,
    opacity: 0.75,
  },
  heroMap: {
    position: 'absolute',
    left: -54,
    bottom: 5,
    width: '65%',
    height: '88%',
    opacity: 0.96,
  },
  heroCopy: { width: '69%', alignItems: 'flex-end', alignSelf: 'flex-end', zIndex: 1 },
  heroEyebrow: {
    backgroundColor: 'rgba(242,213,165,0.16)',
    borderColor: 'rgba(242,213,165,0.34)',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 10,
  },
  heroEyebrowText: { color: '#F2D5A5', fontSize: 10, fontWeight: '700' },
  heroTitle: {
    color: '#FFF9EF',
    fontSize: 24,
    fontWeight: '900',
    lineHeight: 34,
    textAlign: 'right',
  },
  heroDescription: {
    color: '#E1E8DF',
    fontSize: 12,
    lineHeight: 21,
    textAlign: 'right',
    marginTop: 5,
  },
  heroButton: {
    backgroundColor: '#F4E6CC',
    borderRadius: 13,
    marginTop: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 12,
  },
  heroButtonText: { color: palette.forest, fontWeight: '800', fontSize: 12 },
  heroButtonArrow: { color: palette.terracotta, fontSize: 18, fontWeight: '900' },
  heroFootnote: {
    position: 'absolute',
    left: 17,
    bottom: 14,
    color: 'rgba(255,249,239,0.78)',
    fontSize: 10,
    zIndex: 2,
  },
  sectionHeadingRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 3,
  },
  sectionTitle: { color: palette.ink, fontSize: 17, fontWeight: '900', textAlign: 'right' },
  sectionSubtitle: { color: palette.muted, fontSize: 11, textAlign: 'right', marginTop: 4 },
  progressPercentPill: {
    width: 48,
    height: 48,
    borderRadius: 17,
    backgroundColor: palette.mint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressPercentText: { color: palette.forest, fontWeight: '900', fontSize: 14 },
  progressCard: {
    backgroundColor: palette.surface,
    borderRadius: 22,
    padding: 17,
    gap: 13,
    borderWidth: 1,
    borderColor: '#EEECE5',
  },
  progressTopRow: { flexDirection: 'row-reverse', alignItems: 'center', gap: 11 },
  progressIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#F5E8D5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressIconText: { color: palette.terracotta, fontSize: 24, fontWeight: '700' },
  progressCopy: { flex: 1, gap: 3 },
  progressTitle: { color: palette.ink, fontSize: 14, fontWeight: '800', textAlign: 'right' },
  progressCaption: { color: palette.muted, fontSize: 11, textAlign: 'right' },
  progressBottomRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressBottomText: { color: palette.muted, fontSize: 10 },
  offlineCard: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 11,
    padding: 13,
    borderRadius: 17,
    backgroundColor: '#EAF0E8',
    borderWidth: 1,
    borderColor: '#DFE9DD',
  },
  offlineCardIcon: {
    width: 32,
    height: 32,
    borderRadius: 11,
    backgroundColor: palette.forest,
    alignItems: 'center',
    justifyContent: 'center',
  },
  offlineCardIconText: { color: '#FFFFFF', fontSize: 17, fontWeight: '900' },
  offlineCardCopy: { flex: 1, gap: 3 },
  offlineCardTitle: { color: palette.forest, fontSize: 11, fontWeight: '900', textAlign: 'right' },
  offlineCardText: { color: '#68776D', fontSize: 9, lineHeight: 15, textAlign: 'right' },
  sectionAccent: {
    color: palette.terracotta,
    backgroundColor: '#F6E7DC',
    fontSize: 10,
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    fontWeight: '800',
  },
  featuredCard: {
    minHeight: 174,
    borderRadius: 22,
    overflow: 'hidden',
    backgroundColor: '#5A4246',
    justifyContent: 'center',
  },
  featuredArt: {
    position: 'absolute',
    width: '67%',
    height: '100%',
    left: -2,
    bottom: -8,
  },
  featuredShade: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(48,35,39,0.25)',
  },
  featuredContent: {
    width: '64%',
    paddingHorizontal: 17,
    paddingVertical: 16,
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    zIndex: 1,
  },
  featuredTag: {
    backgroundColor: 'rgba(255,245,225,0.16)',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 8,
  },
  featuredTagText: { color: '#F8E6C8', fontSize: 9, fontWeight: '700' },
  featuredTitle: { color: '#FFF8ED', fontSize: 26, fontWeight: '900', textAlign: 'right' },
  featuredSubtitle: { color: '#EEDFD1', fontSize: 12, marginTop: 2, textAlign: 'right' },
  featuredAction: {
    marginTop: 11,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,248,237,0.6)',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 8,
    paddingBottom: 3,
  },
  featuredActionText: { color: '#FFF8ED', fontSize: 11, fontWeight: '800' },
  featuredActionArrow: { color: '#EFC98F', fontSize: 17 },
  featuredCount: {
    position: 'absolute',
    left: 12,
    top: 12,
    backgroundColor: 'rgba(255,248,237,0.92)',
    borderRadius: 12,
    minWidth: 43,
    paddingVertical: 6,
    alignItems: 'center',
  },
  featuredCountNumber: { color: '#5A4246', fontSize: 15, fontWeight: '900' },
  featuredCountLabel: { color: '#806F68', fontSize: 9 },
  provinceHeader: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
  provinceCount: { color: palette.forestLight, fontSize: 11, fontWeight: '800' },
  searchBox: {
    minHeight: 50,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EAE7DD',
    paddingHorizontal: 14,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 10,
  },
  searchIcon: { color: palette.forestLight, fontSize: 26, lineHeight: 28 },
  searchInput: { flex: 1, color: palette.ink, fontSize: 13, paddingVertical: 10 },
  clearSearch: { color: palette.muted, fontSize: 23, paddingHorizontal: 2 },
  filterRow: { flexDirection: 'row-reverse', gap: 8, flexWrap: 'wrap' },
  filterChip: {
    borderRadius: 99,
    paddingHorizontal: 13,
    paddingVertical: 8,
    backgroundColor: '#ECEAE2',
    borderWidth: 1,
    borderColor: '#ECEAE2',
  },
  filterChipSelected: { backgroundColor: palette.forest, borderColor: palette.forest },
  filterChipText: { color: '#718078', fontSize: 11, fontWeight: '700' },
  filterChipTextSelected: { color: '#FFFFFF' },
  provinceGrid: { flexDirection: 'row-reverse', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 10 },
  provinceCard: {
    width: '48.3%',
    minHeight: 104,
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    padding: 12,
    borderWidth: 1,
    borderColor: '#EDEAE1',
    justifyContent: 'space-between',
  },
  provinceCardPressed: { backgroundColor: '#EEF4EF', transform: [{ scale: 0.985 }] },
  provinceCardTop: { flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between' },
  provinceNumber: {
    minWidth: 28,
    height: 25,
    paddingHorizontal: 6,
    borderRadius: 8,
    backgroundColor: '#F0EEE7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  provinceNumberActive: { backgroundColor: '#E1EEE6' },
  provinceNumberText: { color: '#8A938C', fontSize: 10, fontWeight: '800' },
  provinceNumberTextActive: { color: palette.forest },
  provinceStatusDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#D1CBBE' },
  provinceStatusDotActive: { backgroundColor: '#5B9B78' },
  provinceName: { color: palette.ink, fontSize: 15, fontWeight: '900', textAlign: 'right', marginTop: 8 },
  provinceStatus: { color: '#9AA199', fontSize: 10, textAlign: 'right', marginTop: 4 },
  provinceStatusActive: { color: '#4F8A69', fontWeight: '700' },
  emptyState: { alignItems: 'center', paddingVertical: 28, backgroundColor: '#FFFFFF', borderRadius: 18 },
  emptyStateIcon: { color: palette.terracotta, fontSize: 34 },
  emptyStateTitle: { color: palette.ink, fontWeight: '800', marginTop: 6 },
  emptyStateText: { color: palette.muted, fontSize: 11, marginTop: 4 },
  mapTeaser: { minHeight: 126, borderRadius: 20, backgroundColor: '#E9EEE7', padding: 14, flexDirection: 'row-reverse', alignItems: 'center', overflow: 'hidden' },
  mapTeaserCopy: { flex: 1, alignItems: 'flex-end', gap: 6, zIndex: 1 },
  mapTeaserTitle: { color: palette.ink, fontSize: 13, fontWeight: '900', textAlign: 'right' },
  mapTeaserText: { color: '#6F7D73', fontSize: 10, lineHeight: 17, textAlign: 'right' },
  mapTeaserButton: { backgroundColor: palette.forest, borderRadius: 10, paddingHorizontal: 11, paddingVertical: 7, marginTop: 2 },
  mapTeaserButtonText: { color: '#FFFFFF', fontSize: 10, fontWeight: '800' },
  mapTeaserImage: { width: 104, height: 104, marginLeft: -8 },
  footerNote: { alignItems: 'center', paddingTop: 8 },
  footerNoteText: { color: '#8C978F', fontSize: 10 },
  pressed: { opacity: 0.88 },
});
