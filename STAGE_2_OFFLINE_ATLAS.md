# IranGard — Stage 2: Offline Atlas

## Decisions implemented

- Product identity: an interactive atlas of Iran.
- Visual direction: a colorful, illustrated map in the existing warm-paper / deep-green design language.
- Offline-first behavior: map geometry is rendered into a bundled local image; province hit-testing uses the bundled province boundary data. The map screen no longer loads Google / network map tiles.

## What changed

- Replaced the online `react-native-maps` screen with a touch-selectable offline atlas image generated from `src/data/provinces.json`.
- Added province selection by tapping the map, search by Persian/English province name or city name, and an accessible list of all provinces as a second selection method.
- Added a selected-province card that shows whether a guide exists, and displays live visit progress when a city guide is available.
- Added clear offline notices on the home, atlas, and city-guide screens.
- Refreshed the city guide layout and made local visit tracking more robust: in-memory updates are immediate and AsyncStorage writes are serialized to avoid older writes overtaking newer ones.
- Added `assets/images/iran-atlas-offline.png`, a locally bundled illustration rendered from the project's own province boundary dataset.

## Offline scope and current content coverage

- The map, all 31 province names/boundaries, the existing city/attraction descriptions, and saved visit marks are local to the device. The map screen does not request online map tiles.
- The tourism guide data currently contains detailed attractions for Shiraz only. Other provinces are visible and selectable, but their full city/attraction guide data is still to be added. The app does not pretend that these guides are already available.
- An internet connection would still be needed for future online additions or content updates, unless a later release adds a downloadable offline content pack.

## Validation

- The project dependencies could not be reinstalled in this environment because npm registry requests failed with `EAI_AGAIN` (network/DNS unavailable).
- The TypeScript project check could not be run because the project has no installed `node_modules`, and `npm ci --offline` could not find all packages in the local npm cache. Run `npm ci` and `npx tsc --noEmit` on a machine with registry access, then launch on Android and test the map in airplane mode.
