import { View } from "moti";
import { MotiView } from "@motify/components";
import { Easing } from "react-native-reanimated";
import { StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

const color = "#6E01EF";
const size = 100;
export const RingingWave = () => {
  return (
    <View style={styles.container}>
      <View style={[styles.dot, styles.center]}>
        {[...Array(3).keys()].map((index) => {
          return (
            <MotiView
              from={{ opacity: 0.7, scale: 1 }}
              animate={{ opacity: 0, scale: 4 }}
              transition={{
                type: "timing",
                duration: 2000,
                easing: Easing.out(Easing.ease),
                loop: true,
                repeatReverse: false,
                delay: index * 400,
              }}
              key={index}
              style={[StyleSheet.absoluteFillObject, styles.dot]}
            />
          );
        })}
        <Feather name="phone-outgoing" size={24} color="white" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    height: size,
    width: size,
    borderRadius: size,
    backgroundColor: color,
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
});
