import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
import type { City } from '../data/cities';

const KEY = 'visited-attractions';
let storageWriteQueue: Promise<void> = Promise.resolve();

export function useVisited() {
  const [visited, setVisited] = useState<string[]>([]);
  const latestVisited = useRef<string[]>([]);
  const revision = useRef(0);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      const revisionAtLoad = revision.current;

      storageWriteQueue
        .then(() => AsyncStorage.getItem(KEY))
        .then((value) => {
          // A tap made while storage was loading is newer than the saved snapshot.
          if (!active || revision.current !== revisionAtLoad) return;
          let parsed: unknown = [];
          if (value) {
            try {
              parsed = JSON.parse(value);
            } catch {
              parsed = [];
            }
          }
          const safeValue = Array.isArray(parsed)
            ? parsed.filter((item): item is string => typeof item === 'string')
            : [];
          latestVisited.current = safeValue;
          setVisited(safeValue);
        })
        .catch(() => {
          // The app remains usable when local storage is temporarily unavailable.
        });

      return () => {
        active = false;
      };
    }, []),
  );

  const toggle = (id: string) => {
    const current = latestVisited.current;
    const next = current.includes(id)
      ? current.filter((item) => item !== id)
      : [...current, id];

    // Update memory immediately, then serialize writes to avoid out-of-order saves.
    latestVisited.current = next;
    revision.current += 1;
    setVisited(next);
    storageWriteQueue = storageWriteQueue
      .then(() => AsyncStorage.setItem(KEY, JSON.stringify(next)))
      .catch(() => {
        // The current session still reflects the change even if disk persistence fails.
      });
  };

  return { visited, toggle };
}

export function cityPercent(city: City, visited: string[]): number {
  const total = city.attractions.length;
  if (total === 0) return 0;
  const done = city.attractions.filter((attraction) => visited.includes(attraction.id)).length;
  return Math.round((done / total) * 100);
}

export function totalPercent(cities: City[], visited: string[]): number {
  const all = cities.flatMap((city) => city.attractions);
  if (all.length === 0) return 0;
  const done = all.filter((attraction) => visited.includes(attraction.id)).length;
  return Math.round((done / all.length) * 100);
}

export function toPersianDigits(value: number | string): string {
  return String(value).replace(/\d/g, (digit) => '۰۱۲۳۴۵۶۷۸۹'[Number(digit)]);
}
