import { Text, StyleSheet, View, ImageBackground } from 'react-native';
import { useReducer, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import CarouselIndex from '../Components/CarouselIndex';
import { Searchbar, Chip, Button } from 'react-native-paper';
import { useJobAdvertisements } from '../hooks/usejobadvertisements';
import { ScrollView } from 'react-native-gesture-handler';
import { colors } from '../styles/colors';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen({ navigation }) {
  const { jobs } = useJobAdvertisements();
  const jobCount = jobs.length ?? 0;
  const [searchQuery, setSearchQuery] = useState('');
  const [filtersHidden, toggleFilters] = useReducer((prev) => !prev, true);
  const carouselJobs = jobs ? jobs.slice(0, 3).map((j) => j.jobAdvertisement) : [];

  const onJobCountPress = () => navigation.navigate('Jobs');

  const onSubmitSearch = () => navigation.navigate('Jobs', { searchQuery });

  return (
    <ScrollView>
      <StatusBar style="auto" />
      <LinearGradient
        colors={['#0a8bc2', '#33cc80']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.0, y: 1.3 }}
        style={styles.container}
      >
        <Text style={styles.headertext}>Avoimet</Text>
        <Text style={styles.headertext2}>TYÖPAIKAT</Text>
        <Text style={styles.headerCount} onPress={onJobCountPress}>
          <Text style={{ fontWeight: '700' }}>{jobCount}</Text> avointa työpaikkaa
        </Text>

        <View style={styles.buttonrow}>
          <Chip
            onPress={() =>
              navigation.navigate('Jobs', { buttonJobQuery: 'Kokoaikatyö', filter: 'employment' })
            }
            compact
            style={styles.chip}
          >
            Kokoaikatyö
          </Chip>
          <Chip
            onPress={() =>
              navigation.navigate('Jobs', { buttonJobQuery: 'Osa-aikatyö', filter: 'employment' })
            }
            compact
            style={styles.chip}
          >
            Osa-aikatyö
          </Chip>
          <Chip
            onPress={() =>
              navigation.navigate('Jobs', { buttonJobQuery: 'Kesätyö', filter: 'employment' })
            }
            compact
            style={styles.chip}
          >
            Kesätyö
          </Chip>
        </View>
        <View style={styles.buttonrow}>
          <Chip
            onPress={() =>
              navigation.navigate('Jobs', { buttonJobQuery: 'Harjoittelu', filter: 'employment' })
            }
            style={styles.chip}
            compact
          >
            Harjoittelu
          </Chip>
          <Button
            textColor="white"
            compact
            contentStyle={{ flexDirection: 'row-reverse' }}
            icon="filter"
            style={styles.chip}
            onPress={toggleFilters}
          >
            Lisää rajauksia
          </Button>
        </View>
        {!filtersHidden ? (
          <View style={styles.buttonrow}>
            <Chip
              onPress={() => navigation.navigate('Filter', { list: 'organizations' })}
              compact
              style={styles.chip}
            >
              työnantajat
            </Chip>
            <Chip
              onPress={() => navigation.navigate('Filter', { list: 'regions' })}
              compact
              style={styles.chip}
            >
              maakunnat
            </Chip>
          </View>
        ) : null}
        <Searchbar
          style={styles.input}
          onChangeText={setSearchQuery}
          onSubmitEditing={onSubmitSearch}
          onIconPress={onSubmitSearch}
          value={searchQuery}
          placeholder="Tehtävänimike, sijainti, ..."
        />
        <Button textColor="white" style={styles.search} onPress={() => onSubmitSearch()}>
          ETSI
        </Button>
      </LinearGradient>
      <View style={styles.row}>
        <View>
          <Text style={styles.carouselheader}>Sinulle suositellut</Text>
          <Text style={styles.carouselheader}>työpaikat</Text>
        </View>
        <Button
          contentStyle={{ flexDirection: 'row-reverse' }}
          mode="text"
          style={styles.chip1}
          icon="target"
        >
          PAIKANNA
        </Button>
      </View>
      <CarouselIndex navigation={navigation} carouselJobs={carouselJobs} />
      <View style={styles.imageBG}>
        <View style={styles.centerText}>
          <ImageBackground
            source={require('../assets/sky-g79e40b0ac_1280.png')}
            style={styles.containerAdd}
          >
            <Text style={styles.Add}>Avoin hakemus</Text>
            <Text style={styles.AddText}>Haluatko jättää avoimen hakemuksen? Klikkaa alta</Text>
            <Button
              contentStyle={{ flexDirection: 'row-reverse' }}
              icon="chevron-right"
              style={styles.addButton}
              mode={'contained'}
            >
              AVOIN HAKEMUS
            </Button>
          </ImageBackground>
          <ImageBackground
            source={require('../assets/sky-g79e40b0ac_1280.png')}
            style={styles.containerAdd}
          >
            <Text style={styles.Add}>Keikkatöihin</Text>
            <Text style={styles.AddText}>Kiinnostaako keikkatyö? Klikkaa alta.</Text>
            <Button icon="chevron-right" style={styles.addButton} mode={'contained'}>
              KEIKKATÖIHIN
            </Button>
          </ImageBackground>
        </View>
      </View>
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
  Add: {
    color: 'white',
    fontSize: 24,
    marginBottom: 8,
  },
  AddText: {
    color: 'white',
    fontSize: 19,
    marginBottom: 24,
  },
  addButton: {
    backgroundColor: colors.secondary,
    color: 'white',
  },
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
    backgroundColor: colors.Chip,
    borderRadius: 8,
    marginHorizontal: '2%',
    margin: 5,
  },
  chip1: {
    marginHorizontal: '2%',
    margin: 5,
  },
  chip2: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
    color: '#006B96',
    fontSize: 16,
    marginTop: 40,
    padding: 14,
    zIndex: 1,
  },
  circle: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: 21,
    overflow: 'hidden',
    position: 'absolute',
    top: 364,
    transform: [{ scaleX: 9 }],
    width: 42,
  },
  circle2: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: 21,
    overflow: 'hidden',
    position: 'absolute',
    top: 411,
    transform: [{ scaleX: 10 }],
    width: 42,
  },
  container: {
    alignItems: 'center',
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  containerAdd: {
    borderRadius: 3,
    flex: 1,
    height: 250,
    marginBottom: 4,
    marginHorizontal: 3,
    overflow: 'hidden',
    paddingHorizontal: 70,
    paddingVertical: 32,
  },
  containerNews: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    padding: 12,
  },
  headerCount: {
    color: 'white',
    fontSize: 20,
    fontWeight: '400',
    marginBottom: 28,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 9,
  },
  headertext: {
    color: 'white',
    fontSize: 28,
    fontWeight: '400',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 9,
  },
  headertext2: {
    color: 'white',
    fontSize: 36,
    fontWeight: '700',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 9,
  },
  heading: {
    fontSize: 16,
  },
  imageBG: {
    backgroundColor: colors.background,
    height: 470,
    width: '100%',
  },
  imageBG2: {
    height: 200,
    width: '100%',
  },
  input: {
    backgroundColor: 'white',
    marginVertical: 12,
    width: '88%',
  },
  jobsContainer: {
    backgroundColor: colors.background,
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
    alignItems: 'baseline',
    backgroundColor: colors.background,
    flexDirection: 'row',
    padding: 26,
  },
  search: {
    backgroundColor: '#009978',
    borderRadius: 5,
    height: 52,
    justifyContent: 'center',
    width: '88%',
    zIndex: 1,
  },
});
