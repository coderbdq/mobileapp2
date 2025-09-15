import { StyleSheet } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#F9F4F4', dark: '#1D3D47' }}
      headerImage={
        <ThemedView style={styles.headerImage}>
          <ThemedText type="title">My App</ThemedText>
        </ThemedView>
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Project Home</ThemedText>
        <ThemedText>
          This is the home screen of your Expo app. You can customize this file
          to create your unique user interface.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Explore More</ThemedText>
        <ThemedText>
          Check out the other screens to see how navigation works.
        </ThemedText>
        <Link href="/explore" style={styles.link}>
          <ThemedText type="link">Go to Explore Tab,click here</ThemedText>
        </Link>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    height: 150,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  link: {
    marginTop: 10,
  },
});