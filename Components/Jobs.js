import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { Card, Button } from 'react-native-paper';
import dayjs from 'dayjs';

export default function Jobs({ navigation, data }) {
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
        renderItem={({ item }) => <JobItem navigation={navigation} item={item} />}
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

function JobItem({ navigation, item }) {
  if (item.jobAdvertisement.title && item.jobAdvertisement.title.length > 50) {
    item.jobAdvertisement.title = item.jobAdvertisement.title.substring(0, 50) + '...';
  }
  if (item.jobAdvertisement.organization && item.jobAdvertisement.organization.length > 40) {
    item.jobAdvertisement.organization =
      item.jobAdvertisement.organization.substring(0, 40) + '...';
  }
  return (
    <>
      <Card
        style={styles.border}
        onPress={() => navigation.navigate('Job', { job: item.jobAdvertisement })}
      >
        <Card.Content>
          <View style={styles.container}>
            <Button style={styles.button} icon="heart-outline"></Button>
            <View>
              <Text style={styles.itemHeaderText}>{item.jobAdvertisement.title}</Text>
              <Text style={styles.itemText}>{item.jobAdvertisement.organization}</Text>
              <Text style={styles.itemText}>
                Hakuaika päättyy {dayjs(item.jobAdvertisement.publicationEnds).format('l LT')}
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </>
  );
}

const styles = StyleSheet.create({
  border: {
    borderColor: 'lightgrey',
    borderStyle: 'solid',
    borderWidth: 1,
  },
  button: {
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'row',
    paddingVertical: 8,
    width: '92%',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  itemHeaderText: {
    fontSize: 16,
    fontWeight: '500',
  },
  itemText: {
    fontSize: 14,
    paddingVertical: 2,
  },
});
