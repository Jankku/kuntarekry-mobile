import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

export default function BackButton({ onPress }) {
  return (
    <Button
      uppercase
      mode="contained"
      icon="arrow-left"
      contentStyle={styles.contentStyle}
      onPress={onPress}
    >
      Takaisin
    </Button>
  );
}

const styles = StyleSheet.create({
  contentStyle: { height: 50, width: 150 },
});
