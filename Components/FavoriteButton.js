import { IconButton } from 'react-native-paper';
import useFavoriteList from '../hooks/usefavoritelist';

export default function FavoriteButton({ jobId, buttonStyle, buttonColor, size }) {
  const [favorite, setFavorite] = useFavoriteList();

  function handleFavorite() {
    if (favorite.includes(jobId)) {
      const newList = favorite.filter((item) => item !== jobId);
      setFavorite(newList);
      console.log('filterlist', newList);
    } else {
      const newList = [...favorite, jobId];
      setFavorite(newList);
      console.log('newlist', newList);
    }
  }

  return (
    <IconButton
      size={size}
      style={buttonStyle}
      iconColor={buttonColor}
      icon={favorite.includes(jobId) ? 'heart' : 'heart-outline'}
      onPress={() => handleFavorite()}
    ></IconButton>
  );
}
