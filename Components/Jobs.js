import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text } from 'react-native';
import { API_URL, API_CLIENT } from '@env';

export default function Jobs({ getJobs }) {
  const [jobAds, setJobAds] = useState();

  useEffect(() => {
    (async () => {
      const url = new URL('/portal-api/recruitment/open-jobs', API_URL);
      url.searchParams.append('client', API_CLIENT);
      const res = await fetch(url.toString());
      const json = await res.json();
      setJobAds(json.jobAdvertisements);
      getJobs(json.jobAdvertisements.length);
    })();
  }, [getJobs]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      {jobAds !== undefined ? (
        <FlatList
          data={jobAds}
          renderItem={({ item }) => (
            <Text key={item.jobAdvertisement.id}>
              {item.jobAdvertisement.id} - {item.jobAdvertisement.title}
            </Text>
          )}
        />
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
});
