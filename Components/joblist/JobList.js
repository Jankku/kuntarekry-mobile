import { useState, useEffect } from 'react';
import { FlatList, StyleSheet, useWindowDimensions, View } from 'react-native';
import JobListItem from './JobListItem';
import { Button, Divider, Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import usePagination from '../../hooks/usepagination';
import ListEmpty from './ListEmpty';
import SwipeableRow from './SwipeableRow.js';
import Carousel from 'react-native-reanimated-carousel';
import { colors } from '../../styles/colors';
import JobCardItem from './JobCardItem';

export default function JobList({ data, sortType }) {
  const { t } = useTranslation('common');
  const [sortedData, setSortedData] = useState([]);
  const { currentItems, currentPage, pageCount, goBackward, goForward } = usePagination(sortedData);
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (sortType === null);

    const jobs = [...data];
    switch (sortType) {
      case 'newest':
        setSortedData(
          jobs.slice().sort((a, b) => {
            return b.jobAdvertisement.publicationStarts.localeCompare(
              a.jobAdvertisement.publicationStarts
            );
          })
        );
        break;
      case 'endTime':
        setSortedData(
          jobs.slice().sort((a, b) => {
            return a.jobAdvertisement.publicationEnds.localeCompare(
              b.jobAdvertisement.publicationEnds
            );
          })
        );
        break;
      case 'employer':
        setSortedData(
          jobs.slice().sort((a, b) => {
            return a.jobAdvertisement.profitCenter?.localeCompare(b.jobAdvertisement.profitCenter);
          })
        );
        break;
      case 'location':
        alert('Sijainti ei ole käytössä');
        break;
    }
  }, [data, sortType]);

  return (
    <>
      {data.length > 10 ? (
        <>
          <FlatList
            data={currentItems}
            ItemSeparatorComponent={<Divider />}
            ListEmptyComponent={<ListEmpty />}
            renderItem={({ item }) => (
              <SwipeableRow
                job={item.jobAdvertisement}
                publication={item.publication}
                link={item.link}
              >
                <JobListItem
                  job={item.jobAdvertisement}
                  publication={item.publication}
                  link={item.link}
                />
              </SwipeableRow>
            )}
            keyExtractor={(_, index) => index}
            contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 16 }}
          />
          <Divider />
          <View style={styles.footerContainer}>
            <Button compact mode="outlined" icon="arrow-left" onPress={goBackward}>
              {t('backward')}
            </Button>

            <Text variant="titleSmall">
              {t('page')} {currentPage} / {pageCount}
            </Text>

            <Button
              compact
              mode="outlined"
              icon="arrow-right"
              contentStyle={{ flexDirection: 'row-reverse' }}
              onPress={goForward}
            >
              {t('forward')}
            </Button>
          </View>
        </>
      ) : (
        <Carousel
          mode="vertical-stack"
          modeConfig={{
            snapDirection: 'left',
            moveSize: window.width,
            stackInterval: 16,
            scaleInterval: 0.02,
            rotateZDeg: 135,
          }}
          style={styles.carousel}
          width={width}
          data={currentItems}
          renderItem={({ item, index }) => (
            <JobCardItem
              key={index}
              job={item.jobAdvertisement}
              publication={item.publication}
              link={item.link}
            />
          )}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  carousel: {
    backgroundColor: colors.background,
    flex: 1,
  },
  footerContainer: {
    alignItems: 'baseline',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
});
