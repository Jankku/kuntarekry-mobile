import { StyleSheet, FlatList, Text } from 'react-native';
import { Title, FAB, Divider } from 'react-native-paper';
import { clearStoredList, useFavoriteList } from '../hooks/usefavoritelist';
import JobListItem from '../Components/joblist/JobListItem';
import { colors } from '../styles/colors';
import { useTranslation } from 'react-i18next';

export default function FavoritesScreen() {
  const { t } = useTranslation();
  const { favorites, updateFavorites } = useFavoriteList();

  const clearFavorites = async () => {
    await clearStoredList();
    updateFavorites();
  };

  return (
    <>
      <Title style={styles.title}>{t('favorites.title')}</Title>
      <FlatList
        style={styles.list}
        data={favorites}
        ItemSeparatorComponent={<Divider />}
        ListEmptyComponent={<Text style={styles.text}>{t('favorites.listEmpty')}</Text>}
        renderItem={({ item }) => <JobListItem job={item} />}
        keyExtractor={(_, index) => index}
        contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 16 }}
      />
      <FAB
        visible={favorites.length === 0 ? false : true}
        style={styles.button}
        onPress={clearFavorites}
        label={t('favorites.clear')}
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
