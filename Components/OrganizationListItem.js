import { Text } from 'react-native-paper';
import { Pressable, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../styles/colors';
import FavoriteButton from './FavoriteButton';
import { useTranslation } from 'react-i18next';
import { useJobAdvertisements } from '../hooks/usejobadvertisements';

export default function OrganizationListItem({ organization }) {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { jobs } = useJobAdvertisements();
  const jobCount = jobs.filter((job) => job.jobAdvertisement.profitCenter === organization).length;

  return (
    <Pressable
      android_ripple={{ borderless: false }}
      style={styles.container}
      onPress={() => navigation.navigate('Organization', { org: organization })}
    >
      <FavoriteButton
        employer={organization}
        size={24}
        buttonStyle={styles.button}
        buttonColor={colors.detailGreen}
      />
      <View style={{ alignSelf: 'center' }}>
        <Text variant="titleMedium">{organization}</Text>
        <Text variant="bodyMedium">
          {jobCount} {t('home.header.jobsAvailable')}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    marginLeft: 0,
    marginRight: 16,
  },
  container: {
    flexDirection: 'row',
    paddingVertical: 16,
  },
  organization: {
    flexWrap: 'wrap',
  },
});
