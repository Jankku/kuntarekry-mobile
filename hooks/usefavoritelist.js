import AsyncStorage from '@react-native-async-storage/async-storage';
const KEY = 'favoritelist';

export async function getStoredList() {
  try {
    const item = await AsyncStorage.getItem(KEY);
    const list = item ? JSON.parse(item) : [];
    console.log(
      'Found list: ',
      list.map((job) => job.id)
    );
    return list;
  } catch (e) {
    console.log(e);
    return [];
  }
}
export async function updateStoredList(job) {
  const storedList = await getStoredList();
  const newList = await mergeLists(storedList, job);
  console.log(
    'Updated list',
    newList.map((job) => job.id)
  );
  await AsyncStorage.setItem(KEY, JSON.stringify(newList));
  return newList;
}

export async function clearStoredList() {
  await AsyncStorage.removeItem(KEY);
}

function mergeLists(storedList, job) {
  if (storedList.some((item) => item.id === job.id)) {
    const newList = storedList.filter((item) => item.id !== job.id);
    console.log(
      'Filtered job:',
      newList.map((job) => job.id)
    );
    return newList;
  } else {
    const newList = [...storedList, job];
    console.log(
      'Added job:',
      newList.map((job) => job.id)
    );
    return newList;
  }
}
