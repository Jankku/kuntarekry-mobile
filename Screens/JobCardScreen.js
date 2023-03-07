import { StyleSheet, useWindowDimensions } from 'react-native';
import { FAB, Text } from 'react-native-paper';
import Carousel from 'react-native-reanimated-carousel';
import { useJobAdvertisements } from '../hooks/usejobadvertisements';
import useFilterJobs from '../hooks/usefilterjobs';
import JobCardItem from '../Components/joblist/JobCardItem';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

export default function JobCardScreen({ navigation, route }) {
  const searchQuery = route.params?.searchQuery ?? '';
  const { t } = useTranslation();
  const { jobs } = useJobAdvertisements();
  const filteredJobs = useFilterJobs(jobs, searchQuery);
  const dimensions = useWindowDimensions();
  const PAGE_WIDTH = dimensions.width;
  const PAGE_HEIGHT = dimensions.height;

  const onViewListPress = () => navigation.replace('Jobs', { searchQuery });

  return (
    <>
      {filteredJobs.length > 0 ? (
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Carousel
            windowSize={5}
            width={PAGE_WIDTH}
            height={PAGE_HEIGHT}
            data={filteredJobs}
            mode="parallax"
            modeConfig={{ parallaxAdjacentItemScale: 0.5, parallaxScrollingScale: 0.95 }}
            renderItem={({ index, item, animationValue }) => (
              <JobCardItem key={index} jobItem={item} animationValue={animationValue} />
            )}
          />
        </View>
      ) : (
        <Text variant="titleLarge" style={styles.noResults}>
          {t('noResults', { ns: 'common' })}
        </Text>
      )}

      <FAB icon="view-list" color="white" onPress={onViewListPress} style={styles.fab} />
    </>
  );
}

const styles = StyleSheet.create({
  fab: {
    bottom: 0,
    margin: 16,
    position: 'absolute',
    right: 0,
  },
  noResults: { paddingTop: 32, textAlign: 'center' },
});
