import { StyleSheet, FlatList, Text } from 'react-native';
import { Title, Button } from 'react-native-paper';
import { clearStoredList, useFavoriteList } from '../hooks/usefavoritelist';
import JobListItem from '../Components/JobListItem';
import { colors } from '../styles/colors';

export default function FavoritesScreen() {
  const { favorites, updateFavorites } = useFavoriteList();

  const clearFavorites = async () => {
    await clearStoredList();
    updateFavorites();
  };

  return (
    <>
      <Title style={styles.title}>Suosikit</Title>
      <FlatList
        style={styles.list}
        data={favorites}
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
        onPress={clearFavorites}
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
