import { useState } from 'react';
import { Button, Image, StyleSheet, View, FlatList } from 'react-native';
import { ImageOrVideo } from 'react-native-image-crop-picker';
import ImagePickerService from './imageService';

export default function App() {
  const [images, setImages] = useState<ImageOrVideo[]>([]);
  const [loading, setLoading] = useState(false);

  const handleLoadPhotoFromGallery = async () => {
    setLoading(true);

    try {
      const result = await ImagePickerService.getFromPhotoLibrary();

      if (!result) return;

      setImages(Array.isArray(result) ? result : [result]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={s.content}>
      <Button
        title={loading ? 'Loading...' : 'Load from gallery'}
        onPress={handleLoadPhotoFromGallery}
        disabled={loading}
      />

      <FlatList
        data={images}
        keyExtractor={item => item.path}
        contentContainerStyle={s.imageContainer}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item.path }}
            style={s.image}
            resizeMode="contain"
          />
        )}
      />
    </View>
  );
}

const s = StyleSheet.create({
  content: {
    paddingHorizontal: 16,
    paddingVertical: 48,
    flex: 1,
    gap: 16,
  },
  imageContainer: {
    gap: 16,
  },
  image: {
    width: '100%',
    height: 300,
    backgroundColor: '#eee',
  },
});
