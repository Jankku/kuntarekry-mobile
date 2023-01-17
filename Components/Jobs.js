import { FlatList, StyleSheet, Text, View } from 'react-native';

export default function Jobs({ data }) {
  return (
    <FlatList
      data={data}
      ListEmptyComponent={<Text>Ei työpaikkailmoituksia</Text>}
      renderItem={JobItem}
      keyExtractor={(_, index) => index}
      ItemSeparatorComponent={ListItemSeparator(16)}
    />
  );
}

function JobItem({ item }) {
  return (
    <View style={styles.item}>
      <Text style={styles.itemTitle}>{item.jobAdvertisement.title}</Text>
      <Text>{item.jobAdvertisement.jobDesc ?? 'Ei kuvausta'}</Text>
    </View>
  );
}

function ListItemSeparator(height) {
  return <View style={{ height: height }}></View>;
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#b2d9f7',
    padding: 8,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
