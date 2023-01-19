import { Text, StyleSheet, View, ImageBackground } from 'react-native';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import CarouselIndex from '../Components/CarouselIndex';
import { Searchbar, Chip } from 'react-native-paper';
import useJobAdvertisements from '../hooks/usejobadvertisements';
import { ScrollView } from 'react-native-gesture-handler';
import { colors } from '../styles/colors';

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
    <ScrollView>
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
          <Chip
            onPress={() => navigation.navigate('Jobs', { buttonJobQuery: 'Kesätyö' })}
            style={styles.chip}
          >
            Kesätyö
          </Chip>
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
      <ImageBackground source={{ uri: 'https://reactjs.org/logo-og.png' }} style={styles.imageBG}>
        <View style={styles.centerText}>
          <View style={styles.containerAdd}>
            <Text style={{ color: colors.surface }}>Keikkatöihin</Text>
          </View>
          <View style={styles.containerAdd}>
            <Text style={{ color: colors.surface }}>Avoin hakemus</Text>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.containerNews}>
        <Text>Uutiset ja Tapahtumat</Text>
        <Text style={styles.heading}>Kuntarekryssä näkyy ja tapahtuu</Text>
        <ImageBackground
          source={{ uri: 'https://reactjs.org/logo-og.png' }}
          style={styles.imageBG2}
        ></ImageBackground>
        <Text>Profiili kesäkuntoon</Text>
        <Text>
          Kesä ja helteet ovat löytäneet Suomen. Siksi voi olla vaikeaa asennoitua vaikkapa
          työnhakuun...
        </Text>
        <View style={styles.buttonrow}>
          <Chip style={styles.chip}>Ajankohtaista</Chip>
          <Chip style={styles.chip}>Tapahtumat</Chip>
        </View>
        <View style={styles.buttonrow}>
          <Chip style={styles.chip}>Työelämä</Chip>
          <Chip style={styles.chip}>Töitä hakemassa</Chip>
        </View>
        <View style={styles.buttonrow}>
          <Chip style={styles.chip}>Näytä kaikki uutiset</Chip>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bgPicture: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'cover',
  },
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
  centerText: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
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
  containerAdd: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 10,
    margin: 12,
    padding: 12,
    width: '88%',
  },
  containerNews: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    padding: 12,
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
  heading: {
    fontSize: 16,
  },
  imageBG: {
    height: 400,
    width: '100%',
  },
  imageBG2: {
    height: 200,
    width: '100%',
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
