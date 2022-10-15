import * as React from 'react';
import {
  StatusBar,
  TouchableOpacity,
  Animated,
  View,
  StyleSheet,
} from 'react-native';
import Constants from 'expo-constants';
import { AntDesign } from '@expo/vector-icons';
import { useRef, useState } from 'react';

const AnimatedAntDesign = Animated.createAnimatedComponent(AntDesign);
const CIRCLE_SIZE = 100;

const Circle = ({ onPress, animatedValue }) => {
  const inputRange = [0, 0.001, 0.5, 0.501, 1];
  const containerBg = animatedValue.interpolate({
    inputRange,
    outputRange: ['gold', 'gold', 'gold', '#444', '#444'],
  });
  const circleBg = animatedValue.interpolate({
    inputRange,
    outputRange: ['#444', '#444', '#444', 'gold', 'gold'],
  });
  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        styles.circleContainer,
        { backgroundColor: containerBg },
      ]}
    >
      <Animated.View
        style={[
          styles.circle,
          {
            backgroundColor: circleBg,
            transform: [
              { perspective: 400 },
              {
                rotateY: animatedValue.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: ['0deg', '-90deg', '-180deg'],
                }),
              },
              {
                scale: animatedValue.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [1, 8, 1],
                }),
              },
              {
                translateX: animatedValue.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0, 50, 0],
                }),
              },
            ],
          },
        ]}
      >
        <TouchableOpacity onPress={onPress}>
          <View style={[styles.circle, styles.circleButton]}>
            <AnimatedAntDesign name='arrowright' size={28} color={'white'} />
          </View>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

export const MindBlowingAnimation = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const animation = (toValue) =>
    Animated.timing(animatedValue, {
      toValue,
      duration: 3000,
      useNativeDriver: false,
    });
  const [index, setIndex] = useState(0);
  const onPress = () => {
    setIndex(index === 1 ? 0 : 1);
    animation(index === 1 ? 0 : 1).start();
  };
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Circle onPress={onPress} animatedValue={animatedValue} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    padding: 8,
    paddingBottom: 50,
  },
  circleContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 8,
    paddingBottom: 100,
    backgroundColor: 'gold',
  },
  circleButton: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paragraph: {
    margin: 12,
    fontSize: 24,
    // fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Menlo',
    color: 'white',
  },
  button: {
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    backgroundColor: '#444',
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
  },
});
