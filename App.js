import { View, Text, StyleSheet, Button } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello World! 👋</Text>
      <Button style={styles.button} title="Press Me" onPress={() => alert('Button pressed!')} />
    </View>
  );
}

var styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20, fontWeight: 'bold', color:'red' },
  button: { marginTop: 20, borderRadius: 9, backgroundColor:'red' }
});