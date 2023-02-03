import { IconButton } from 'react-native-paper';
import { useState, useEffect } from 'react';
import { getStoredList, updateStoredList } from '../hooks/usefavoritelist';

export default function FavoriteButton({ job, buttonStyle, buttonColor, size }) {
  const [favorite, setFavorite] = useState([]);

  useEffect(() => {
    (async () => {
      const storedList = await getStoredList();
      setFavorite(storedList);
    })();
  }, []);

  return (
    <IconButton
      size={size}
      style={buttonStyle}
      iconColor={buttonColor}
      icon={favorite.includes(job) ? 'heart' : 'heart-outline'}
      onPress={() => updateStoredList(job)}
    ></IconButton>
  );
}
