import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

export default function BackButton({ onPress }) {
  const { t } = useTranslation(['common']);

  return (
    <Button
      uppercase
      mode="contained"
      icon="arrow-left"
      contentStyle={styles.contentStyle}
      onPress={onPress}
    >
      {t('backward')}
    </Button>
  );
}

const styles = StyleSheet.create({
  contentStyle: { height: 50, width: 150 },
});
