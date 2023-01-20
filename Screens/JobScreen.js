import { StyleSheet, Text, View } from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import { Divider } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
export default function JobScreen({ route }) {
  const job = route.params?.job ?? '';
  console.log(job);
  const formattedEndDate = new Date(job.publicationEnds).toLocaleDateString();
  return (
    <>
      <LinearGradient
        style={styles.backgroundTop}
        colors={['#33cc80', '#0a8bc2']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.6, y: 0.5 }}
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
        <Divider></Divider>
      </View>
    </>
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
    textAlign: 'left',
  },
  h3: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 16,
  },
  organization: {
    color: 'white',
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
