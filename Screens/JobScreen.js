import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { List, Divider, Chip, IconButton } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import dayjs from 'dayjs';
import { colors } from '../styles/colors';
import OpenURLButton from '../Components/OpenURLButton';
import FavoriteButton from '../Components/FavoriteButton';
import PrimaryButton from '../Components/PrimaryButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function JobScreen({ route, navigation }) {
  const job = route.params?.job ?? '';
  function Tags({ style, tag, filter }) {
    if (tag == null) {
      return;
    }
    const tags = tag.split(/\s*,\s*/);
    const filteredTags = tags.filter((tag) => tag.length > 0);

    return filteredTags.map((tagInfo) => (
      <Chip
        key={tagInfo}
        style={[style, styles.tag]}
        textStyle={styles.tagText}
        onPress={() => navigation.navigate('Jobs', { buttonJobQuery: tagInfo, filter: filter })}
      >
        {tagInfo}
      </Chip>
    ));
  }

  return (
    <ScrollView>
      <LinearGradient
        style={styles.backgroundTop}
        colors={['#0a8bc2', '#33cc80']}
        start={{ x: 0.7, y: 0.65 }}
        end={{ x: 0, y: 0 }}
      >
        <View style={styles.container}>
          <Text style={styles.organization}>{job.organization}</Text>
          <Text style={styles.title}>{job.title}</Text>
          <View style={styles.dateContainer}>
            <Text style={styles.h3}>
              Hakuaika päättyy{'  '}
              <Icon name="calendar" size={16} /> {dayjs(job.publicationEnds).format('l')}{' '}
              <Icon name="clock" size={16} /> {dayjs(job.publicationEnds).format('LT')}
            </Text>
          </View>
          <PrimaryButton style={styles.button} buttonColor="white" textColor={colors.detailGreen}>
            Hae työpaikkaa
          </PrimaryButton>
        </View>
        <View style={styles.buttons}>
          <FavoriteButton
            job={job}
            size={24}
            buttonStyle={styles.iconButton}
            buttonColor={'white'}
          />
          <IconButton style={styles.iconButton} size={24} iconColor="white" icon="share-variant" />
        </View>
      </LinearGradient>
      <View style={styles.content}>
        <Text style={styles.desc}>{job.jobDesc}</Text>
        <Text style={styles.readMore}>Lisätietoja</Text>
        <OpenURLButton url={job.internetLink} style={styles.link} />
        <View style={styles.buttonOrganization}>
          <PrimaryButton
            buttonColor={colors.detail}
            textColor="white"
            onPress={() => navigation.navigate('Organization', { org: job.profitCenter })}
          >
            Tutustu työnantajaan
          </PrimaryButton>
        </View>
      </View>
      <View style={styles.jobDetailList}>
        {job.anonymous == 1 && (
          <>
            <Divider />
            <List.Item
              title={() => (
                <View style={styles.tagRow}>
                  <Chip style={styles.tagProfession} textStyle={styles.tagText}>
                    Anonyymi Rekrytointi
                  </Chip>
                </View>
              )}
              color={colors.detail}
              left={() => (
                <List.Icon
                  style={styles.detailIcon}
                  size={30}
                  color={colors.detail}
                  icon="account"
                />
              )}
            />
          </>
        )}
        <Divider />
        <List.Item
          title={() => <Text style={styles.detailText}>{job.organization}</Text>}
          color={colors.detail}
          left={() => (
            <List.Icon style={styles.detailIcon} size={30} color={colors.detail} icon="sitemap" />
          )}
        />
        <Divider />
        <List.Item
          title={() => (
            <View style={styles.tagRow}>
              <Tags style={styles.tagEmployment} tag={job.employment} filter={'employment'} />
              <Tags
                style={styles.tagEmploymentType}
                tag={job.employmentType}
                filter={'employmentType'}
              />
              <Tags
                style={styles.tagEmploymentCategory}
                tag={job.employmentCategory}
                filter={'employmentCategory'}
              />
            </View>
          )}
          color={colors.detail}
          left={() => (
            <List.Icon
              style={styles.detailIcon}
              size={30}
              color={colors.detail}
              icon="file-document-multiple"
            />
          )}
        />
        <Divider />
        <List.Item
          title={() => <Text style={styles.detailText}>{job.id}</Text>}
          color={colors.detail}
          left={() => (
            <List.Icon style={styles.detailIcon} size={30} color={colors.detail} icon="key" />
          )}
        />
        <Divider />
        <List.Item
          title={() => (
            <Text style={styles.detailText}>
              {job.jobDuration ? job.jobDuration : 'Ei ilmoitettu'}
            </Text>
          )}
          color={colors.detail}
          left={() => (
            <List.Icon
              style={styles.detailIcon}
              size={30}
              color={colors.detail}
              icon="play-circle-outline"
            />
          )}
        />
        <Divider />
        <List.Item
          title={() => (
            <Text style={styles.detailText}>{job.salary ? job.salary : 'Ei ilmoitettu'} </Text>
          )}
          color={colors.detail}
          left={() => (
            <List.Icon
              style={styles.detailIcon}
              size={30}
              color={colors.detail}
              icon="currency-eur"
            />
          )}
        />
        <Divider />
        <List.Item
          title={() => (
            <Text style={styles.detailText}>
              {dayjs(job.publicationStarts).format('l')} -{' '}
              {dayjs(job.publicationEnds).format('l LT')}
            </Text>
          )}
          color={colors.detail}
          left={() => (
            <List.Icon style={styles.detailIcon} size={30} color={colors.detail} icon="calendar" />
          )}
        />
        <Divider />
        <List.Item
          title={() => (
            <View style={styles.tagRow}>
              <Tags style={styles.tagProfession} tag={job.taskArea} filter={'taskArea'} />
              <Tags style={styles.tagLocation} tag={job.location} filter={'location'} />
              <Tags style={styles.tagLocation} tag={job.region} filter={'region'} />
            </View>
          )}
          color={colors.detail}
          left={() => (
            <List.Icon
              style={styles.detailIcon}
              size={30}
              color={colors.detail}
              icon="tag-multiple-outline"
            />
          )}
        />
        <Divider />
      </View>
      <View style={styles.content}>
        <View style={styles.descContainer}>
          <Icon name="email" size={22} color={colors.detail} />
          <Text style={styles.desc}>{'    '}Yhteystietomme</Text>
        </View>
        <Text style={styles.desc}>{job.contacts}</Text>
        <Divider />
        <View style={styles.descContainer}>
          <Icon name="briefcase-variant" size={22} color={colors.detail} />
          <Text style={styles.desc}>{'    '}Lisätietoja</Text>
        </View>
        <Text style={styles.desc}>
          {job.organization}
          {'\n\n'}
          {job.organizationDesc}
        </Text>
        {job.address ? (
          <Text style={styles.address}>
            Osoite: {job.address}, {job.postalCode} {job.postalArea}
          </Text>
        ) : job.postalCode ? (
          <Text style={styles.address}>
            Osoite: {job.postalCode} {job.postalArea}
          </Text>
        ) : (
          <></>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  address: {
    color: colors.detail,
  },
  backgroundTop: {
    alignSelf: 'stretch',
  },
  button: {
    marginHorizontal: '25%',
  },
  buttonOrganization: {
    marginHorizontal: '12%',
    marginTop: 15,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: '2%',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 16,
  },
  content: {
    marginBottom: 25,
    marginHorizontal: 15,
    textAlign: 'left',
  },
  dateContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 8,
  },
  desc: {
    fontSize: 20,
    fontWeight: '400',
    marginVertical: 10,
  },
  descContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  detailIcon: {
    paddingHorizontal: 15,
  },
  detailText: {
    fontSize: 20,
    fontWeight: '400',
  },
  h3: {
    color: 'white',
    fontSize: 16,
  },
  iconButton: {
    marginHorizontal: 15,
  },
  jobDetailList: {
    backgroundColor: 'white',
  },
  link: {
    color: '#0590c7',
    fontSize: 20,
  },
  organization: {
    color: '#ffffffb3',
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'center',
  },
  readMore: {
    fontSize: 24,
    fontWeight: '400',
  },
  tag: {
    margin: '2%',
  },
  tagEmployment: {
    backgroundColor: '#fad6d4',
  },
  tagEmploymentCategory: {
    backgroundColor: '#faeee3',
  },
  tagEmploymentType: {
    backgroundColor: '#f1f5f8',
  },
  tagLocation: {
    backgroundColor: '#d4effa',
  },
  tagProfession: {
    backgroundColor: '#d0f5dc',
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagText: {
    color: '#606f7b',
  },
  title: {
    color: 'white',
    fontSize: 32,
    fontWeight: '400',
    textAlign: 'center',
  },
});
