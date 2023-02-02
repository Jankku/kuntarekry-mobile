import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useFavoriteList() {
  const [storedList, setStoredList] = useState([]);
  const KEY = 'favoritelist';
  //AsyncStorage.removeItem(KEY);
  useEffect(() => {
    getStoredList();
  }, []);

  async function getStoredList() {
    try {
      const item = await AsyncStorage.getItem(KEY);
      const list = item ? JSON.parse(item) : [];
      console.log('Found this: ' + list);
      setStoredList(list);
    } catch (e) {
      alert(e);
      setStoredList([]);
    }
  }

  const setValue = async (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedList) : value;
      setStoredList(valueToStore);
      await AsyncStorage.setItem(KEY, JSON.stringify(valueToStore));
      console.log('Stored successfully', valueToStore);
    } catch (e) {
      alert(e);
    }
  };
  return [storedList, setValue];
}
