import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  fallbackLng: 'fi',
  nonExplicitSupportedLngs: true,
  ns: ['translations', 'common'],
  defaultNS: 'translations',
  resources: {
    fi: {
      translations: require('./translation/fi/translation.json'),
      common: require('./translation/fi/common.json'),
    },
    sv: {
      translations: require('./translation/sv/translation.json'),
      common: require('./translation/sv/common.json'),
    },
    en: {
      translations: require('./translation/en/translation.json'),
      common: require('./translation/en/common.json'),
    },
  },
});

i18n.languages = ['fi', 'en', 'sv'];

export default i18n;
