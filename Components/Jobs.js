import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import JobListItem from './JobListItem';

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
        renderItem={({ item }) => <JobListItem job={item.jobAdvertisement} />}
        keyExtractor={(_, index) => index}
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

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
});
