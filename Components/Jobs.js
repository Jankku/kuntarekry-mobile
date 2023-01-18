import { FlatList, StyleSheet, Text, View } from 'react-native';
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';

export default function Jobs({ data }) {
  const [minIndex, setMinIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(10);
  const Maxpages = Math.ceil(data.length / 10);

  const onPageForward = () => {
    if (Maxpages > 1 + minIndex / 10) {
      setMinIndex(minIndex + 10);
      setMaxIndex(maxIndex + 10);
    }
  };
  const onPageBack = () => {
    if (1 + minIndex / 10 > 1) {
      setMinIndex(minIndex - 10);
      setMaxIndex(maxIndex - 10);
    }
  };
  return (
    <>
      <FlatList
        data={data.slice(minIndex, maxIndex)}
        ListEmptyComponent={<Text>Ei työpaikkailmoituksia</Text>}
        renderItem={JobItem}
        keyExtractor={(_, index) => index}
        ItemSeparatorComponent={ListItemSeparator(16)}
      />
      <View>
        <Text>
          Page {1 + minIndex / 10} / {Maxpages}
        </Text>
        <Text onPress={onPageForward}>Seuraava</Text>
        <Text onPress={onPageBack}>Takaisin</Text>
      </View>
    </>
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
