import { Stack, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProgressBar from '../../components/ProgressBar';
import { cities } from '../../data/cities';
import type { Attraction, AttractionArea, AttractionCategory } from '../../data/cities';
import { cityPercent, toPersianDigits, useVisited } from '../../lib/visited';

const categoryLabels: Record<AttractionCategory, string> = {
  history: 'تاریخی',
  garden: 'باغ‌ها',
  religious: 'مذهبی',
  tomb: 'آرامگاه‌ها',
  museum: 'موزه‌ها',
  market: 'بازار و خرید',
  nature: 'طبیعت',
  park: 'فضای سبز',
};

const categoryMeta: Record<AttractionCategory, { icon: string; tint: string; ink: string }> = {
  history: { icon: '🏛', tint: '#F2E8D8', ink: '#89623D' },
  garden: { icon: '🌿', tint: '#E5F0E5', ink: '#47734E' },
  religious: { icon: '🕌', tint: '#E9E9F5', ink: '#65618E' },
  tomb: { icon: '📜', tint: '#F4E8EC', ink: '#925A70' },
  museum: { icon: '🖼', tint: '#E8EEF2', ink: '#526D80' },
  market: { icon: '🛍', tint: '#F5EBDD', ink: '#9B7042' },
  nature: { icon: '⛰', tint: '#E2EFED', ink: '#39756D' },
  park: { icon: '🌳', tint: '#E8F0E2', ink: '#64804A' },
};

const categoryOrder: AttractionCategory[] = [
  'history', 'garden', 'religious', 'tomb', 'museum', 'market', 'nature', 'park',
];

const palette = {
  background: '#F5F3EC',
  paper: '#FFFFFF',
  ink: '#203B33',
  muted: '#7B887F',
  forest: '#194D40',
  forestLight: '#367461',
  mint: '#E3EEE7',
  line: '#E9E7DF',
  gold: '#E8C994',
};

function PlaceCard({
  place,
  done,
  expanded,
  number,
  onExpand,
  onToggle,
}: {
  place: Attraction;
  done: boolean;
  expanded: boolean;
  number: number;
  onExpand: () => void;
  onToggle: () => void;
}) {
  const meta = categoryMeta[place.category];
  return (
    <View style={[styles.placeCard, done && styles.placeCardDone]}>
      <View style={styles.placeMainRow}>
        <View style={[styles.placeIcon, { backgroundColor: meta.tint }]}>
          <Text style={styles.placeIconText}>{meta.icon}</Text>
        </View>
        <View style={styles.placeInfo}>
          <View style={styles.placeTitleRow}>
            <Text style={styles.placeName}>{place.name}</Text>
            <Text style={styles.placeNumber}>{toPersianDigits(number)}</Text>
          </View>
          <View style={styles.placeMetaRow}>
            <Text style={[styles.placeCategory, { color: meta.ink }]}>{categoryLabels[place.category]}</Text>
            {done ? <Text style={styles.doneLabel}>✓ بازدید شده</Text> : null}
          </View>
        </View>
        <Pressable
          onPress={onToggle}
          style={({ pressed }) => [styles.visitButton, done && styles.visitButtonDone, pressed && styles.pressed]}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: done }}
          accessibilityLabel={`${place.name}، ${done ? 'بازدید شده' : 'ثبت بازدید'}`}
          hitSlop={6}
        >
          <Text style={[styles.visitButtonText, done && styles.visitButtonTextDone]}>{done ? '✓' : '+'}</Text>
        </Pressable>
      </View>

      <Pressable onPress={onExpand} style={styles.detailsToggle} accessibilityRole="button">
        <Text style={styles.detailsToggleText}>{expanded ? 'بستن توضیحات' : 'معرفی این مکان'}</Text>
        <Text style={styles.detailsChevron}>{expanded ? '⌃' : '⌄'}</Text>
      </Pressable>

      {expanded ? (
        <View style={styles.expandedContent}>
          <Text style={styles.placeDescription}>{place.description}</Text>
          {!!place.tags?.length ? (
            <View style={styles.tagWrap}>
              {place.tags.map((tag) => (
                <View key={tag} style={styles.tagPill}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          ) : null}
          <Text style={styles.visitHint}>
            {done ? 'این مکان در گذرنامه سفر تو ثبت شده است.' : 'با دکمه + بازدیدت را در گذرنامه ثبت کن.'}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

export default function CityScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { visited, toggle } = useVisited();
  const [area, setArea] = useState<AttractionArea>('shiraz');
  const [category, setCategory] = useState<AttractionCategory | 'all'>('all');
  const [query, setQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [foodsOpen, setFoodsOpen] = useState(false);
  const [sourcesOpen, setSourcesOpen] = useState(false);
  const [showAllPlaces, setShowAllPlaces] = useState(false);

  const city = cities.find((item) => item.id === id);
  const allAttractions = city?.attractions ?? [];
  const shirazAttractions = allAttractions.filter((place) => place.area === 'shiraz');
  const farsAttractions = allAttractions.filter((place) => place.area === 'fars');
  const activePlaces = area === 'shiraz' ? shirazAttractions : farsAttractions;

  const filteredPlaces = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase();
    return activePlaces.filter((place) => {
      const categoryMatch = category === 'all' || place.category === category;
      const textMatch =
        !normalized ||
        place.name.toLocaleLowerCase().includes(normalized) ||
        place.description.toLocaleLowerCase().includes(normalized) ||
        (place.tags ?? []).some((tag) => tag.toLocaleLowerCase().includes(normalized));
      return categoryMatch && textMatch;
    });
  }, [activePlaces, category, query]);

  if (!city) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.center}>
          <Text style={styles.notFoundTitle}>راهنما پیدا نشد</Text>
          <Text style={styles.notFoundText}>این راهنما در نسخه فعلی ایرانگرد وجود ندارد.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const percent = cityPercent(city, visited);
  const doneCount = allAttractions.filter((place) => visited.includes(place.id)).length;
  const areaDone = activePlaces.filter((place) => visited.includes(place.id)).length;
  const areaPercent = activePlaces.length ? Math.round((areaDone / activePlaces.length) * 100) : 0;
  const availableCategories = categoryOrder.filter((key) => activePlaces.some((place) => place.category === key));
  const displayedPlaces = showAllPlaces ? filteredPlaces : filteredPlaces.slice(0, 8);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <Stack.Screen options={{ title: 'راهنمای فارس', headerShown: false }} />
      <StatusBar barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.topBar}>
          <View>
            <Text style={styles.brandKicker}>ایرانگرد • راهنمای سفر</Text>
            <Text style={styles.screenTitle}>فارس و شیراز</Text>
          </View>
          <View style={styles.brandStamp}><Text style={styles.brandStampText}>✦</Text></View>
        </View>

        <View style={styles.hero}>
          <View style={styles.heroDecorOne} />
          <View style={styles.heroDecorTwo} />
          <View style={styles.heroCopy}>
            <View style={styles.heroBadge}><Text style={styles.heroBadgeText}>راهنمای آفلاین</Text></View>
            <Text style={styles.heroTitle}>از عطر بهارنارنج تا شکوه پارسه</Text>
            <Text style={styles.heroSubtitle}>شیراز را کشف کن؛ بعد قدم به دل تاریخ و طبیعت فارس بگذار.</Text>
          </View>
          <View style={styles.heroStats}>
            <View style={styles.heroStat}>
              <Text style={styles.heroStatNumber}>{toPersianDigits(allAttractions.length)}</Text>
              <Text style={styles.heroStatLabel}>جاذبه منتخب</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.heroStat}>
              <Text style={styles.heroStatNumber}>{toPersianDigits(doneCount)}</Text>
              <Text style={styles.heroStatLabel}>بازدید ثبت‌شده</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.heroStat}>
              <Text style={styles.heroStatNumber}>{toPersianDigits(percent)}٪</Text>
              <Text style={styles.heroStatLabel}>تکمیل گذرنامه</Text>
            </View>
          </View>
        </View>

        <View style={styles.progressCard}>
          <View style={styles.progressTop}>
            <View style={styles.progressPercent}><Text style={styles.progressPercentText}>{toPersianDigits(percent)}٪</Text></View>
            <View style={styles.progressCopy}>
              <Text style={styles.progressTitle}>گذرنامه گردشگری تو</Text>
              <Text style={styles.progressSubtitle}>هر بازدید را ثبت کن و ردپایت را در فارس بساز.</Text>
            </View>
          </View>
          <ProgressBar percent={percent} color={palette.forestLight} height={8} />
          <Text style={styles.storageHint}>اطلاعات بازدید روی همین دستگاه ذخیره می‌شود.</Text>
        </View>

        <View style={styles.sectionHeading}>
          <View>
            <Text style={styles.sectionTitle}>از کجا شروع کنیم؟</Text>
            <Text style={styles.sectionSubtitle}>محدوده گردش خودت را انتخاب کن.</Text>
          </View>
          <Text style={styles.sectionIcon}>🧭</Text>
        </View>

        <View style={styles.areaTabs}>
          <Pressable onPress={() => { setArea('shiraz'); setCategory('all'); setQuery(''); setExpandedId(null); setShowAllPlaces(false); }} style={[styles.areaTab, area === 'shiraz' && styles.areaTabActive]}>
            <Text style={[styles.areaTabTitle, area === 'shiraz' && styles.areaTabTitleActive]}>شیراز</Text>
            <Text style={[styles.areaTabSub, area === 'shiraz' && styles.areaTabSubActive]}>{toPersianDigits(shirazAttractions.length)} جاذبه شهری</Text>
          </Pressable>
          <Pressable onPress={() => { setArea('fars'); setCategory('all'); setQuery(''); setExpandedId(null); setShowAllPlaces(false); }} style={[styles.areaTab, area === 'fars' && styles.areaTabActive]}>
            <Text style={[styles.areaTabTitle, area === 'fars' && styles.areaTabTitleActive]}>سراسر استان فارس</Text>
            <Text style={[styles.areaTabSub, area === 'fars' && styles.areaTabSubActive]}>{toPersianDigits(farsAttractions.length)} مقصد خارج شهر</Text>
          </Pressable>
        </View>

        <View style={styles.areaIntro}>
          <View style={styles.areaIntroIcon}><Text>{area === 'shiraz' ? '🌸' : '🏺'}</Text></View>
          <View style={styles.areaIntroCopy}>
            <Text style={styles.areaIntroTitle}>{area === 'shiraz' ? 'گشت‌وگذار در شهر شعر' : 'سفر در پهنه تاریخی فارس'}</Text>
            <Text style={styles.areaIntroText}>
              {area === 'shiraz'
                ? 'باغ‌ها، آرامگاه‌ها، بازارها و بناهای دیدنی شیراز را یک‌جا پیدا کن.'
                : 'از میراث هخامنشی تا طبیعت فارس؛ مقصدها را جداگانه مرور کن و بازدیدهایت را ثبت کن.'}
            </Text>
          </View>
        </View>

        <View style={styles.listHeader}>
          <View>
            <Text style={styles.sectionTitle}>جاذبه‌ها</Text>
            <Text style={styles.sectionSubtitle}>{toPersianDigits(areaDone)} از {toPersianDigits(activePlaces.length)} بازدید ثبت شده</Text>
          </View>
          <View style={styles.areaProgressPill}><Text style={styles.areaProgressText}>{toPersianDigits(areaPercent)}٪</Text></View>
        </View>
        <ProgressBar percent={areaPercent} color={palette.forestLight} height={5} />

        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>⌕</Text>
          <TextInput
            value={query}
            onChangeText={(value) => { setQuery(value); setShowAllPlaces(false); }}
            placeholder="نام جاذبه یا ویژگی آن را بنویس..."
            placeholderTextColor="#9AA39B"
            style={styles.searchInput}
            textAlign="right"
            returnKeyType="search"
            accessibilityLabel="جست‌وجوی جاذبه‌ها"
          />
          {query.length > 0 ? <Pressable onPress={() => setQuery('')} hitSlop={8}><Text style={styles.clearSearch}>×</Text></Pressable> : null}
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroller}>
          <Pressable onPress={() => { setCategory('all'); setShowAllPlaces(false); }} style={[styles.categoryChip, category === 'all' && styles.categoryChipActive]}>
            <Text style={[styles.categoryChipText, category === 'all' && styles.categoryChipTextActive]}>همه</Text>
          </Pressable>
          {availableCategories.map((item) => (
            <Pressable key={item} onPress={() => { setCategory(item); setShowAllPlaces(false); }} style={[styles.categoryChip, category === item && styles.categoryChipActive]}>
              <Text style={[styles.categoryChipText, category === item && styles.categoryChipTextActive]}>{categoryMeta[item].icon} {categoryLabels[item]}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.resultsRow}>
          <Text style={styles.resultsHint}>برای معرفی هر مکان، کارت آن را باز کن.</Text>
          <Text style={styles.resultsCount}>{toPersianDigits(filteredPlaces.length)} نتیجه</Text>
        </View>

        {filteredPlaces.length ? (
          <View style={styles.placeList}>
            {displayedPlaces.map((place) => (
              <PlaceCard
                key={place.id}
                place={place}
                number={allAttractions.findIndex((item) => item.id === place.id) + 1}
                done={visited.includes(place.id)}
                expanded={expandedId === place.id}
                onExpand={() => setExpandedId(expandedId === place.id ? null : place.id)}
                onToggle={() => toggle(place.id)}
              />
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>⌕</Text>
            <Text style={styles.emptyTitle}>جاذبه‌ای پیدا نشد</Text>
            <Text style={styles.emptyText}>عبارت جست‌وجو یا دسته‌بندی را تغییر بده.</Text>
          </View>
        )}

        {filteredPlaces.length > 8 ? (
          <Pressable onPress={() => setShowAllPlaces(!showAllPlaces)} style={styles.showMoreButton}>
            <Text style={styles.showMoreText}>{showAllPlaces ? 'نمایش کمتر' : `نمایش ${toPersianDigits(filteredPlaces.length - 8)} جاذبه دیگر`}</Text>
            <Text style={styles.showMoreArrow}>{showAllPlaces ? '⌃' : '⌄'}</Text>
          </Pressable>
        ) : null}

        <View style={styles.collapsibleCard}>
          <Pressable onPress={() => setFoodsOpen(!foodsOpen)} style={styles.collapsibleHeader}>
            <View style={styles.collapsibleIcon}><Text>🍊</Text></View>
            <View style={styles.collapsibleCopy}>
              <Text style={styles.collapsibleTitle}>طعم‌های محلی شیراز</Text>
              <Text style={styles.collapsibleSubtitle}>{toPersianDigits(city.localFoods.length)} خوراک و سوغات برای تجربه سفر</Text>
            </View>
            <Text style={styles.collapsibleChevron}>{foodsOpen ? '⌃' : '⌄'}</Text>
          </Pressable>
          {foodsOpen ? (
            <View style={styles.foodList}>
              {city.localFoods.map((food) => (
                <View key={food.id} style={styles.foodItem}>
                  <Text style={styles.foodBullet}>✦</Text>
                  <View style={styles.foodCopy}>
                    <Text style={styles.foodName}>{food.name}</Text>
                    <Text style={styles.foodDescription}>{food.description}</Text>
                  </View>
                </View>
              ))}
            </View>
          ) : null}
        </View>

        <View style={styles.collapsibleCard}>
          <Pressable onPress={() => setSourcesOpen(!sourcesOpen)} style={styles.collapsibleHeader}>
            <View style={[styles.collapsibleIcon, { backgroundColor: '#E8EDF2' }]}><Text>ⓘ</Text></View>
            <View style={styles.collapsibleCopy}>
              <Text style={styles.collapsibleTitle}>منابع و اعتبار اطلاعات</Text>
              <Text style={styles.collapsibleSubtitle}>پیوندهای مرجع این راهنما</Text>
            </View>
            <Text style={styles.collapsibleChevron}>{sourcesOpen ? '⌃' : '⌄'}</Text>
          </Pressable>
          {sourcesOpen ? (
            <View style={styles.sourcesList}>
              {city.sources.map((source) => <Text key={source} style={styles.sourceText} selectable>{source}</Text>)}
            </View>
          ) : null}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerTitle}>ایرانگرد</Text>
          <Text style={styles.footerText}>فارس را با چشم خودت کشف کن؛ خاطره‌ها را در گذرنامه‌ات نگه دار.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: palette.background },
  container: { paddingHorizontal: 17, paddingTop: 9, paddingBottom: 36, gap: 15 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 8, backgroundColor: palette.background },
  notFoundTitle: { color: palette.ink, fontSize: 20, fontWeight: '900' },
  notFoundText: { color: palette.muted, fontSize: 13, textAlign: 'center' },
  topBar: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 5 },
  brandKicker: { color: palette.muted, fontSize: 10, textAlign: 'right', fontWeight: '700' },
  screenTitle: { color: palette.ink, fontSize: 23, fontWeight: '900', textAlign: 'right', marginTop: 3 },
  brandStamp: { width: 43, height: 43, borderRadius: 15, backgroundColor: palette.forest, alignItems: 'center', justifyContent: 'center' },
  brandStampText: { color: palette.gold, fontSize: 25, fontWeight: '900' },
  hero: { borderRadius: 25, backgroundColor: palette.forest, padding: 19, overflow: 'hidden', gap: 17 },
  heroDecorOne: { position: 'absolute', width: 170, height: 170, borderRadius: 85, backgroundColor: '#2B6656', left: -70, top: -75, opacity: 0.8 },
  heroDecorTwo: { position: 'absolute', width: 105, height: 105, borderRadius: 53, borderWidth: 1, borderColor: 'rgba(255,255,255,0.13)', left: 35, bottom: -50 },
  heroCopy: { alignItems: 'flex-end', gap: 7, zIndex: 1 },
  heroBadge: { backgroundColor: 'rgba(232,201,148,0.17)', borderWidth: 1, borderColor: 'rgba(232,201,148,0.3)', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20 },
  heroBadgeText: { color: '#F2D7A9', fontSize: 10, fontWeight: '800' },
  heroTitle: { color: '#FFF9EF', fontSize: 22, lineHeight: 32, fontWeight: '900', textAlign: 'right' },
  heroSubtitle: { color: '#D9E6DD', fontSize: 11, lineHeight: 20, textAlign: 'right', maxWidth: '95%' },
  heroStats: { flexDirection: 'row-reverse', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 16, paddingVertical: 11 },
  heroStat: { flex: 1, alignItems: 'center', gap: 3 },
  heroStatNumber: { color: '#F2D7A9', fontSize: 18, fontWeight: '900' },
  heroStatLabel: { color: '#E0E9E1', fontSize: 9 },
  statDivider: { width: 1, height: 27, backgroundColor: 'rgba(255,255,255,0.2)' },
  progressCard: { backgroundColor: palette.paper, borderRadius: 19, borderWidth: 1, borderColor: palette.line, padding: 14, gap: 11 },
  progressTop: { flexDirection: 'row-reverse', alignItems: 'center', gap: 10 },
  progressPercent: { width: 45, height: 42, borderRadius: 14, backgroundColor: palette.mint, alignItems: 'center', justifyContent: 'center' },
  progressPercentText: { color: palette.forest, fontSize: 13, fontWeight: '900' },
  progressCopy: { flex: 1, gap: 3 },
  progressTitle: { color: palette.ink, fontSize: 13, fontWeight: '900', textAlign: 'right' },
  progressSubtitle: { color: palette.muted, fontSize: 10, textAlign: 'right' },
  storageHint: { color: palette.muted, fontSize: 9, textAlign: 'right' },
  sectionHeading: { flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between', marginTop: 2 },
  sectionTitle: { color: palette.ink, fontSize: 16, fontWeight: '900', textAlign: 'right' },
  sectionSubtitle: { color: palette.muted, fontSize: 10, textAlign: 'right', marginTop: 3 },
  sectionIcon: { fontSize: 23 },
  areaTabs: { flexDirection: 'row-reverse', backgroundColor: '#EAE9E1', padding: 4, borderRadius: 17, gap: 4 },
  areaTab: { flex: 1, borderRadius: 13, paddingVertical: 11, paddingHorizontal: 7, alignItems: 'center', gap: 3 },
  areaTabActive: { backgroundColor: palette.forest, shadowColor: '#183B31', shadowOpacity: 0.13, shadowRadius: 7, elevation: 2 },
  areaTabTitle: { color: '#627168', fontSize: 12, fontWeight: '900' },
  areaTabTitleActive: { color: '#FFFFFF' },
  areaTabSub: { color: '#89938C', fontSize: 9 },
  areaTabSubActive: { color: '#D5E3D9' },
  areaIntro: { flexDirection: 'row-reverse', alignItems: 'center', backgroundColor: '#F0E9D9', borderRadius: 17, padding: 12, gap: 10 },
  areaIntroIcon: { width: 39, height: 39, borderRadius: 13, backgroundColor: '#FFFCF5', alignItems: 'center', justifyContent: 'center' },
  areaIntroCopy: { flex: 1, gap: 3 },
  areaIntroTitle: { color: palette.ink, fontSize: 12, fontWeight: '900', textAlign: 'right' },
  areaIntroText: { color: '#6F786F', fontSize: 10, lineHeight: 17, textAlign: 'right' },
  listHeader: { flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between' },
  areaProgressPill: { backgroundColor: palette.mint, paddingHorizontal: 11, paddingVertical: 7, borderRadius: 11 },
  areaProgressText: { color: palette.forest, fontSize: 11, fontWeight: '900' },
  searchBox: { minHeight: 46, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: palette.line, borderRadius: 14, flexDirection: 'row-reverse', alignItems: 'center', paddingHorizontal: 12, gap: 8 },
  searchIcon: { color: palette.muted, fontSize: 22 },
  searchInput: { flex: 1, color: palette.ink, fontSize: 11, paddingVertical: 10 },
  clearSearch: { color: palette.muted, fontSize: 21, paddingHorizontal: 3 },
  categoryScroller: { flexDirection: 'row-reverse', gap: 7, paddingVertical: 1 },
  categoryChip: { borderRadius: 30, borderWidth: 1, borderColor: '#E4E3DA', backgroundColor: '#FFFFFF', paddingHorizontal: 12, paddingVertical: 8 },
  categoryChipActive: { backgroundColor: palette.forest, borderColor: palette.forest },
  categoryChipText: { color: '#64736A', fontSize: 10, fontWeight: '700' },
  categoryChipTextActive: { color: '#FFFFFF' },
  resultsRow: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center' },
  resultsHint: { color: palette.muted, fontSize: 9 },
  resultsCount: { color: palette.forest, fontSize: 10, fontWeight: '900' },
  placeList: { gap: 9 },
  placeCard: { backgroundColor: '#FFFFFF', borderRadius: 17, borderWidth: 1, borderColor: palette.line, padding: 12, gap: 8 },
  placeCardDone: { borderColor: '#C9DDCE', backgroundColor: '#FBFEFB' },
  placeMainRow: { flexDirection: 'row-reverse', alignItems: 'center', gap: 10 },
  placeIcon: { width: 42, height: 42, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  placeIconText: { fontSize: 19 },
  placeInfo: { flex: 1, gap: 5 },
  placeTitleRow: { flexDirection: 'row-reverse', alignItems: 'center', gap: 6 },
  placeName: { color: palette.ink, fontSize: 12, fontWeight: '900', flexShrink: 1, textAlign: 'right' },
  placeNumber: { color: '#9AA49D', fontSize: 9 },
  placeMetaRow: { flexDirection: 'row-reverse', alignItems: 'center', gap: 8 },
  placeCategory: { fontSize: 9, fontWeight: '800' },
  doneLabel: { color: '#477A56', fontSize: 9, fontWeight: '800' },
  visitButton: { width: 32, height: 32, borderRadius: 11, backgroundColor: palette.mint, alignItems: 'center', justifyContent: 'center' },
  visitButtonDone: { backgroundColor: palette.forest },
  visitButtonText: { color: palette.forest, fontSize: 20, fontWeight: '700', lineHeight: 23 },
  visitButtonTextDone: { color: '#FFFFFF', fontSize: 16 },
  detailsToggle: { flexDirection: 'row-reverse', alignItems: 'center', alignSelf: 'flex-start', gap: 5, paddingVertical: 2 },
  detailsToggleText: { color: palette.forestLight, fontSize: 9, fontWeight: '800' },
  detailsChevron: { color: palette.forestLight, fontSize: 14 },
  expandedContent: { borderTopWidth: 1, borderTopColor: '#F0EFE9', paddingTop: 9, gap: 8 },
  placeDescription: { color: '#59675F', fontSize: 11, lineHeight: 20, textAlign: 'right' },
  tagWrap: { flexDirection: 'row-reverse', flexWrap: 'wrap', gap: 5 },
  tagPill: { backgroundColor: '#F3F1EA', borderRadius: 20, paddingHorizontal: 8, paddingVertical: 4 },
  tagText: { color: '#78847C', fontSize: 9 },
  visitHint: { color: palette.muted, fontSize: 9, textAlign: 'right' },
  showMoreButton: { flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'center', gap: 7, backgroundColor: '#E7EEE8', borderRadius: 13, paddingVertical: 12 },
  showMoreText: { color: palette.forest, fontSize: 11, fontWeight: '900' },
  showMoreArrow: { color: palette.forest, fontSize: 15 },
  emptyState: { backgroundColor: '#FFFFFF', borderRadius: 17, padding: 25, alignItems: 'center', gap: 6 },
  emptyIcon: { fontSize: 25, color: palette.muted },
  emptyTitle: { color: palette.ink, fontSize: 13, fontWeight: '900' },
  emptyText: { color: palette.muted, fontSize: 10 },
  collapsibleCard: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: palette.line, borderRadius: 17, paddingHorizontal: 12, paddingVertical: 10, gap: 10 },
  collapsibleHeader: { flexDirection: 'row-reverse', alignItems: 'center', gap: 10, minHeight: 42 },
  collapsibleIcon: { width: 37, height: 37, borderRadius: 12, backgroundColor: '#F5EBDD', alignItems: 'center', justifyContent: 'center' },
  collapsibleCopy: { flex: 1, gap: 3 },
  collapsibleTitle: { color: palette.ink, fontSize: 11, fontWeight: '900', textAlign: 'right' },
  collapsibleSubtitle: { color: palette.muted, fontSize: 9, textAlign: 'right' },
  collapsibleChevron: { color: palette.forest, fontSize: 20, paddingHorizontal: 4 },
  foodList: { borderTopWidth: 1, borderTopColor: '#F0EFE9', paddingTop: 8, gap: 10 },
  foodItem: { flexDirection: 'row-reverse', gap: 8 },
  foodBullet: { color: '#C58B4E', fontSize: 13 },
  foodCopy: { flex: 1, gap: 3 },
  foodName: { color: palette.ink, fontSize: 11, fontWeight: '900', textAlign: 'right' },
  foodDescription: { color: '#647168', fontSize: 10, lineHeight: 17, textAlign: 'right' },
  sourcesList: { borderTopWidth: 1, borderTopColor: '#F0EFE9', paddingTop: 8, gap: 8 },
  sourceText: { color: '#59796B', fontSize: 9, textAlign: 'left' },
  footer: { alignItems: 'center', paddingVertical: 13, gap: 4 },
  footerTitle: { color: palette.forest, fontSize: 13, fontWeight: '900' },
  footerText: { color: palette.muted, fontSize: 9, textAlign: 'center' },
  pressed: { opacity: 0.82, transform: [{ scale: 0.99 }] },
});
