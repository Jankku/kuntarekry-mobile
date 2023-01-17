import { StyleSheet, Text, View } from 'react-native';
export default function Header() {
  return (
    <View style={styles.header}>
      <Text>menu</Text>
      <Text style={styles.headertext}>KuntaRekry</Text>
      <Text>lang</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    backgroundColor: '#056e9666',
    flexDirection: 'row',
    height: '10%',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  headertext: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
