import Jobs from '../Components/Jobs';
import Header from '../Components/Header';
import { Text, StyleSheet, View, TextInput, Button } from 'react-native';
import { useState } from 'react';

export default function HomeScreen() {
  const [text, onChangeText] = useState('Search');
  const [openJobs, setOpenJobs] = useState(0);

  const getJobs = (totalJobs) => {
    setOpenJobs(totalJobs);
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
      <Jobs getJobs={getJobs} />
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
});
