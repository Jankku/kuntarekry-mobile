import { Text, Linking, TouchableOpacity } from 'react-native';
import { useCallback } from 'react';

export default function OpenURLButton({ url, style }) {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      await Linking.openURL('http://' + url);
    }
  }, [url]);

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={style}>{url}</Text>
    </TouchableOpacity>
  );
}
