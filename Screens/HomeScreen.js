import { Text, StyleSheet, View, SafeAreaView, ImageBackground } from 'react-native';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import CarouselIndex from '../Components/CarouselIndex';
import { Searchbar, Chip } from 'react-native-paper';
import useJobAdvertisements from '../hooks/usejobadvertisements';

export default function HomeScreen({ navigation }) {
  const jobs = useJobAdvertisements();
  const jobCount = jobs.length ?? 0;
  const [searchQuery, setSearchQuery] = useState('');
  const carouselJobs = jobs ? jobs.slice(0, 3).map((j) => j.jobAdvertisement) : [];

  const onJobCountPress = () => {
    navigation.navigate('Jobs');
  };

  const onSubmitSearch = () => navigation.navigate('Jobs', { searchQuery });

  return (
    <SafeAreaView>
      <StatusBar style="auto" />
      <ImageBackground
        source={require('../assets/sky-g79e40b0ac_1280.png')}
        style={styles.container}
      >
        <Text style={styles.headertext}>Hae</Text>
        <Text style={styles.headertext2}>TYÖPAIKKAA</Text>

        <Searchbar
          style={styles.input}
          onChangeText={setSearchQuery}
          onSubmitEditing={onSubmitSearch}
          onIconPress={onSubmitSearch}
          value={searchQuery}
          placeholder="Tehtävänimike, sijainti, työavain..."
        />
        <View style={styles.buttonrow}>
          <Chip style={styles.chip}>Työpaikka</Chip>
          <Chip style={styles.chip}>Keikkatyö</Chip>
          <Chip style={styles.chip}>Kesätyö</Chip>
        </View>
        <View style={styles.buttonrow}>
          <Chip style={styles.chip}>Hyvinvointialueet</Chip>
          <Chip style={styles.chip} icon="filter">
            LISÄÄ
          </Chip>
        </View>
        <Text onPress={onJobCountPress}>{jobCount} avointa työpaikkaa</Text>
      </ImageBackground>
      <View style={styles.row}>
        <Text style={styles.carouselheader}>Sinulle suositellut työpaikat</Text>
      </View>

      <CarouselIndex carouselJobs={carouselJobs} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonrow: {
    flexDirection: 'row',
    paddingTop: 5,
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
  chip: {
    borderWidth: 0,
    marginHorizontal: '2%',
    margin: 5,
    width: 'auto',
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
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
