import React, { useState, useEffect } from 'react';
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
  const [timeLeft, setTimeLeft] = useState('');

  // countdown set for 2 hours. 
  useEffect(() => {
    const returnTime = new Date();
    returnTime.setHours(returnTime.getHours() + 2);

    const interval = setInterval(() => {
      const now = new Date();
      const diff = returnTime - now;

      if (diff <= 0) {
        setTimeLeft('Return time has expired.');
        clearInterval(interval);
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setTimeLeft(`${hours}h ${minutes}m ${seconds}s remaining`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleReturn = () => {
    if (!deviceId) {
      Alert.alert('Missing Info', 'Please enter a device ID.');
      return;
    }

    Alert.alert('Success', `Tablet ${deviceId} has been marked as returned.`);
    // Future Add database call or update status
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
<Text style={styles.countdown}>{timeLeft}</Text>
    

     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#F3F2EF', // Neutral Linen
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#003153', // Midnight Navy
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    fontWeight: '600',
    color: '#0B3D20', // Evergreen (optional for labels)
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#003153', // Midnight Navy
    padding: 16,
    borderRadius: 8,
    marginTop: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  link: {
    marginTop: 20,
    color: '#003153', // Midnight Navy
    textAlign: 'center',
  },
  placeholderBox: {
    marginTop: 32,
    padding: 16,
    backgroundColor: '#D6E6F2', // Ice Blue
    borderRadius: 8,
  },
  placeholderTitle: {
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 6,
    color: '#003153',
  },
  placeholderText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  countdown: {
    marginTop: 16,
    padding: 10,
    backgroundColor: '#D6E6F2', // Ice Blue
    borderRadius: 6,
    textAlign: 'center',
    color: '#003153',
    fontWeight: '600',
    fontSize: 14,
  },
});
