import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Button,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import { API_URL, API_CLIENT } from '@env';
import { useEffect, useMemo, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import Jobs from '../Components/Jobs';
import CarouselIndex from '../Components/CarouselIndex';
import { Searchbar, Chip } from 'react-native-paper';

export default function HomeScreen () {
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
      <StatusBar style='auto' />
      <ImageBackground
        source={require('../assets/sky-g79e40b0ac_1280.png')}
        style={styles.container}
      >
        <Text style={styles.headertext}>Hae</Text>
        <Text style={styles.headertext2}>TYÖPAIKKAA</Text>

        <Searchbar
          // icon={'target'}
          style={styles.input}
          onChangeText={setSearchQuery}
          value={searchQuery}
          placeholder='Tehtävänimike, sijainti, työavain...'
        />
        <View style={styles.buttonrow}>
          <Chip style={styles.chip}>Työpaikka</Chip>
          <Chip style={styles.chip}>Keikkatyö</Chip>
          <Chip style={styles.chip}>Kesätyö</Chip>
        </View>
        <View style={styles.buttonrow}>
          <Chip style={styles.chip}>Hyvinvointialueet</Chip>
          <Chip style={styles.chip} icon='filter'>
            LISÄÄ
          </Chip>
        </View>
        <Text>{jobCount} avointa työpaikkaa</Text>
      </ImageBackground>
      <View style={styles.row}>
        <Text style={styles.carouselheader}>Sinulle suositellut työpaikat</Text>
        <Text style={styles.carouselheader2}>PAIKANNA</Text>
      </View>

      <CarouselIndex carouselJobs={carouselJobs} />
      <Jobs data={filteredJobs} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonrow: {
    flexDirection: 'row',
    paddingTop: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  chip: {
    //backgroundColor: colors.transparentButtonBackground,
    marginHorizontal: '2%',
    borderWidth: 0,
    width: 'auto',
    margin: 5,
  },
  container: {
    alignItems: 'center',
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  headertext: {
    color: 'white',
    fontSize: 28,
    fontWeight: '400',
    textAlign: 'center',
  },
  headertext2: {
    color: 'white',
    fontSize: 36,
    fontWeight: '700',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 1,
  },
  carouselheader: {
    color: 'black',
    fontSize: 24,
    fontWeight: '400',
  },
  carouselheader2: {
    color: '#35A9DB',
    fontSize: 13,
    fontWeight: '700',
  },
  input: {
    backgroundColor: 'white',

    height: 45,
    margin: 12,
    width: '88%',
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
