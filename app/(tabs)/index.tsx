import { Image, StyleSheet, Platform } from 'react-native';
import { useDogImage } from '@/hooks/useDogImage';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const { imageUrl, isLoading, error, refetch } = useDogImage();

  return (
    <ThemedView style={styles.container}>
      {isLoading && <ThemedText>Loading...</ThemedText>}
      {error && <ThemedText>Error: {error}</ThemedText>}
      {imageUrl && (
        <Image
          source={{ uri: imageUrl }}
          style={styles.dogImage}
          resizeMode="cover"
        />
      )}
      <ThemedText 
        onPress={refetch}
        style={styles.button}
      >
        Fetch New Dog
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  dogImage: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#A1CEDC',
    borderRadius: 5,
  },
});

