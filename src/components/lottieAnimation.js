import Lottie from 'lottie-react-native';
import { View } from 'react-native';

export const LottieAnimation = () => {
  return (
    <View style={{ flex: 1 }}>
      <Lottie source={require('../assets/happy_delivery.json')} autoPlay loop />
    </View>
  );
};
