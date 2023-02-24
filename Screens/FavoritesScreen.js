// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Tab, Text, TabView } from '@rneui/themed';
import { useTranslation } from 'react-i18next';
import { clearStoredList, useFavoriteList } from '../hooks/usefavoritelist';
import { FlatList, StyleSheet } from 'react-native';
import { Divider, FAB } from 'react-native-paper';
import JobListItem from '../Components/joblist/JobListItem';
import OrganizationListItem from '../Components/OrganizationListItem';
import { colors } from '../styles/colors';

export default function FavoritesScreen() {
  const { t } = useTranslation();
  const { favorites, updateFavorites } = useFavoriteList();
  const [activeTab, setActiveTab] = useState(0);

  const clearFavorites = async (type) => {
    await clearStoredList(type);
    updateFavorites();
  };

  return (
    <>
      <Tab
        value={activeTab}
        onChange={(e) => setActiveTab(e)}
        indicatorStyle={{
          backgroundColor: 'white',
          height: 3,
        }}
        style={{ backgroundColor: colors.detailGreen }}
      >
        <Tab.Item title={t('home.header.jobs')} titleStyle={{ fontSize: 12, color: 'white' }} />
        <Tab.Item
          title={t('home.header.chips.employers')}
          titleStyle={{ fontSize: 12, color: 'white' }}
        />
      </Tab>
      <TabView value={activeTab} onChange={(e) => setActiveTab(e)} animationType="spring">
        <TabView.Item style={{ width: '100%' }}>
          <FlatList
            style={styles.list}
            data={favorites.jobs}
            ItemSeparatorComponent={<Divider />}
            ListEmptyComponent={<Text style={styles.text}>{t('favorites.listEmpty')}</Text>}
            renderItem={({ item }) => (
              <JobListItem job={item} publication={item.publication} link={item.link} />
            )}
            keyExtractor={(_, index) => index}
            contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 16 }}
          />
        </TabView.Item>
        <TabView.Item style={{ width: '100%' }}>
          <FlatList
            style={styles.list}
            data={favorites.employers}
            ItemSeparatorComponent={<Divider />}
            ListEmptyComponent={<Text style={styles.text}>{t('favorites.listEmpty')}</Text>}
            renderItem={({ item }) => <OrganizationListItem organization={item} />}
            keyExtractor={(_, index) => index}
            contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 16 }}
          />
        </TabView.Item>
      </TabView>
      <FAB
        visible={favorites[activeTab === 0 ? 'jobs' : 'employers'].length > 0}
        style={styles.button}
        onPress={() => {
          clearFavorites(activeTab === 0 ? 'job' : 'employer');
        }}
        label={activeTab === 0 ? t('favorites.clear.jobs') : t('favorites.clear.employers')}
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
