import { StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <ThemedView style={styles.headerImage} >
          <ThemedText type="title">Explore</ThemedText>
        </ThemedView>
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="subtitle">Information</ThemedText>
      </ThemedView>
      <ThemedView style={styles.contentContainer}>
        <ThemedText>
          This is the Explore tab. You can use this screen to add more features or information about your app.
        </ThemedText>
        <ThemedText>
          The layout is similar to the Home screen, using a ParallaxScrollView and themed components.
        </ThemedText>
        <ThemedText type="defaultSemiBold">
          Feel free to edit this file to create your own unique content.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    paddingLeft: 30,
    paddingBottom: 20,
    justifyContent: 'flex-end',
    height: '100%',
    width: '100%',
  },
  titleContainer: {
    gap: 8,
    marginBottom: 8,
  },
  contentContainer: {
    gap: 8,
  },
});