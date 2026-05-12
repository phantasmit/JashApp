import React, { useMemo } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Base64Image = React.memo(({ base64}) => {
  const imageUri = useMemo(() => {
    if (!base64) return '';
    return `data:image/png;base64,${base64}`;
  }, [base64]);

  if (!base64) return null;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: imageUri }}
        style={styles.image}
        resizeMode="contain"
        progressiveRenderingEnabled={true}
        fadeDuration={0}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  image: {
    width: '95%',
    //height: 300,
    aspectRatio: 1
  },
});

export default Base64Image;
