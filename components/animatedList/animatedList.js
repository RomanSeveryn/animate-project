import { FlatList, View } from 'react-native';
import { ListItem } from './listItem';
import { useSharedValue } from 'react-native-reanimated';

const data = new Array(50).fill(1).map((_, index) => ({ id: index }));

export const AnimatedList = () => {
  const viewableItems = useSharedValue([]);
  return (
    <View>
      <FlatList
        data={data}
        contentContainerStyle={{ paddingTop: 40 }}
        onViewableItemsChanged={({ viewableItems: vItems }) => {
          viewableItems.value = vItems;
        }}
        renderItem={({ item }) => {
          return <ListItem item={item} viewableItems={viewableItems} />;
        }}
      />
    </View>
  );
};
