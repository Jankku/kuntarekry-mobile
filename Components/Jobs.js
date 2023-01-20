import { FlatList, StyleSheet, Text, View } from 'react-native';
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Card, Button } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
      <TouchableOpacity onPress={() => navigation.navigate('Job', { job: item.jobAdvertisement })}>
        <Card style={styles.border}>
          <Card.Content style={styles.container}>
            <View style={styles.container}>
              <Button style={styles.button} icon="heart-outline"></Button>
              <View style={styles.column}>
                <Text style={styles.header}>{item.jobAdvertisement.title}</Text>
                <View style={styles.heightTen} />
                <Text style={styles.text2}>{item.jobAdvertisement.organization}</Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
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
  column: {
    flexDirection: 'column',
  },
  container: {
    flexDirection: 'row',
    paddingVertical: 15,
    width: '92%',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  header: {
    fontSize: 16,
  },
  heightTen: {
    height: 10,
  },
  text: {
    fontSize: 13,
  },
  text2: {
    fontSize: 14,
  },
});
