import { StyleSheet, FlatList, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Title, Button } from 'react-native-paper';
import useFavoriteList from '../hooks/usefavoritelist';
import JobListItem from '../Components/JobListItem';
export default function FavoritesScreen() {
  return (
    <>
      <View>
        <Button>Työpaikat</Button>
        <Button></Button>
      </View>
      <ScrollView>
        <Title>FavoritesScreen</Title>
        <FlatList
          data={useFavoriteList([])}
          ListEmptyComponent={<Text>Ei työpaikkailmoituksia</Text>}
          renderItem={({ item }) => <JobListItem job={item.jobAdvertisement} />}
          keyExtractor={(_, index) => index}
        />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({});
