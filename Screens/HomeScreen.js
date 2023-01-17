import { Text, StyleSheet, View, TextInput, Button, SafeAreaView } from 'react-native';
import { API_URL, API_CLIENT } from '@env';
import { useEffect, useMemo, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import Jobs from '../Components/Jobs';
import CarouselIndex from '../Components/CarouselIndex';

export default function HomeScreen() {
  const [jobs, setJobs] = useState([]);
  const jobCount = jobs.length;
  const [searchQuery, setSearchQuery] = useState('');
  const [carouselJobs, setCarouselJobs] = useState([]);

  useEffect(() => {
    (async () => {
      const url = new URL('/portal-api/recruitment/open-jobs', API_URL);
      url.searchParams.append('client', API_CLIENT);
      const res = await fetch(url.toString());
      const json = await res.json();
      setJobs(json.jobAdvertisements);
      setCarouselJobs(json.jobAdvertisements.slice(0, 3).map((job) => job.jobAdvertisement));
    })();
  }, []);

  const filteredJobs = useMemo(
    () =>
      jobs.length > 0
        ? jobs.filter((j) =>
            j.jobAdvertisement.title.toLowerCase().includes(searchQuery.toLocaleLowerCase())
          )
        : [],
    [jobs, searchQuery]
  );

  return (
    <SafeAreaView>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <Text style={styles.headertext}>Hae Työpaikkaa</Text>
        <TextInput
          style={styles.input}
          onChangeText={setSearchQuery}
          value={searchQuery}
          placeholder="Search"
        />
        <View style={styles.buttonrow}>
          <Button title="Työpaikka" />
          <Button title="Keikkatyö" />
          <Button title="Kesätyö" />
        </View>
        <View style={styles.buttonrow}>
          <Button title="Työpaikka" />
          <Button title="Keikkatyö" />
          <Button title="Kesätyö" />
        </View>
        <Text>{jobCount} avointa työpaikkaa</Text>
      </View>
      <CarouselIndex carouselJobs={carouselJobs} />
      <Jobs data={filteredJobs} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 8,
  },
  container: {
    alignItems: 'center',
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  headertext: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    height: 40,
    margin: 12,
    paddingLeft: 8,
    width: '80%',
  },
  jobsContainer: {
    backgroundColor: 'white',
    padding: 12,
  },
  jobsOrganisation: {
    fontSize: 12,
    marginTop: 12,
  },
  jobsTitle: {
    fontSize: 20,
  },
});
