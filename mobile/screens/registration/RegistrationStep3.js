import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Alert
} from 'react-native';
import RegistrationProgress from '../../components/RegistrationProgress';

export default function RegistrationStep3({ navigation, route }) {
  const {
    firstName, lastName, dob, email,
    address, unit, city, state, zip, phone
  } = route.params;

  const [username, setUsername] = useState(email.split('@')[0]); // default suggestion
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async () => {
    if (!username || !password || !confirmPassword) {
      Alert.alert('Missing fields', 'Please complete all fields.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Password Error', 'Passwords must match.');
      return;
    }

    const fullAddress = unit ? `${address}, Apt ${unit}, ${city}, ${state} ${zip}` : `${address}, ${city}, ${state} ${zip}`;

    try {
      const response = await fetch('http://192.168.1.55:3307/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password,
          email,
          firstName,
          lastName,
          address: fullAddress,
          phone,
          dob
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Registration successful! Please log in.');
        navigation.navigate('Login');
      } else {
        Alert.alert('Registration Failed', data.error || 'Something went wrong.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert('Error', 'Unable to register. Please try again later.');
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <RegistrationProgress currentStep={3} />

          <Text style={styles.title}>Step 3</Text>
          <Text style={styles.subtitle}>Create a secure password</Text>

          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}





//styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#F3F2EF', // Neutral Linen
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#003153', // Midnight Navy
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#0B3D20', // Evergreen
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc', // Light gray
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#F3F2EF',
    color: '#0B3D20',
  },
  button: {
    backgroundColor: '#003153', // Midnight Navy
    padding: 16,
    borderRadius: 8,
    marginTop: 12,
  },
  buttonText: {
    color: '#fff', // White
    textAlign: 'center',
    fontWeight: '600',
  },
  backText: {
    marginTop: 16,
    textAlign: 'center',
    color: '#338669', // Rich Green
  },
});
