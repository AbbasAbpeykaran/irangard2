# IranGard — Shiraz and Fars guide content update

## Included content

- 42 unique attraction records: 35 in Shiraz and 7 elsewhere in Fars Province.
- Categories cover historical and archaeological sites, gardens, religious places, tombs, museums and historic houses, markets, nature, and parks.
- Repeated mentions are represented once for progress tracking; related roles are retained as descriptive tags where appropriate.
- Suggested routes have been removed from the app and its data model.
- Seven local foods and souvenirs are included: faloodeh, kalam polo, ash-e sabzi, Shirazi salad, koofteh sabzi, herbal distillates/bahar narنج, and local pickles.
- Four uncertain attraction records were removed from the guide: Park Forouzan, Armenian Church (St Mary), Fahandezh Castle, and Shah Cheragh Museum.

## Deduplication and geographic organization

- Jame Atiq Mosque appears once although it was repeated in the source list.
- Narenjestan Qavam, Pars Museum/Nazar Garden, Haft Tanan, Vakil Bazaar, Vakil Mosque, and other compound entries are not double-counted merely because they appear under more than one topic. Related museum or historic roles are retained as tags.
- Persepolis, Naqsh-e Rostam, Naqsh-e Rajab, Pasargadae, Maharloo Lake, Bamu National Park, and Margoon Waterfall are grouped under destinations outside Shiraz in Fars Province. Pasargadae is explicitly included as its own destination.

## Accuracy and visit-planning notes

- Persepolis and Pasargadae are described as UNESCO World Heritage properties. Naqsh-e Rostam and Naqsh-e Rajab are nearby archaeological sites and are not described here as separately inscribed UNESCO properties.
- Margoon Waterfall is presented as a separate trip in the Sepidan area.
- Maharloo Lake is season-sensitive. Bamu National Park is a protected area; any visit must follow environmental rules and permitted access.
- The four uncertain entries listed above are no longer displayed or included in progress tracking.
- The water-museum entry is worded around Vakil Water Reservoir and advises checking current operating status before visiting.

## Validation performed

- 42 attraction IDs are unique.
- Area split: 35 Shiraz records and 7 Fars-outside-Shiraz records.
- No route data remains.
- Seven local-food/souvenir records are present.
- All remaining attractions are included in visit-progress tracking.
- Full Expo/Android runtime validation was not performed in this environment; install dependencies with `npm ci`, then run `npx tsc --noEmit` and `npx expo start --android` on the development machine.
