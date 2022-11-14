import React from 'react';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

export const ListItem = React.memo(({ item, viewableItems }) => {
  const rStyle = useAnimatedStyle(() => {
    const isVisible = Boolean(
      viewableItems.value
        .filter((item) => item.isViewable)
        .find((viewableItem) => viewableItem.item.id === item.id),
    );
    return {
      opacity: withTiming(isVisible ? 1 : 0, { duration: 0.25 }),
      transform: [
        {
          scale: withTiming(isVisible ? 1 : 0),
        },
      ],
    };
  });
  return (
    <Animated.View
      style={[
        {
          height: 80,
          width: '90%',
          backgroundColor: '#78CAD2',
          marginTop: 20,
          alignSelf: 'center',
          borderRadius: 20,
        },
        rStyle,
      ]}
    />
  );
});
