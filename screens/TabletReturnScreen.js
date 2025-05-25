import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

export default function TabletReturnScreen({ navigation }) {
  const [deviceId, setDeviceId] = useState('');
  const [userName, setUserName] = useState('');

  const handleReturn = () => {
    if (!deviceId) {
      Alert.alert('Missing Info', 'Please enter a device ID.');
      return;
    }

    Alert.alert('Success', `Tablet ${deviceId} has been marked as returned.`);

    // Future: Add database call or update status
    // navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Return a Tablet</Text>

      <Text style={styles.label}>Device ID or Barcode:</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. TP-1029"
        value={deviceId}
        onChangeText={setDeviceId}
      />

      <Text style={styles.label}>User Name (optional):</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Kenna Garcia"
        value={userName}
        onChangeText={setUserName}
      />

      <TouchableOpacity style={styles.button} onPress={handleReturn}>
        <Text style={styles.buttonText}>Confirm Return</Text>
      </TouchableOpacity>

      <View style={styles.placeholderBox}>
  <Text style={styles.placeholderTitle}>Coming Soon:</Text>


  <Text style={styles.placeholderText}>• Scan QR code or sticker on device</Text>
  
  <Text style={styles.placeholderText}>• Show countdown to expected return time</Text>
</View>


      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.link}>← Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24, color: '#3D2A75', textAlign: 'center' },
  label: { fontSize: 16, marginBottom: 6, fontWeight: '600' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#3D2A75',
    padding: 16,
    borderRadius: 8,
    marginTop: 12,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  link: {
    marginTop: 20,
    color: '#3D2A75',
    textAlign: 'center',
  },

  placeholderBox: {
  marginTop: 32,
  padding: 16,
  backgroundColor: '#F3F2F5',
  borderRadius: 8,
},
placeholderTitle: {
  fontWeight: '700',
  fontSize: 16,
  marginBottom: 6,
  color: '#3D2A75',
},
placeholderText: {
  fontSize: 14,
  color: '#555',
  marginBottom: 4,
},

});
