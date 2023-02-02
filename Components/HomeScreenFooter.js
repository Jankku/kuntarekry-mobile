import { View, Text, ImageBackground, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-paper';
import KuntarekryPng from '../assets/Kuntarekry.png';
import Suoss from '../assets/Suoss.png';
import kuntarekrylogo from '../assets/kuntarekrylogo.png';
export default function HomeScreenFooter() {
  return (
    <>
      <ImageBackground source={KuntarekryPng} style={styles.imageBG}></ImageBackground>
      <View style={{ backgroundColor: '#1D847E' }}>
        <Text style={styles.heading}>Suosituimmat Maakunnat</Text>
        <View style={styles.container}>
          <Text style={styles.listing}>Uusimaa</Text>
          <Text style={styles.listing}>Varsinais-Suomi</Text>
          <Text style={styles.listing}>Pohjois-Pohjanmaa</Text>
          <Text style={styles.listing}>Pohjois-Savo</Text>
          <Text style={styles.listing}>Keski-Suomi</Text>
        </View>
        <Button style={styles.btn}>
          <Text style={styles.btnText}>Näytä kaikki</Text>
        </Button>
        <Text style={styles.heading}>Suosituimmat kunnat</Text>
        <View style={styles.container}>
          <Text style={styles.listing}>Turku</Text>
          <Text style={styles.listing}>Oulu</Text>
          <Text style={styles.listing}>Espoo</Text>
          <Text style={styles.listing}>Jyväskylä</Text>
          <Text style={styles.listing}>Lahti</Text>
        </View>
        <Button style={styles.btn}>
          <Text style={styles.btnText}>Näytä kaikki</Text>
        </Button>
        <Text style={styles.heading}>Suosituimmat ammattialat</Text>
        <View style={styles.container}>
          <Text style={styles.listing}>Opetus- ja kulttuuriala</Text>
          <Text style={styles.listing}>Terveydenhuoltoala</Text>
          <Text style={styles.listing}>Sosiaaliala</Text>
          <Text style={styles.listing}>Tekninen ala</Text>
          <Text style={styles.listing}>Hallinto- ja toimistotyö</Text>
        </View>
        <Button style={styles.btn}>
          <Text style={styles.btnText}>Näytä kaikki</Text>
        </Button>
        <Text style={styles.heading}>Suosituimmat Tehtäväalueet</Text>
        <View style={styles.container}>
          <Text style={styles.listing}>Sairaanhoitajat ja terveydenhoitajat</Text>
          <Text style={styles.listing}>Varhaiskasvatus</Text>
          <Text style={styles.listing}>Lähi- ja perushoitajat</Text>
          <Text style={styles.listing}>Luokanopettajat</Text>
          <Text style={styles.listing}>Aineenopettajat ja lehtorit</Text>
        </View>
        <Button style={styles.btn}>
          <Text style={styles.btnText}>Näytä kaikki</Text>
        </Button>
      </View>
      <Image source={Suoss} style={{ width: '100%', height: 100 }}></Image>
      <View style={{ backgroundColor: '#FFFFFF' }}>
        <Image
          source={kuntarekrylogo}
          style={{ height: 36, width: 185, marginLeft: '15%' }}
        ></Image>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
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
