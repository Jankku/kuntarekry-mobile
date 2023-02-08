import { View, Text, ImageBackground, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-paper';
import KuntarekryPng from '../assets/Kuntarekry.png';
import Suoss from '../assets/Suoss.png';
import kuntarekrylogo from '../assets/kuntarekrylogo.png';
import { useJobAdvertisements } from '../hooks/usejobadvertisements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import SocialMediaButton from './onboarding/SocialMediaButton';
import fcgBluePng from '../assets/fcg-blue.png';
import avainLippu from '../assets/avainlippu.png';

export default function HomeScreenFooter() {
  const navigation = useNavigation();
  const { jobs } = useJobAdvertisements();
  //find most common regions top 5
  const regions = jobs.map((job) => job.jobAdvertisement.region);
  //remove undefined
  const filteredRegions = regions.filter((region) => region);
  const regionCount = {};
  filteredRegions.forEach((region) => {
    regionCount[region] = (regionCount[region] || 0) + 1;
  });
  const regionCountArray = Object.entries(regionCount);
  const sortedRegionCountArray = regionCountArray.sort((a, b) => b[1] - a[1]);
  const top5Regions = sortedRegionCountArray.slice(0, 5);

  //top 5 locations
  const locations = jobs.map((job) => job.jobAdvertisement.location);
  //remove undefined
  const filteredLocations = locations.filter((location) => location);
  const locationCount = {};
  filteredLocations.forEach((location) => {
    locationCount[location] = (locationCount[location] || 0) + 1;
  });
  const locationCountArray = Object.entries(locationCount);
  const sortedLocationCountArray = locationCountArray.sort((a, b) => b[1] - a[1]);
  const top5Locations = sortedLocationCountArray.slice(0, 5);

  //top 5 taskArea
  const taskAreas = jobs.map((job) => job.jobAdvertisement.taskArea);
  //remove null
  const filteredTaskAreas = taskAreas.filter((taskArea) => taskArea);
  const taskAreaCount = {};
  filteredTaskAreas.forEach((taskArea) => {
    taskAreaCount[taskArea] = (taskAreaCount[taskArea] || 0) + 1;
  });
  const taskAreaCountArray = Object.entries(taskAreaCount);
  const sortedTaskAreaCountArray = taskAreaCountArray.sort((a, b) => b[1] - a[1]);
  const top5TaskAreas = sortedTaskAreaCountArray.slice(0, 5);

  return (
    <>
      <ImageBackground source={KuntarekryPng} style={styles.imageBG}></ImageBackground>
      <View style={{ backgroundColor: '#1D847E' }}>
        <Text style={styles.heading}>Suosituimmat Maakunnat</Text>
        <View style={styles.container}>
          {top5Regions.map((region, i) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Jobs', { buttonJobQuery: region[0], filter: 'region' })
              }
              key={i}
            >
              <Text key={i} style={styles.listing}>
                {region[0]}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Button
          onPress={() => navigation.navigate('Filter', { list: 'regions' })}
          style={styles.btn}
        >
          <Text style={styles.btnText}>Näytä kaikki</Text>
        </Button>
        <Text style={styles.heading}>Suosituimmat kunnat</Text>
        <View style={styles.container}>
          {top5Locations.map((location, i) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Jobs', { buttonJobQuery: location[0], filter: 'location' })
              }
              key={i}
            >
              <Text style={styles.listing}>{location[0]}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Button
          onPress={() => navigation.navigate('Filter', { list: 'locations' })}
          style={styles.btn}
        >
          <Text style={styles.btnText}>Näytä kaikki</Text>
        </Button>
        <Text style={styles.heading}>Suosituimmat Tehtäväalueet</Text>
        <View style={styles.container}>
          {top5TaskAreas.map((taskArea, i) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Jobs', { buttonJobQuery: taskArea[0], filter: 'taskArea' })
              }
              key={i}
            >
              <Text key={i} style={styles.listing}>
                {taskArea[0]}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Button
          onPress={() => navigation.navigate('Filter', { list: 'taskAreas' })}
          style={styles.btn}
        >
          <Text style={styles.btnText}>Näytä kaikki</Text>
        </Button>
      </View>
      <Image source={Suoss} style={{ width: '100%', height: 100 }}></Image>
      <View style={{ backgroundColor: '#FFFFFF' }}>
        <Image
          source={kuntarekrylogo}
          style={{ height: 36, width: 185, marginLeft: '15%' }}
        ></Image>
        <Text style={styles.footerText}>
          <Text style={styles.bold}>Kuntarekrystä</Text> löytyy tuhansia avoimia työpaikkoja
          kaikkialta Suomesta.
        </Text>
        <Text style={styles.footerText}>
          <Text style={styles.bold}>Työnhakijoille</Text> tarjoamme työvälineet työpaikkojen,
          sijaisuuksien ja keikkatöiden hakemiseen sekä tietoa työskentelystä kunta-alalla.
        </Text>
        <Text style={styles.footerText}>
          <Text style={styles.bold}>Työnantajille</Text> - kunnille, kaupungeille, kuntayhtymille ja
          kuntien omistamille yrityksille - tarjoamme rekrytoinnin ohjelmisto- ja
          asiantuntijapalveluja, jotka sopivat ulkoiseen ja sisäiseen rekrytointiin sekä
          sijaisuuksien hallintaan.
        </Text>
        <Text style={styles.footerText}>
          Verkkopalvelussamme käytetään <Text style={styles.bold}>evästeitä</Text>{' '}
          käyttäjäkokemuksen parantamiseen. Käyttämällä palvelua hyväksyt evästeiden käytön. Katso
          palvelun <Text style={styles.blueText}>tietosuojaseloste, tietosuojalauseke</Text> sekä{' '}
          <Text style={styles.blueText}>saavutettavuusseloste.</Text>
        </Text>
        <Text style={styles.footerText}>
          <Text style={styles.bold}>Palautetta</Text> voit lähettää osoitteeseen:{' '}
          <Text onPress={() => Linking.openURL('mailto:tuki@fcgtalent.fi')} style={styles.blueText}>
            tuki@fcgtalent.fi
          </Text>
        </Text>
        <Text style={styles.footerText}>
          <Text style={styles.bold}>Löydät meidät myös täältä:</Text>
        </Text>
        <View style={{ flexDirection: 'row', marginLeft: '10%' }}>
          <SocialMediaButton icon="facebook" link="https://www.facebook.com/kuntarekry" />
          <SocialMediaButton icon="twitter" link="https://twitter.com/kuntarekry" />
          <SocialMediaButton icon="instagram" link="https://www.instagram.com/kuntarekry/" />
          <SocialMediaButton
            icon="linkedin"
            link="https://www.linkedin.com/company/kl-kuntarekry-oy"
          />
        </View>
        <Image
          source={fcgBluePng}
          style={{ width: 85, height: 29, marginTop: 20, marginLeft: '15%' }}
        ></Image>
        <Text style={styles.footerText}>
          <Text style={styles.blueText}>Kuntarekry</Text>-palvelun tuottaa{' '}
          <Text style={styles.blueText}>FCG Talent Oy.</Text>
        </Text>
        <Text style={styles.footerText}>
          <Text style={styles.blueText}>FCG Finnish Consulting Group Oy</Text> on osa{' '}
          <Text style={styles.blueText}>Kuntaliitto-konsernia.</Text>
        </Text>
        <View style={{ marginLeft: '15%' }}>
          <Text style={styles.bigBlueText}>200 000+</Text>
          <Text>Sijaisuutta täytetty</Text>
          <Text style={styles.bigBlueText}>130 000+</Text>
          <Text>Käyntiä viikossa</Text>
          <Text style={styles.bigBlueText}>2,5+</Text>
          <Text>Million vuosittaista kävijää</Text>
          <Text style={styles.bigBlueText}>300+</Text>
          <Text>Asiakasorganisaatiota</Text>
          <Image source={avainLippu} style={styles.flagImage}></Image>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  bigBlueText: {
    color: '#167FAC',
    fontSize: 48,
  },
  blueText: {
    color: '#35A9DB',
  },
  bold: {
    fontWeight: 'bold',
  },
  btn: {
    borderColor: 'white',
    borderWidth: 1,
    marginLeft: '15%',
    marginTop: 10,
    width: 150,
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
  container: {
    borderLeftColor: 'white',
    borderLeftWidth: 1,
    marginLeft: '15%',
    width: '100%',
  },
  flagImage: {
    height: 69,
    marginBottom: 20,
    marginTop: 20,
    width: 48,
  },
  footerText: {
    lineHeight: 19,
    marginLeft: '15%',
    marginRight: '10%',
    marginTop: 20,
  },
  heading: {
    color: 'white',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: 24,
    marginBottom: 10,
    marginLeft: '15%',
    marginTop: 40,
    textAlign: 'left',
  },
  imageBG: {
    height: 399,
    width: '100%',
  },
  listing: {
    color: 'white',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 24,
    marginBottom: 4,
    marginLeft: 10,
  },
});
