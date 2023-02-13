import { StyleSheet, FlatList, Text } from 'react-native';
import { Title, FAB } from 'react-native-paper';
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
      <FAB
        visible={favorites.length === 0 ? false : true}
        style={styles.button}
        onPress={clearFavorites}
        label="Tyhjennä suosikit"
        color="white"
        mode="flat"
        size="small"
      />
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    backgroundColor: colors.detailGreen,
    bottom: 10,
    position: 'absolute',
  },
  list: {
    marginHorizontal: 3,
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
