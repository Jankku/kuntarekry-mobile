import { Card, Button } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';
import dayjs from 'dayjs';
import { useNavigation } from '@react-navigation/native';

export default function JobListItem({ job }) {
  const navigation = useNavigation();

  return (
    <>
      <Card style={styles.border} onPress={() => navigation.navigate('Job', { job: job })}>
        <Card.Content>
          <View style={styles.container}>
            <Button style={styles.button} icon="heart-outline"></Button>
            <View>
              <Text style={styles.itemHeaderText}>{job.title}</Text>
              <Text style={styles.itemText}>{job.organization}</Text>
              <Text style={styles.itemText}>
                Hakuaika päättyy {dayjs(job.publicationEnds).format('l LT')}
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </>
  );
}

const styles = StyleSheet.create({
  border: {
    borderColor: 'lightgrey',
    borderStyle: 'solid',
    borderWidth: 1,
  },
  button: {
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'row',
    paddingVertical: 8,
    width: '80%',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  itemHeaderText: {
    fontSize: 16,
    fontWeight: '500',
  },
  itemText: {
    fontSize: 14,
    paddingVertical: 2,
  },
});
