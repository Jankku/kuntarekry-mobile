import { StyleSheet, FlatList, Text } from 'react-native';
import { Title, Button } from 'react-native-paper';
import { useState, useEffect } from 'react';
import { getStoredList, clearStoredList } from '../hooks/usefavoritelist';
import JobListItem from '../Components/JobListItem';
import { colors } from '../styles/colors';

export default function FavoritesScreen() {
  const [favorite, setFavorite] = useState([]);

  useEffect(() => {
    (async () => {
      const storedList = await getStoredList();
      setFavorite(storedList);
    })();
  }, []);

  return (
    <>
      <Title style={styles.title}>Suosikit</Title>
      <FlatList
        style={styles.list}
        data={favorite}
        ListEmptyComponent={
          <Text style={styles.text}>
            Sinulla ei ole tallennettuja suosikkeja. Napauta sydäntä ilmoituksen vierestä
            tallentaaksesi ilmoituksen suosikkeihin.
          </Text>
        }
        renderItem={({ item }) => <JobListItem job={item} />}
        keyExtractor={(_, index) => index}
      />
      <Button
        style={styles.button}
        textColor={'white'}
        buttonColor={colors.detail}
        onPress={() => clearStoredList()}
      >
        Tyhjennä suosikit
      </Button>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    marginHorizontal: '25%',
    marginTop: 10,
  },
  list: {
    marginHorizontal: 8,
  },
  text: {
    fontSize: 16,
    marginHorizontal: 16,
  },
  title: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
});
