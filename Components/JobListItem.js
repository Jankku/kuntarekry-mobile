import { Card, IconButton } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';
import dayjs from 'dayjs';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../styles/colors';

export default function JobListItem({ job }) {
  const navigation = useNavigation();

  return (
    <>
      <Card style={styles.border} onPress={() => navigation.navigate('Job', { job: job })}>
        <Card.Content>
          <View style={styles.container}>
            <IconButton
              style={styles.button}
              iconColor={colors.detailGreen}
              icon="heart-outline"
            ></IconButton>
            <View>
              <Text style={styles.itemText}>{job.organization}</Text>
              <Text style={styles.itemHeaderText}>{job.title}</Text>
              <Text style={styles.itemText}>
                Hakuaika päättyy{' '}
                <Text style={styles.dateText}>{dayjs(job.publicationEnds).format('l LT')}</Text>
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
    backgroundColor: 'white',
    borderColor: 'lightgrey',
    borderStyle: 'solid',
    borderWidth: 1,
    marginVertical: 1,
  },
  button: {
    alignSelf: 'center',
    backgroundColor: '#f8fafc',
    marginLeft: 0,
    marginRight: 20,
  },
  container: {
    flexDirection: 'row',
    paddingVertical: 8,
    width: '80%',
  },
  dateText: {
    color: colors.detail,
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
    color: '#8795a1',
    fontSize: 14,
    paddingVertical: 2,
  },
});
