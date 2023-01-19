import { FlatList, StyleSheet, Text, View } from 'react-native';
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Card } from 'react-native-paper';

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
      <View style={styles.footerContainer}>
        <Text>
          Sivu {1 + minIndex / 10} / {Maxpages}
        </Text>
        <Text onPress={onPageBack}>Takaisin</Text>
        <Text onPress={onPageForward}>Seuraava</Text>
      </View>
    </>
  );
}

function JobItem({ item }) {
  if (item.jobAdvertisement.jobDesc && item.jobAdvertisement.jobDesc.length > 200) {
    let truncationIndex = item.jobAdvertisement.jobDesc.substring(0, 200).lastIndexOf(' ');
    item.jobAdvertisement.jobDesc = (
      // eslint-disable-next-line react-native/no-inline-styles
      <Text style={{ flexDirection: 'row' }}>
        {item.jobAdvertisement.jobDesc.substring(0, truncationIndex)}
        <Text style={styles.blueText}>...Lue lisää</Text>
      </Text>
    );
  }
  return (
    <>
      <Card style={styles.item}>
        <Card.Title
          title={item.jobAdvertisement.title}
          subtitle={item.jobAdvertisement.organization}
        />
        <Card.Content>
          <Text variant="bodyMedium">{item.jobAdvertisement.jobDesc ?? 'Ei kuvausta'}</Text>
        </Card.Content>
      </Card>
    </>
  );
}

function ListItemSeparator(height) {
  return <View style={{ height: height }}></View>;
}

const styles = StyleSheet.create({
  blueText: {
    color: 'blue',
    fontWeight: 'bold',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  item: {
    backgroundColor: '#b2d9f7',
    padding: 8,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
