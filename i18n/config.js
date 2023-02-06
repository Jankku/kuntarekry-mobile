import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  fallbackLng: 'fi',
  nonExplicitSupportedLngs: true,
  ns: ['translations'],
  defaultNS: 'translations',
  resources: {
    fi: {
      translations: require('./translation/fi.json'),
    },
    en: {
      translations: require('./translation/en.json'),
    },
    sv: {
      translations: require('./translation/sv.json'),
    },
  },
});

i18n.languages = ['fi', 'en', 'sv'];

export default i18n;
