import { Appbar, Badge, IconButton } from 'react-native-paper';
import { colors } from '../styles/colors';
import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFavoriteList } from '../hooks/usefavoritelist';
import { LANGUAGE_KEY } from '../hooks/usepersonalisation';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import AsyncStorage from '@react-native-async-storage/async-storage';
export default function AppBar({ navigation, back }) {
  // eslint-disable-next-line no-unused-vars
  const { i18n } = useTranslation();
  const { favorites } = useFavoriteList();
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);

  const languageIcons = {
    fi: require('../assets/finlandIcon.png'),
    sv: require('../assets/swedenIcon.png'),
    en: require('../assets/ukIcon.png'),
  };

  const onChangeLanguage = useCallback(
    async (value) => {
      try {
        await AsyncStorage.setItem(LANGUAGE_KEY, String(value));
        await i18n.changeLanguage(value);
      } catch (error) {
        console.error(error);
      }
    },
    [i18n]
  );
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
        <Image style={styles.image} source={require('../assets/logo.png')} />
        <Appbar.Action
          color={colors.onPrimary}
          icon="heart"
          onPress={() => navigation.navigate('Favorites')}
        />
        <Badge size={18} style={styles.badge} visible={favorites.length > 0 ? true : false}>
          {favorites.length}
        </Badge>
        <IconButton
          style={{ marginLeft: 0, marginRight: 0 }}
          icon={() => <Image style={styles.flagIcon} source={languageIcons[i18n.language]} />}
          onPress={() => setShowLanguageSelector(!showLanguageSelector)}
        />
        {showLanguageSelector && (
          <View style={styles.languageSelector}>
            {Object.keys(languageIcons).map((language) => (
              <TouchableOpacity
                key={language}
                onPress={async () => {
                  onChangeLanguage(language);
                  setShowLanguageSelector(false);
                  await AsyncStorage.setItem(LANGUAGE_KEY, language);
                }}
              >
                <Image style={styles.flagIcon} source={languageIcons[language]} />
              </TouchableOpacity>
            ))}
          </View>
        )}
      </Appbar.Header>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: 'rgba(0,86,68,.6)',
    position: 'absolute',
    right: 58,
    top: 14,
  },
  flagIcon: {
    height: 30,
    margin: 5,
    width: 30,
  },
  header: {
    backgroundColor: 'transparent',
  },
  image: {
    height: '40%',
    marginLeft: '16%',
    marginRight: 'auto',
    width: '40%',
  },
  languageSelector: {
    backgroundColor: 'rgba(0,86,68,.6)',
    borderRadius: 5,
    flexDirection: 'column',
    padding: 5,
    position: 'absolute',
    right: 0,
    top: 50,
    width: 50,
  },
});
