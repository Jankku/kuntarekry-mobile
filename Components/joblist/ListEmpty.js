import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

export default function ListEmpty() {
  const { t } = useTranslation('common');

  return (
    <View>
      <Text variant="titleMedium" style={{ marginTop: 8, textAlign: 'center' }}>
        {t('noResults')}
      </Text>
    </View>
  );
}
