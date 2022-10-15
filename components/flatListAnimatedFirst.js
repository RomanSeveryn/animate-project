import * as React from 'react';
import {
  StatusBar,
  Image,
  Animated,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import { useRef } from 'react';

const DATA = [
  'https://images.unsplash.com/photo-1551316679-9c6ae9dec224?w=800&q=80',
  'https://images.unsplash.com/photo-1562569633-622303bafef5?w=800&q=80',
  'https://images.unsplash.com/photo-1503656142023-618e7d1f435a?w=800&q=80',
  'https://images.unsplash.com/photo-1555096462-c1c5eb4e4d64?w=800&q=80',
  'https://images.unsplash.com/photo-1517957754642-2870518e16f8?w=800&q=80',
  'https://images.unsplash.com/photo-1546484959-f9a381d1330d?w=800&q=80',
  'https://images.unsplash.com/photo-1548761208-b7896a6ff225?w=800&q=80',
  'https://images.unsplash.com/photo-1511208687438-2c5a5abb810c?w=800&q=80',
  'https://images.unsplash.com/photo-1548614606-52b4451f994b?w=800&q=80',
  'https://images.unsplash.com/photo-1548600916-dc8492f8e845?w=800&q=80',
  'https://images.unsplash.com/photo-1551316679-9c6ae9dec224?w=800&q=80',
  'https://images.unsplash.com/photo-1562569633-622303bafef5?w=800&q=80',
  'https://images.unsplash.com/photo-1503656142023-618e7d1f435a?w=800&q=80',
  'https://images.unsplash.com/photo-1555096462-c1c5eb4e4d64?w=800&q=80',
  'https://images.unsplash.com/photo-1517957754642-2870518e16f8?w=800&q=80',
  'https://images.unsplash.com/photo-1546484959-f9a381d1330d?w=800&q=80',
  'https://images.unsplash.com/photo-1548761208-b7896a6ff225?w=800&q=80',
  'https://images.unsplash.com/photo-1511208687438-2c5a5abb810c?w=800&q=80',
  'https://images.unsplash.com/photo-1548614606-52b4451f994b?w=800&q=80',
  'https://images.unsplash.com/photo-1548600916-dc8492f8e845?w=800&q=80',
  'https://images.unsplash.com/photo-1551316679-9c6ae9dec224?w=800&q=80',
  'https://images.unsplash.com/photo-1562569633-622303bafef5?w=800&q=80',
  'https://images.unsplash.com/photo-1503656142023-618e7d1f435a?w=800&q=80',
  'https://images.unsplash.com/photo-1555096462-c1c5eb4e4d64?w=800&q=80',
  'https://images.unsplash.com/photo-1517957754642-2870518e16f8?w=800&q=80',
  'https://images.unsplash.com/photo-1546484959-f9a381d1330d?w=800&q=80',
  'https://images.unsplash.com/photo-1548761208-b7896a6ff225?w=800&q=80',
  'https://images.unsplash.com/photo-1511208687438-2c5a5abb810c?w=800&q=80',
  'https://images.unsplash.com/photo-1548614606-52b4451f994b?w=800&q=80',
  'https://images.unsplash.com/photo-1548600916-dc8492f8e845?w=800&q=80',
];

const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

const BG_IMAGE =
  'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80';

export const FlatListAnimated = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar hidden />
      <Image source={{ uri: BG_IMAGE }} style={StyleSheet.absoluteFillObject} />
      <Animated.FlatList
        data={DATA}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
        )}
        contentContainerStyle={{
          padding: SPACING,
          paddingTop: StatusBar.currentHeight || 42,
        }}
        renderItem={({ item, index }) => {
          const inputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 2),
          ];
          const opacityInputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 1),
          ];
          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0],
          });
          const opacity = scrollY.interpolate({
            inputRange: opacityInputRange,
            outputRange: [1, 1, 1, 0],
          });
          return (
            <Animated.View
              style={{
                flexDirection: 'row',
                padding: SPACING,
                marginBottom: SPACING,
                backgroundColor: 'rgba(255, 255, 255, .7)',
                borderRadius: 12,
                shadowColor: '#000',
                shadowOffset: {
                  height: 10,
                  width: 0,
                },
                shadowOpacity: 0.5,
                shadowRadius: 20,
                transform: [{ scale }],
                opacity,
              }}
              key={index}
            >
              <Image
                source={{ uri: item }}
                style={{
                  height: AVATAR_SIZE,
                  width: AVATAR_SIZE,
                  borderRadius: AVATAR_SIZE,
                  marginRight: SPACING / 2,
                }}
              />
              <View>
                <Text style={{ fontSize: 22, fontWeight: '700' }}>
                  long name
                </Text>
                <Text style={{ fontSize: 18, opacity: 0.7 }}>second name</Text>
                <Text style={{ fontSize: 14, opacity: 0.8, color: '#0099cc' }}>
                  test.email
                </Text>
              </View>
            </Animated.View>
          );
        }}
      />
    </View>
  );
};
