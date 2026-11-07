# IranGard — Design update

## Included

- Rebuilt the home screen with a warm paper background, deep green hero card, and locally bundled illustrated Iran map.
- Added live search for Persian and English province names and city names.
- Added filters: all provinces, ready guides, and guides coming soon.
- Added a travel-progress card showing completed attractions against the attractions currently present in the guide data, plus the number of provinces with a guide.
- Added a featured Shiraz entry card with original decorative stained-glass artwork.
- Refreshed map colors and legend; tapping an unsupported province now explains that its guide is still being prepared.
- Updated the progress bar to clamp percentages and support per-screen colors and heights.
- No new npm dependencies.

## Honest coverage note

The current tourism guide includes 35 attractions in Shiraz and 7 destinations elsewhere in Fars Province. The other 30 provinces are searchable and visible, but are marked as being prepared instead of implying that their attractions have been fully entered. Suggested routes and four uncertain attraction records have been removed. The progress percentage is calculated from all remaining guide attractions.

## Files changed

- `src/app/index.tsx`
- `src/app/map.tsx`
- `src/app/_layout.tsx`
- `src/components/ProgressBar.tsx`
- `assets/images/iran-provinces-illustration.png` (generated from the project's province boundary data)
- `assets/images/shiraz-stained-glass.png` (original decorative illustration)

## Validation

- Structural checks in this delivery: the province dataset parses as JSON and contains 31 unique province codes; all locally referenced image assets exist.
- A full TypeScript check and Expo / Android runtime test could not be completed in this environment because `node_modules` is absent and npm package downloads are unavailable. Run `npm ci` and `npx tsc --noEmit` locally, then launch on Android and test the map in airplane mode.
