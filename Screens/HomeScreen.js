import { Text, StyleSheet, View, ImageBackground } from 'react-native';
import { useReducer, useState } from 'react';
import CarouselIndex from '../Components/CarouselIndex';
import { Searchbar, Chip, Button, useTheme } from 'react-native-paper';
import { useJobAdvertisements } from '../hooks/usejobadvertisements';
import { ScrollView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import OrganizationIntroduction from '../Components/OrganizationIntroduction';
import kuvaPng from '../assets/Rectangle90.png';
import ExtendedJobs from '../Components/ExtendedJobs';
import HomeScreenFooter from '../Components/HomeScreenFooter';
import PrimaryButton from '../Components/PrimaryButton';

export default function HomeScreen({ navigation }) {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const { jobs } = useJobAdvertisements();
  const jobCount = jobs.length ?? 0;
  const [searchQuery, setSearchQuery] = useState('');
  const [filtersHidden, toggleFilters] = useReducer((prev) => !prev, true);
  const carouselJobs = jobs ? jobs.slice(0, 3).map((j) => j.jobAdvertisement) : [];

  const onJobCountPress = () => navigation.navigate('Jobs');

  const onSubmitSearch = () => navigation.navigate('Jobs', { searchQuery });

  return (
    <ScrollView>
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
              Työnantajat
            </Chip>
            <Chip
              onPress={() => navigation.navigate('Filter', { list: 'regions' })}
              compact
              style={styles.chip}
            >
              Maakunnat
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
        <Button textColor="white" style={styles.searchButton} onPress={() => onSubmitSearch()}>
          ETSI
        </Button>
      </LinearGradient>
      <View style={styles.row}>
        <Text style={styles.carouselheader}>Sinulle suositellut työpaikat</Text>
      </View>
      <CarouselIndex navigation={navigation} carouselJobs={carouselJobs} />
      <ImageBackground source={kuvaPng} style={styles.imageBG}>
        <View style={styles.centerText}>
          <ImageBackground style={styles.containerAdd}>
            <Text style={styles.Add}>Avoin hakemus</Text>
            <Text style={styles.AddText}>Haluatko jättää avoimen hakemuksen? Klikkaa alta</Text>
            <PrimaryButton>Avoin hakemus</PrimaryButton>
          </ImageBackground>
          <ImageBackground style={styles.containerAdd}>
            <Text style={styles.Add}>Keikkatöihin</Text>
            <Text style={styles.AddText}>Kiinnostaako keikkatyö? Klikkaa alta.</Text>
            <PrimaryButton>Keikkatöihin</PrimaryButton>
          </ImageBackground>
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
      <OrganizationIntroduction />
      <ExtendedJobs />
      <HomeScreenFooter />
    </ScrollView>
  );
}

const makeStyles = (theme) =>
  StyleSheet.create({
    Add: {
      color: 'black',
      fontSize: 22,
    },
    AddText: {
      color: 'black',
      fontSize: 17,
    },
    addButton: {
      backgroundColor: theme.colors.secondary,
      color: 'white',
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
    centerText: {
      alignItems: 'center',
      bottom: 0,
      justifyContent: 'center',
      left: 0,
      marginTop: 100,
      position: 'absolute',
      right: 0,
      top: 0,
    },
    chip: {
      backgroundColor: theme.colors.chip,
      borderRadius: 8,
      marginHorizontal: '2%',
      margin: 5,
    },
    container: {
      alignItems: 'center',
      backgroundColor: 'lightblue',
      justifyContent: 'center',
      paddingVertical: 16,
    },
    containerAdd: {
      alignItems: 'center',
      backgroundColor: 'white',
      borderRadius: 10,
      margin: 12,
      padding: 12,
      width: '88%',
    },
    containerNews: {
      alignItems: 'center',
      backgroundColor: '#EEFAFF',
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
      backgroundColor: theme.colors.background,
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
    row: {
      alignItems: 'baseline',
      backgroundColor: theme.colors.background,
      flexDirection: 'row',
      padding: 26,
    },
    searchButton: {
      backgroundColor: theme.colors.chip,
      borderRadius: 5,
      height: 52,
      justifyContent: 'center',
      width: '88%',
      zIndex: 1,
    },
  });
