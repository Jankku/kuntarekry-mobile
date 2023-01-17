import Jobs from '../Components/Jobs';
import Header from '../Components/Header';
import { Text, StyleSheet, View, TextInput, Button } from 'react-native';
import { useState } from 'react';
import CarouselIndex from '../Components/CarouselIndex';

export default function HomeScreen() {
  const [text, onChangeText] = useState('Search');
  const [openJobs, setOpenJobs] = useState(0);
  const [carousel, setCarousel] = useState([]);
  const [carousel2, setCarousel2] = useState([]);
  const [carousel3, setCarousel3] = useState([]);
  const getJobs = (totalJobs) => {
    setOpenJobs(totalJobs);
  };
  const getCarousel = (carousel) => {
    setCarousel(carousel[0]);
    setCarousel2(carousel[1]);
    setCarousel3(carousel[2]);
  };

  return (
    <>
      <Header />
      <View style={styles.container}>
        <Text style={styles.headertext}>Hae</Text>
        <Text style={styles.headertext}>TYÖPAIKKAA</Text>
        <TextInput style={styles.input} onChangeText={onChangeText} value={text} />
        <View style={styles.buttonrow}>
          <Button m={2} title="Työpaikka" />
          <Button title="Keikkatyö" />
          <Button title="Kesätyö" />
        </View>
        <View style={styles.buttonrow}>
          <Button title="Työpaikka" />
          <Button title="Keikkatyö" />
          <Button title="Kesätyö" />
        </View>
        <Text>{openJobs} avointa työpaikkaa</Text>
      </View>
      <View style={styles.jobsContainer}>
        <Text>Sinulle suositellut työpaikat</Text>
        {/*Tästä voisi tehdä oman karuselli komponentin, näyttää tällä hetkellä vain ensimmäisen työpaikan listalta*/}
      </View>
      <CarouselIndex carouselJobs={carousel} carouselJobs2={carousel2} carouselJobs3={carousel3} />
      <Jobs getJobs={getJobs} getCarousel={getCarousel} />
    </>
  );
}

const styles = StyleSheet.create({
  buttonrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 12,
  },
  container: {
    alignItems: 'center',
    backgroundColor: 'lightblue',
    justifyContent: 'center',
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
