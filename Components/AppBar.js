import { Appbar } from 'react-native-paper';
import { colors } from '../styles/colors';
import { Image } from 'react-native';

export default function AppBar ({ navigation, back }) {
  return (
    <Appbar.Header style={{ backgroundColor: colors.primary }} mode={'center-aligned'}>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      {/* <Appbar.Content titleStyle={{ color: 'white' }} title='Kuntarekry' /> */}
      <Appbar.Action disabled />
      <Image
        style={{
          width: '40%',
          height: '40%',
          marginRight: 'auto',
          marginLeft: 'auto',
        }}
        source={require('../assets/logo.png')}
      />
      <Appbar.Action color={colors.onPrimary} icon='dots-vertical' onPress={() => {}} />
    </Appbar.Header>
  );
}
