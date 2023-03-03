import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
} from "react-native";
import { useRef } from "react";

export const FlatListSlider = () => {
  const { width, height } = Dimensions.get("screen");
  const images = [
    "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80",
    "https://images.unsplash.com/photo-1460039230329-eb070fc6c77c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    "https://images.unsplash.com/photo-1469259943454-aa100abba749?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
  ];

  const imageW = width * 0.7;
  const imageH = imageW * 1.54;

  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={[StyleSheet.absoluteFill]}>
        {images.map((image, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0],
          });
          return (
            <Animated.Image
              key={index}
              style={[StyleSheet.absoluteFill, { opacity }]}
              blurRadius={50}
              source={{ uri: image }}
            />
          );
        })}
      </View>

      <Animated.FlatList
        data={images}
        horizontal
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                width,
                justifyContent: "center",
                alignItems: "center",
                // shadowColor: '#fff',
                // shadowOpacity: 11.5,
                // shadowOffset: {
                // height: 0,
                // width: 0},
                // shadowRadius: 20
              }}
            >
              <Image
                source={{ uri: item }}
                style={{ height: imageH, width: imageW, borderRadius: 16 }}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
});

// import { StatusBar } from "expo-status-bar";
// import {
//   FlatList,
//   Image,
//   StyleSheet,
//   Text,
//   View,
//   Dimensions,
// } from "react-native";
//
// export const FlatListSlider = () => {
//   const { width, height } = Dimensions.get("screen");
//   const images = [
//     "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80",
//     "https://images.unsplash.com/photo-1460039230329-eb070fc6c77c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
//     "https://images.unsplash.com/photo-1469259943454-aa100abba749?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
//   ];
//
//   const imageW = width * 0.7;
//   const imageH = imageW * 1.54;
//
//   return (
//     <View style={styles.container}>
//       <StatusBar hidden />
//       <View style={[StyleSheet.absoluteFill]}>
//         {images.map((image, index) => {
//           return (
//             <Image key={index} style={{ flex: 1 }} source={{ uri: image }} />
//           );
//         })}
//       </View>
//
//       <FlatList
//         data={images}
//         horizontal
//         pagingEnabled
//         renderItem={({ item }) => {
//           console.log("item", item);
//           return (
//             <View
//               style={{ width, justifyContent: "center", alignItems: "center" }}
//             >
//               <Image
//                 source={{ uri: item }}
//                 style={{ height: imageH, width: imageW, borderRadius: 16 }}
//               />
//             </View>
//           );
//         }}
//       />
//     </View>
//   );
// };
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#000",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
