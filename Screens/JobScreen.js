import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Avatar, Button, List, Divider, Chip } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import dayjs from 'dayjs';
import { colors } from '../styles/colors';
import OpenURLButton from '../Components/OpenURLButton';

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
        style={style}
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
        start={{ x: 0.35, y: 0.45 }}
        end={{ x: 0, y: 0 }}
      >
        <View style={styles.container}>
          <Text style={styles.organization}>{job.organization}</Text>
          <Text style={styles.title}>{job.title}</Text>
          <View style={styles.dateContainer}>
            <Text style={styles.h3}>Hakuaika päättyy</Text>
            <Avatar.Icon style={styles.h3} size={30} color="white" icon="calendar" />
            <Text style={styles.h3}>{dayjs(job.publicationEnds).format('l LT')}</Text>
          </View>
        </View>
        <Button
          style={styles.button}
          buttonColor="white"
          textColor={colors.detailGreen}
          icon="chevron-right"
        >
          Hae työpaikkaa
        </Button>
        <View style={styles.buttons}>
          <Button buttonColor="transparent" textColor="white" icon="heart-outline"></Button>
          <Button buttonColor="transparent" textColor="white" icon="share-variant"></Button>
        </View>
      </LinearGradient>
      <View style={styles.content}>
        <Text style={styles.desc}>{job.jobDesc}</Text>
        <Text style={styles.readMore}>Lisätietoja</Text>
        <OpenURLButton url={job.internetLink} style={styles.link} />
        <Button
          buttonColor={colors.detail}
          textColor="white"
          icon="chevron-right"
          style={styles.buttonOrganization}
          onPress={() => navigation.navigate('Organization', { org: job.profitCenter })}
        >
          Tutustu työnantajaan
        </Button>
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
          <Avatar.Icon style={styles.h3} size={50} color={colors.detail} icon="email-outline" />
          <Text style={styles.desc}>Yhteystietomme</Text>
        </View>
        <Text style={styles.desc}>{job.contacts}</Text>
        <Divider />
        <View style={styles.descContainer}>
          <Avatar.Icon style={styles.h3} size={50} color={colors.detail} icon="briefcase-variant" />
          <Text style={styles.desc}>Lisätietoja</Text>
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
    marginHorizontal: '20%',
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
  },
  desc: {
    fontSize: 20,
    fontWeight: '400',
    marginVertical: 10,
  },
  descContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: -15,
  },
  detailIcon: {
    paddingHorizontal: 15,
  },
  detailText: {
    fontSize: 20,
    fontWeight: '400',
  },
  h3: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 16,
  },
  jobDetail: {
    marginHorizontal: 50,
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
  tagEmployment: {
    backgroundColor: '#fad6d4',
    margin: '2%',
  },
  tagEmploymentCategory: {
    backgroundColor: '#faeee3',
    margin: '2%',
  },
  tagEmploymentType: {
    backgroundColor: '#f1f5f8',
    margin: '2%',
  },
  tagLocation: {
    backgroundColor: '#d4effa',
    margin: '2%',
  },
  tagProfession: {
    backgroundColor: '#d0f5dc',
    margin: '2%',
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
