import { StyleSheet, Text, View } from 'react-native';
export default function JobScreen({ route }) {
  const job = route.params?.job ?? '';
  return (
    <View style={styles.container}>
      <Text>JobScreen</Text>
      <Text>{job.title}</Text>
      <Text>{job.organization}</Text>
      <Text>{job.jobDesc}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    paddingTop: 16,
  },
});
