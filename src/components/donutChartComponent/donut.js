import React from 'react';
import { StyleSheet, TextInput, View, Animated, Easing } from 'react-native';
import Svg, { G, Circle } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export const Donut = ({
  percentage = 75,
  radius = 40,
  strokeWidth = 10,
  duration = 500,
  color = 'tomato',
  delay = 500,
  textColor,
  max = 100,
}) => {
  const animated = React.useRef(new Animated.Value(0)).current;
  const circleRef = React.useRef();
  const inputRef = React.useRef();
  const circumference = 2 * Math.PI * radius;
  const halfCircle = radius + strokeWidth;

  const animation = (toValue) => {
    return Animated.timing(animated, {
      delay: 1000,
      toValue,
      duration,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start(() => {
      //Todo: infinity loop animated
      animation(toValue === 0 ? percentage : 0);
    });
  };

  React.useEffect(() => {
    animation(percentage);
    animated.addListener(
      (v) => {
        const maxPerc = (100 * v.value) / max;
        const strokeDashoffset =
          circumference - (circumference * maxPerc) / 100;
        if (inputRef?.current) {
          inputRef.current.setNativeProps({
            text: `${Math.round(v.value)}`,
          });
        }
        if (circleRef?.current) {
          circleRef.current.setNativeProps({
            strokeDashoffset,
          });
        }
      },
      [max, percentage],
    );

    return () => {
      animated.removeAllListeners();
    };
  });

  return (
    <View>
      <Svg
        height={radius * 2}
        width={radius * 2}
        viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}
      >
        <G rotation='-90' origin={`${halfCircle}, ${halfCircle}`}>
          <Circle
            cx='50%'
            cy='50%'
            stroke={color}
            strokeWidth={strokeWidth}
            r={radius}
            fill='transparent'
            strokeOpacity={0.2}
          />
          <AnimatedCircle
            ref={circleRef}
            cx='50%'
            cy='50%'
            stroke={color}
            strokeWidth={strokeWidth}
            r={radius}
            fill='transparent'
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            strokeLinecap='round'
          />
        </G>
      </Svg>
      <AnimatedTextInput
        ref={inputRef}
        underlineColorAndroid='transparent'
        editable={false}
        defaultValue='0'
        style={[
          StyleSheet.absoluteFillObject,
          { fontSize: radius / 2, color: textColor ?? color },
          styles.text,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: { fontWeight: '900', textAlign: 'center' },
});
