import { IconButton } from 'react-native-paper';
import { useState, useEffect } from 'react';
import { getStoredList, updateStoredList } from '../hooks/usefavoritelist';
import { useFocusEffect } from '@react-navigation/native';
import React from 'react';

export default function FavoriteButton({ job, buttonStyle, buttonColor, size }) {
  const [favorite, setFavorite] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        const storedList = await getStoredList();
        setFavorite(storedList);
      })();
    }, [])
  );

  useEffect(() => {
    (async () => {
      const storedList = await getStoredList();
      setFavorite(storedList);
    })();
  }, []);
  const handlePress = async () => {
    await updateStoredList(job);
    const storedList = await getStoredList();
    setFavorite(storedList);
  };

  return (
    <IconButton
      size={size}
      style={buttonStyle}
      iconColor={buttonColor}
      icon={favorite.some((item) => item.id === job.id) ? 'heart' : 'heart-outline'}
      onPress={handlePress}
    ></IconButton>
  );
}
