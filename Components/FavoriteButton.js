import { IconButton } from 'react-native-paper';
import { updateStoredList, useFavoriteList } from '../hooks/usefavoritelist';

export default function FavoriteButton({
  job,
  publication,
  link,
  employer,
  buttonStyle,
  buttonColor,
  size,
}) {
  const { favorites, updateFavorites } = useFavoriteList();

  const handlePress = async () => {
    if (job != null) {
      await updateStoredList('job', job, publication, link);
    } else {
      await updateStoredList('employer', employer);
    }
    updateFavorites();
  };

  const isFavorite =
    job != null
      ? favorites.jobs.some((fav) => fav.id === job.id)
      : favorites.employers.some((fav) => fav === employer);

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
