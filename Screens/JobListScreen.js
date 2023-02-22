import { useMemo, useState } from 'react';
import { Text, Chip, useTheme, IconButton, Button, Divider } from 'react-native-paper';
import JobList from '../Components/joblist/JobList';
import useFilterJobs from '../hooks/usefilterjobs';
import { useJobAdvertisements } from '../hooks/usejobadvertisements';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { colors } from '../styles/colors';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const filterType = [
  { label: 'Työsuhde', value: 'employment' },
  { label: 'Työnantaja', value: 'profitCenter' },
  { label: 'Sijainti', value: 'region' },
  { label: 'Tehtäväalueet', value: 'taskArea' },
];

const sortType = [
  { label: 'Uusin ensin', value: 'newest' },
  { label: 'Hakuaika päättyy', value: 'endTime' },
  { label: 'Työnantaja', value: 'employer' },
  { label: 'Sijainti', value: 'location' },
];

export default function JobsListScreen({ route }) {
  const theme = useTheme();
  const { t } = useTranslation();
  const searchQuery = route.params?.searchQuery ?? '';
  const buttonJobQuery = route.params?.buttonJobQuery ?? '';
  const buttonJobQuery2 = route.params?.buttonJobQuery2 ?? '';
  const filter = route.params?.filter ?? '';
  const filter2 = route.params?.filter2 ?? '';
  const { jobs } = useJobAdvertisements();
  const filteredJobs = useFilterJobs(jobs, searchQuery);
  const [userFilters, setUserFilters] = useState([]);
  const [newFilterKey, setNewFilterKey] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [newFilterValue, setNewFilterValue] = useState('');
  const [newFilterOptions, setNewFilterOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(true);

  const [showSortSelector, setShowSortSelector] = useState(false);
  const [activeSortType, setActiveSortType] = useState('newest');

  const addFilter = (newFilter) => {
    setUserFilters([...userFilters, newFilter]);
  };

  useMemo(() => {
    if (filter) {
      const filters = [{ key: filter, value: buttonJobQuery.toLowerCase() }];
      if (filter2 && buttonJobQuery2) {
        filters.push({ key: filter2, value: buttonJobQuery2.toLowerCase() });
      }
      setUserFilters(filters);
    }
  }, [filter, buttonJobQuery, filter2, buttonJobQuery2]);

  useMemo(() => {
    if (newFilterKey) {
      const options = new Set();
      jobs.forEach((j) => {
        if (j.jobAdvertisement[newFilterKey]) {
          options.add(j.jobAdvertisement[newFilterKey].toLowerCase());
        }
      });
      const newOptions = new Set();
      options.forEach((o) => {
        if (o.includes(',')) {
          o.split(',').forEach((oo) => newOptions.add(oo.trim().toLowerCase()));
        } else {
          newOptions.add(o);
        }
      });
      const newOptions2 = [];
      newOptions.forEach((o) => {
        const newFilter = { key: newFilterKey, value: o };
        const newFilters = [...userFilters, newFilter];
        const filteredSearchJobs = filteredJobs.filter((j) =>
          newFilters.every(
            (f) =>
              j.jobAdvertisement[f.key] && j.jobAdvertisement[f.key].toLowerCase().includes(f.value)
          )
        );
        if (filteredSearchJobs.length > 0) {
          newOptions2.push(o);
        }
      });
      setNewFilterOptions([...newOptions2]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newFilterKey, jobs]);

  const filteredSearchJobs = useMemo(
    () =>
      filteredJobs.filter((j) =>
        userFilters.every(
          (f) =>
            j.jobAdvertisement[f.key] &&
            j.jobAdvertisement[f.key].toLowerCase().includes(f.value.toLowerCase())
        )
      ),
    [filteredJobs, userFilters]
  );

  const filterKeyInUse = (key) => userFilters.some((f) => f.key === key);

  const submitFilter = (o) => {
    if (newFilterKey && o) {
      addFilter({ key: newFilterKey, value: o });
    }
  };

  const deleteFilter = (index) => {
    setUserFilters(userFilters.filter((f, i) => i !== index));
  };

  return (
    <>
      <View style={styles.topContainer}>
        <Icon name="magnify" size={24} color={theme.colors.primary} />
        <View style={styles.titleContainer}>
          <Text variant="titleMedium" style={{ flexShrink: 1 }}>
            {searchQuery
              ? t('jobList.searchQueryFilterText', { searchQuery })
              : buttonJobQuery
              ? t('jobList.categoryFilterText', { category: buttonJobQuery })
              : t('jobList.allApplicationsText')}{' '}
            (
            <Text style={styles.userFilters}>
              {userFilters.length > 0 ? filteredSearchJobs.length : filteredJobs.length}
            </Text>
            )
          </Text>
          <IconButton
            icon="swap-vertical"
            mode="contained"
            size={24}
            containerColor={showSortSelector ? colors.detail : undefined}
            iconColor={showSortSelector ? 'white' : colors.detail}
            onPress={() => setShowSortSelector(!showSortSelector)}
          />
        </View>
        {showSortSelector && (
          <View style={styles.sortSelector}>
            {sortType.map((sortType) => (
              <TouchableOpacity
                key={sortType.value}
                onPress={() => {
                  setActiveSortType(sortType.value);
                  setShowSortSelector(false);
                }}
              >
                <Text
                  style={[
                    styles.sortItem,
                    sortType.value === activeSortType ? styles.activeSortItem : null,
                  ]}
                >
                  {sortType.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
      <View style={styles.containerFilters}>
        <ScrollView horizontal={true}>
          {userFilters.length > 0 &&
            userFilters.map((f, i) => (
              <Chip key={(f, i)} style={styles.redButton} onPress={() => deleteFilter(i)}>
                {`${f.value} X`}
              </Chip>
            ))}
        </ScrollView>
      </View>
      <View>
        <ScrollView horizontal={true} style={styles.containerOptions}>
          {filterType.map(
            (filter) =>
              !filterKeyInUse(filter.value) && (
                <Chip
                  key={filter.value}
                  style={styles.chipButton}
                  textStyle={styles.chipButtonText}
                  onPress={() => {
                    setShowOptions(true);
                    setNewFilterKey(filter.value);
                  }}
                >
                  {filter.label}
                </Chip>
              )
          )}
        </ScrollView>
      </View>
      <View style={styles.optionContainer}>
        <ScrollView>
          {showOptions &&
            newFilterOptions.length > 0 &&
            newFilterOptions.map((o) => (
              <Button
                buttonColor="white"
                textColor="black"
                key={o}
                uppercase
                onPress={() => {
                  setNewFilterValue(o);
                  setShowOptions(false);
                  submitFilter(o);
                }}
              >
                {`${o}`}
              </Button>
            ))}
        </ScrollView>
        <Divider />
      </View>
      <Divider />
      <JobList
        data={userFilters.length > 0 ? filteredSearchJobs : filteredJobs}
        sortType={activeSortType}
      />
    </>
  );
}
const styles = StyleSheet.create({
  activeSortItem: {
    backgroundColor: colors.detail,
    color: 'white',
  },
  chipButton: {
    backgroundColor: colors.detailGreen,
    marginHorizontal: 5,
  },
  chipButtonText: { color: 'white' },
  containerFilters: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 15,
  },
  containerOptions: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  number: {
    color: colors.detail,
  },
  optionContainer: {
    height: 'auto',
    maxHeight: 250,
  },
  redButton: {
    backgroundColor: '#e3342f',
    marginHorizontal: 5,
  },
  sortItem: {
    fontSize: 16,
    paddingHorizontal: 5,
    paddingVertical: 8,
  },
  sortSelector: {
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 5,
    padding: 5,
    position: 'absolute',
    right: 5,
    top: 45,
    width: 145,
    zIndex: 100,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 16,
  },
  topContainer: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  userFilters: { color: colors.detail, flexGrow: 1 },
});
