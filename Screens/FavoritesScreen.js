import { StyleSheet, FlatList, Text, View } from 'react-native';
import { Title, FAB, Divider, Badge } from 'react-native-paper';
import { clearStoredList, useFavoriteList } from '../hooks/usefavoritelist';
import { colors } from '../styles/colors';
import JobListItem from '../Components/joblist/JobListItem';
import OrganizationListItem from '../Components/OrganizationListItem';
import { useTranslation } from 'react-i18next';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useState } from 'react';

export default function FavoritesScreen() {
  const { t } = useTranslation();
  const { favorites, updateFavorites } = useFavoriteList();
  const [activeTab, setActiveTab] = useState('job');
  const clearFavorites = async (type) => {
    await clearStoredList(type);
    updateFavorites();
  };
  const Tab = createMaterialTopTabNavigator();

  function JobsList() {
    return (
      <FlatList
        style={styles.list}
        data={favorites.jobs}
        ItemSeparatorComponent={<Divider />}
        ListEmptyComponent={<Text style={styles.text}>{t('favorites.listEmpty')}</Text>}
        renderItem={({ item }) => <JobListItem job={item} />}
        keyExtractor={(_, index) => index}
        contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 16 }}
      />
    );
  }

  function EmployersList() {
    return (
      <FlatList
        style={styles.list}
        data={favorites.employers}
        ItemSeparatorComponent={<Divider />}
        ListEmptyComponent={<Text style={styles.text}>{t('favorites.listEmpty')}</Text>}
        renderItem={({ item }) => <OrganizationListItem organization={item} />}
        keyExtractor={(_, index) => index}
        contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 16 }}
      />
    );
  }

  const renderTabLabel = (label, count) => (
    <View style={{ flexDirection: 'row' }}>
      <Text variant="titleMedium" style={{ marginHorizontal: 5 }}>
        {label.toUpperCase()}
      </Text>
      <Badge size={18} style={styles.badge} visible={count > 0}>
        {count}
      </Badge>
    </View>
  );

  return (
    <>
      <Title style={styles.title}>{t('favorites.title')}</Title>
      <Tab.Navigator
        screenOptions={{
          tabBarIndicatorStyle: {
            backgroundColor: colors.detailGreen,
          },
          tabBarStyle: {
            backgroundColor: 'white',
          },
        }}
      >
        <Tab.Screen
          name="FavoriteJobs"
          options={{
            tabBarLabel: () => renderTabLabel(t('home.header.jobs'), favorites.jobs.length),
          }}
          component={JobsList}
          listeners={() => ({
            tabPress: () => {
              setActiveTab('job');
            },
            swipeEnd: () => {
              setActiveTab('job');
            },
          })}
        />
        <Tab.Screen
          name="FavoriteEmployers"
          options={{
            tabBarLabel: () =>
              renderTabLabel(t('home.header.chips.employers'), favorites.employers.length),
          }}
          component={EmployersList}
          listeners={() => ({
            tabPress: () => {
              setActiveTab('employer');
            },
            swipeEnd: () => {
              setActiveTab('employer');
            },
          })}
        />
      </Tab.Navigator>
      <FAB
        visible={favorites[`${activeTab}s`].length === 0 ? false : true}
        style={styles.button}
        onPress={() => {
          clearFavorites(activeTab);
        }}
        label={t('favorites.clear.' + `${activeTab}s`)}
        color="white"
        mode="flat"
        size="small"
      />
    </>
  );
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: colors.detailGreen,
  },
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
    margin: 16,
  },
  title: {
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: '400',
    marginVertical: 16,
  },
});
