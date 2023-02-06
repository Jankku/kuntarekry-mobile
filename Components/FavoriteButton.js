import { IconButton } from 'react-native-paper';
import { updateStoredList, useFavoriteList } from '../hooks/usefavoritelist';

export default function FavoriteButton({ job, buttonStyle, buttonColor, size }) {
  const { favorites, updateFavorites } = useFavoriteList();

  const handlePress = async () => {
    await updateStoredList(job);
    updateFavorites();
  };

  const isFavorite = favorites.some((item) => item.id === job.id);

  return (
    <IconButton
      size={size}
      style={buttonStyle}
      iconColor={buttonColor}
      icon={isFavorite ? 'heart' : 'heart-outline'}
      onPress={handlePress}
    ></IconButton>
  );
}
