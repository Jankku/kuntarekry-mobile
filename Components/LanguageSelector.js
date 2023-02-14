import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import { LANGUAGE_KEY } from '../hooks/usepersonalisation';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IconButton } from 'react-native-paper';

export default function LanguageSelector() {
  const { i18n } = useTranslation();
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
    <View style={{ margin: 10 }}>
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
      <IconButton
        style={{ marginLeft: 0, marginRight: 0 }}
        icon={() => <Image style={styles.flagIcon} source={languageIcons[i18n.language]} />}
        onPress={() => setShowLanguageSelector(!showLanguageSelector)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flagIcon: {
    height: 30,
    marginLeft: 5,
    width: 30,
  },
  languageSelector: {
    backgroundColor: 'rgba(0,86,68,.6)',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginLeft: 10,
    padding: 5,
    width: '50%',
  },
});
