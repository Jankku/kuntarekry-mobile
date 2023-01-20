import { Appbar } from 'react-native-paper';
import { colors } from '../styles/colors';
import { StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function AppBar({ navigation, back }) {
  return (
    <LinearGradient colors={['#0a8bc2', '#33cc80']} start={{ x: 0.6, y: 0.5 }} end={{ x: 0, y: 0 }}>
      <Appbar.Header style={styles.header} mode={'center-aligned'}>
        {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
        {/* <Appbar.Content titleStyle={{ color: 'white' }} title='Kuntarekry' /> */}
        <Appbar.Action disabled />
        <Image style={styles.image} source={require('../assets/logo.png')} />
        <Appbar.Action color={colors.onPrimary} icon="dots-vertical" onPress={() => {}} />
      </Appbar.Header>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bar: {
    alignSelf: 'stretch',
  },
  header: {
    backgroundColor: 'transparent',
  },
  image: {
    height: '40%',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '40%',
  },
});
