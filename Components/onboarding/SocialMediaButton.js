import { IconButton } from 'react-native-paper';
import * as WebBrowser from 'expo-web-browser';

export default function SocialMediaButton({ icon, link }) {
  const onPress = () => {
    WebBrowser.openBrowserAsync(link);
  };

  return <IconButton icon={icon} size={32} iconColor="#35a9db" onPress={onPress} />;
}
