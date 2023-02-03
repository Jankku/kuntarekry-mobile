import { StyleSheet } from 'react-native';
import { Button, useTheme } from 'react-native-paper';

export default function PrimaryButton({ children, buttonColor, textColor, onPress }) {
  const theme = useTheme();

  return (
    <Button
      mode="contained"
      icon="chevron-right"
      buttonColor={buttonColor ?? '#167FAC'}
      textColor={textColor ?? theme.colors.onPrimary}
      labelStyle={styles.text}
      contentStyle={styles.contentStyle}
      onPress={onPress}
    >
      {children}
    </Button>
  );
}

const styles = StyleSheet.create({
  contentStyle: { alignItems: 'center', flexDirection: 'row-reverse' },
  text: {
    fontWeight: '500',
    textTransform: 'uppercase',
  },
});
