# ایرانگرد | IranGard

An Expo / React Native travel atlas for discovering Iran province by province.

## Stage 2: offline atlas

The current version uses a bundled illustrated map generated from the project's local province-boundary data. Province selection, province search, and the province list work without online map tiles. Existing city/attraction text and visit records are also local to the device.

The current guide dataset contains detailed attractions for Shiraz. The other provinces appear in the atlas but are marked as being prepared until their guide content is added.

### Run the app

```bash
npm install
npx expo start
```

For an Android device, open the project with Expo Go / a development build appropriate for this Expo SDK and follow the QR-code instructions shown by Expo CLI.

### Test the offline behavior

1. Start the app once while connected.
2. Open the atlas and select a few provinces.
3. Open the Shiraz guide and mark an attraction as visited.
4. Close and reopen the app to confirm the visit mark remains.
5. Enable airplane mode and repeat the map, search, and saved-guide checks. The map and currently bundled guide content should remain available.

## Important limitations

- Not all 31 province tourism guides have been written yet; only the current bundled guide data is available offline.
- Future content updates or additions will require an app update or a separately implemented downloadable content pack.
- The app has not yet been run on a physical Android device as part of this stage.
