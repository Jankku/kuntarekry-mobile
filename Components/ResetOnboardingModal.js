import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { Button, Modal, Portal, Text } from 'react-native-paper';

export default function ResetOnboardingModal({ visible, onYesPress, onNoPress }) {
  const { t } = useTranslation(['translations', 'common']);

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onNoPress}
        style={{ marginHorizontal: 32 }}
        contentContainerStyle={{
          backgroundColor: 'white',
          borderRadius: 4,
          padding: 16,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text variant="bodyLarge">{t('drawer.resetOnboardingModalText')}</Text>
        <View style={{ flexDirection: 'row', marginTop: 16 }}>
          <Button mode="contained" onPress={onYesPress} style={{ marginRight: 16 }}>
            {t('yes', { ns: 'common' })}
          </Button>
          <Button mode="contained" onPress={onNoPress}>
            {t('no', { ns: 'common' })}
          </Button>
        </View>
      </Modal>
    </Portal>
  );
}
