import * as React from 'react';
import {
  Image,
  View,
  StatusBar,
  Dimensions,
  Animated,
  StyleSheet,
  Text,
} from 'react-native';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useRef } from 'react';

const { width, height } = Dimensions.get('screen');

const ITEM_WIDTH = width;
const ITEM_HEIGHT = height * 0.75;

const images = [
  'https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_1_1_1.jpg?ts=1606727905128',
  'https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_2_1_1.jpg?ts=1606727908993',
  'https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_2_2_1.jpg?ts=1606727889015',
  'https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_2_3_1.jpg?ts=1606727896369',
  'https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_2_4_1.jpg?ts=1606727898445',
];

const product = {
  title: 'SOFT MINI CROSSBODY BAG WITH KISS LOCK',
  description: [
    'Mini crossbody bag available in various colours. Featuring two compartments. Handles and detachable crossbody shoulder strap. Lined interior. Clasp with two metal pieces.',
    'Height x Length x Width: 14 x 21.5 x 4.5 cm. / 5.5 x 8.4 x 1.7"',
  ],
  price: '29.99£',
};

const DOT_SIZE = 8;
const DOT_SPACING = 8;
const DOT_INDICATOR = DOT_SIZE + DOT_SPACING;

export const FlatListHorizontalAndBottomSheet = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  return (
    <View style={{ flex: 1 }}>
      <StatusBar hidden />
      <View style={{ height: ITEM_HEIGHT, overflow: 'hidden' }}>
        <Animated.FlatList
          data={images}
          snapToInterval={ITEM_HEIGHT}
          decelerationRate='fast'
          showsVerticalScrollIndicator={false}
          bounces={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true },
          )}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => {
            return (
              <View>
                <Image source={{ uri: item }} style={styles.image} />
              </View>
            );
          }}
        />
        <View style={styles.pagination}>
          {images.map((item, index) => {
            return <View key={index} style={[styles.dot]} />;
          })}
          <Animated.View
            style={[
              styles.dotIndicator,
              {
                transform: [
                  {
                    translateY: Animated.divide(
                      scrollY,
                      ITEM_HEIGHT,
                    ).interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, DOT_INDICATOR],
                    }),
                  },
                ],
              },
            ]}
          />
        </View>
      </View>
      <BottomSheet
        initialSnapIndex={0}
        snapPoints={[height - ITEM_HEIGHT, height]}
      >
        <BottomSheetScrollView
          style={{ backgroundColor: 'white' }}
          contentContainerStyle={{ padding: 20 }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: '800',
              textTransform: 'uppercase',
            }}
          >
            {product.title}
          </Text>
          <Text
            style={{
              fontSize: 16,
            }}
          >
            {product.price}
          </Text>
          <View style={{ marginVertical: 20 }}>
            {product.description.map((text, index) => {
              return (
                <Text key={index} style={{ marginBottom: 10, lineHeight: 22 }}>
                  {text}
                </Text>
              );
            })}
          </View>
          <View style={{ marginVertical: 20 }}>
            {product.description.map((text, index) => {
              return (
                <Text key={index} style={{ marginBottom: 10, lineHeight: 22 }}>
                  {text}
                </Text>
              );
            })}
          </View>
          <View style={{ marginVertical: 20 }}>
            {product.description.map((text, index) => {
              return (
                <Text key={index} style={{ marginBottom: 10, lineHeight: 22 }}>
                  {text}
                </Text>
              );
            })}
          </View>
          <View style={{ marginVertical: 20 }}>
            {product.description.map((text, index) => {
              return (
                <Text key={index} style={{ marginBottom: 10, lineHeight: 22 }}>
                  {text}
                </Text>
              );
            })}
          </View>
          <View style={{ marginVertical: 20 }}>
            {product.description.map((text, index) => {
              return (
                <Text key={index} style={{ marginBottom: 10, lineHeight: 22 }}>
                  {text}
                </Text>
              );
            })}
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  image: { height: ITEM_HEIGHT, width: ITEM_WIDTH, resizeMode: 'cover' },
  pagination: {
    position: 'absolute',
    top: ITEM_HEIGHT / 2,
    left: 20,
  },
  dot: {
    height: DOT_SIZE,
    width: DOT_SIZE,
    borderRadius: DOT_SIZE,
    backgroundColor: '#333',
    marginBottom: DOT_SPACING,
  },
  dotIndicator: {
    height: DOT_INDICATOR,
    width: DOT_INDICATOR,
    borderRadius: DOT_INDICATOR,
    borderColor: '#333',
    borderWidth: 1,
    position: 'absolute',
    top: -DOT_SIZE / 2,
    left: -DOT_SIZE / 2,
  },
});
