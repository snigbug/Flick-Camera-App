// screens/FeedScreen.js
import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import Swiper from 'react-native-deck-swiper';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const FeedScreen = ({ route }) => {
  const { photo } = route.params;

  return (
    <View style={styles.container}>
      <Swiper
        cards={[{ uri: `file://${photo}` }]}
        renderCard={(card) => (
          <View style={styles.card}>
            <Image source={card} style={styles.image} />
          </View>
        )}
        stackSize={3}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: screenWidth,
    height: screenHeight,
  },
});

export default FeedScreen;
