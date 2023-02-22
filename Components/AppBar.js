import { Appbar, Badge } from 'react-native-paper';
import { colors } from '../styles/colors';
import { StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFavoriteList } from '../hooks/usefavoritelist';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function AppBar({ navigation, back }) {
  const { favorites } = useFavoriteList();

  return (
    <LinearGradient colors={['#0a8bc2', '#33cc80']} start={{ x: 0.9, y: 0.8 }} end={{ x: 0, y: 0 }}>
      <Appbar.Header style={styles.header} mode={'center-aligned'}>
        {back ? (
          <Appbar.BackAction color={colors.onPrimary} onPress={navigation.goBack} />
        ) : (
          <Appbar.Action
            color={colors.onPrimary}
            icon="menu"
            onPress={() => navigation.openDrawer()}
          />
        )}

        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image style={styles.image} resizeMode="contain" source={require('../assets/logo.png')} />
        </TouchableOpacity>

        <Appbar.Action
          color={colors.onPrimary}
          icon="heart"
          onPress={() => navigation.navigate('Favorites')}
        />
        <Badge size={18} style={styles.badge} visible={favorites.jobs.length > 0}>
          {favorites.jobs.length}
        </Badge>
      </Appbar.Header>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: 'rgba(0, 86, 68, 0.7)',
    position: 'absolute',
    right: 10,
    top: 12,
  },
  header: {
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  image: { height: 50, width: 150 },
});
