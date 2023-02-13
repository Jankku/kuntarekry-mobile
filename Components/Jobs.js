import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import JobListItem from './JobListItem';
import { Divider } from 'react-native-paper';

export default function Jobs({ data, sortType }) {
  const [sortedData, setSortedData] = useState(null);
  useEffect(() => {
    if (sortType != null) {
      const jobs = [...data];
      switch (sortType) {
        case 'newest':
          setSortedData(
            jobs.slice().sort((a, b) => {
              return b.jobAdvertisement.publicationStarts.localeCompare(
                a.jobAdvertisement.publicationStarts
              );
            })
          );
          break;
        case 'endTime':
          setSortedData(
            jobs.slice().sort((a, b) => {
              return a.jobAdvertisement.publicationEnds.localeCompare(
                b.jobAdvertisement.publicationEnds
              );
            })
          );
          break;
        case 'employer':
          setSortedData(
            jobs.slice().sort((a, b) => {
              if (a.jobAdvertisement.profitCenter == null) {
                console.log(a.jobAdvertisement);
              }
              if (b.jobAdvertisement.profitCenter == null) {
                console.log(b.jobAdvertisement);
              }
              return a.jobAdvertisement.profitCenter?.localeCompare(
                b.jobAdvertisement.profitCenter
              );
            })
          );
          break;
        case 'location':
          alert('Sijainti ei ole käytössä');
          break;
      }
    }
  }, [data, sortType]);

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
        data={
          sortedData === null
            ? data.slice(minIndex, maxIndex)
            : sortedData.slice(minIndex, maxIndex)
        }
        ListEmptyComponent={<Text>Ei työpaikkailmoituksia</Text>}
        renderItem={({ item }) => <JobListItem job={item.jobAdvertisement} />}
        keyExtractor={(_, index) => index}
      />
      <Divider />
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
