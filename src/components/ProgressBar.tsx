import { StyleSheet, View } from 'react-native';

export default function ProgressBar({
  percent,
  color = '#2F725F',
  height = 10,
}: {
  percent: number;
  color?: string;
  height?: number;
}) {
  const safePercent = Math.max(0, Math.min(100, percent));

  return (
    <View style={[styles.track, { height, borderRadius: height / 2 }]}>
      <View
        style={[
          styles.fill,
          {
            width: `${safePercent}%`,
            height,
            borderRadius: height / 2,
            backgroundColor: color,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: '100%',
    backgroundColor: '#E8ECE6',
    overflow: 'hidden',
  },
  fill: {
    alignSelf: 'flex-end',
  },
});
