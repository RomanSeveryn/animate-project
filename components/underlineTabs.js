import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('screen');

const images = {
  man: 'https://images.pexels.com/photos/3147528/pexels-photo-3147528.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  women:
    'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  kids: 'https://images.pexels.com/photos/5080167/pexels-photo-5080167.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  skullcandy:
    'https://images.pexels.com/photos/5602879/pexels-photo-5602879.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  help: 'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
};

const data = Object.keys(images).map((i) => ({
  key: i,
  title: i,
  image: images[i],
  ref: React.createRef(),
}));

const Tab = React.forwardRef(({ item, onItemPress }, ref) => {
  return (
    <TouchableOpacity onPress={onItemPress}>
      <View ref={ref}>
        <Text
          style={{
            color: 'white',
            fontSize: 84 / data.length,
            fontWeight: '800',
            textTransform: 'uppercase',
          }}
        >
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
});

const Indicator = ({ measures, scrollx }) => {
  const inputRange = data.map((_, i) => i * width);
  const indicatorWidth = scrollx.interpolate({
    inputRange,
    outputRange: measures.map((measure) => measure.width),
  });
  const translateX = scrollx.interpolate({
    inputRange,
    outputRange: measures.map((measure) => measure.x),
  });
  return (
    <Animated.View
      style={{
        position: 'absolute',
        backgroundColor: 'white',
        width: indicatorWidth,
        left: 0,
        height: 4,
        bottom: -10,
        transform: [
          {
            translateX,
          },
        ],
      }}
    />
  );
};

const Tabs = ({ scrollx, data, onItemPress }) => {
  const [measures, setMeasures] = useState([]);
  const containerRef = useRef();

  useEffect(() => {
    const m = [];
    data.forEach((item) => {
      item.ref.current.measureLayout(
        containerRef.current,
        (x, y, width, height) => {
          m.push({ x, y, width, height });
          console.log(x, y, width, height);
          if (m.length === data.length) {
            setMeasures(m);
          }
        },
      );
    });
  }, [measures[0]?.height === 0]);

  return (
    <View style={{ position: 'absolute', top: 100, width }}>
      <View
        ref={containerRef}
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}
      >
        {data.map((item, index) => {
          return (
            <Tab
              key={item.key}
              item={item}
              ref={item.ref}
              onItemPress={() => onItemPress(index)}
            />
          );
        })}
      </View>
      {measures.length > 0 && (
        <Indicator measures={measures} scrollx={scrollx} />
      )}
    </View>
  );
};

export const UnderlineTabs = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const ref = useRef();
  const onItemPress = useCallback((itemIndex) => {
    ref?.current?.scrollToOffset({ offset: itemIndex * width });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Animated.FlatList
        ref={ref}
        data={data}
        keyExtractor={(item) => item.key}
        horizontal
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false },
        )}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        renderItem={({ item }) => {
          return (
            <View style={{ width, height }}>
              <Image
                style={{ flex: 1, resizeMode: 'cover' }}
                source={{ uri: item.image }}
              />
              <View
                style={[
                  StyleSheet.absoluteFillObject,
                  { backgroundColor: 'rgba(0,0,0,0.3)' },
                ]}
              />
            </View>
          );
        }}
      />
      <Tabs scrollx={scrollX} data={data} onItemPress={onItemPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
