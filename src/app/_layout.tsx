import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: '#F6F3EB' },
        headerTintColor: '#203B33',
        headerTitleStyle: { color: '#203B33', fontWeight: '800' },
        contentStyle: { backgroundColor: '#F6F3EB' },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'ایرانگرد', headerShown: false }} />
      <Stack.Screen name="map" options={{ title: 'نقشه‌ی ایران' }} />
    </Stack>
  );
}
