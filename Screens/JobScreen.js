import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Avatar, Button, List, Divider } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
export default function JobScreen({ route }) {
  const job = route.params?.job ?? '';
  const formattedStartDate = new Date(job.publicationStarts).toLocaleDateString();
  const formattedEndDate = new Date(job.publicationEnds).toLocaleDateString();
  console.log(job);
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
            <Text style={styles.h3}>{formattedEndDate}</Text>
          </View>
        </View>
        <View style={styles.buttons}>
          <Button
            style={styles.button}
            buttonColor="white"
            textColor="#009978"
            icon="chevron-right"
          >
            Hae työpaikkaa
          </Button>
          <Button buttonColor="transparent" textColor="white" icon="heart-outline"></Button>
          <Button buttonColor="transparent" textColor="white" icon="share-variant"></Button>
        </View>
      </LinearGradient>
      <View>
        <Text style={styles.desc}>{job.jobDesc}</Text>
        <View style={styles.jobDetailList}>
          <Divider></Divider>
          <List.Item
            description={() => <Text style={styles.detailText}>{job.organization}</Text>}
            color="#35a9db"
            left={() => (
              <List.Icon style={styles.detailIcon} size={30} color="#35a9db" icon="sitemap" />
            )}
          />
          <Divider></Divider>
          <List.Item
            description={() => <Text style={styles.detailText}>Tunnisteet</Text>}
            color="#35a9db"
            left={() => (
              <List.Icon
                style={styles.detailIcon}
                size={30}
                color="#35a9db"
                icon="file-document-multiple"
              />
            )}
          />
          <Divider></Divider>
          <List.Item
            description={() => <Text style={styles.detailText}>{job.id}</Text>}
            color="#35a9db"
            left={() => (
              <List.Icon style={styles.detailIcon} size={30} color="#35a9db" icon="key" />
            )}
          />
          <Divider></Divider>
          <List.Item
            description={() => <Text style={styles.detailText}>Aloitusaika</Text>}
            color="#35a9db"
            left={() => (
              <List.Icon
                style={styles.detailIcon}
                size={30}
                color="#35a9db"
                icon="play-circle-outline"
              />
            )}
          />
          <Divider></Divider>
          <List.Item
            description={() => <Text style={styles.detailText}>{job.salary}</Text>}
            color="#35a9db"
            left={() => (
              <List.Icon style={styles.detailIcon} size={30} color="#35a9db" icon="currency-eur" />
            )}
          />
          <Divider></Divider>
          <List.Item
            description={() => (
              <Text style={styles.detailText}>
                {formattedStartDate} - {formattedEndDate}
              </Text>
            )}
            color="#35a9db"
            left={() => (
              <List.Icon style={styles.detailIcon} size={30} color="#35a9db" icon="calendar" />
            )}
          />
          <Divider></Divider>
          <List.Item
            description={() => <Text style={styles.detailText}>Lisätunnisteet</Text>}
            color="#35a9db"
            left={() => (
              <List.Icon
                style={styles.detailIcon}
                size={30}
                color="#35a9db"
                icon="tag-multiple-outline"
              />
            )}
          />
          <Divider></Divider>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  backgroundTop: {
    alignSelf: 'stretch',
  },
  button: {
    marginHorizontal: 30,
  },
  buttons: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 16,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 16,
  },
  dateContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  desc: {
    fontSize: 20,
    fontWeight: '400',
    marginHorizontal: 15,
    textAlign: 'left',
  },
  detailIcon: {
    paddingHorizontal: 15,
  },
  detailText: {
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'left',
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
  organization: {
    color: '#ffffffb3',
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'center',
  },
  title: {
    color: 'white',
    fontSize: 32,
    fontWeight: '400',
    textAlign: 'center',
  },
});
