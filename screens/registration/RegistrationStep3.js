import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Alert
} from 'react-native';
import RegistrationProgress from '../../components/RegistrationProgress';

export default function RegistrationStep3({ navigation, route }) {
  const { name, email, zipCode, phone } = route.params;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = () => {
    if (!password || !confirmPassword) {
      Alert.alert('Missing fields', 'Please enter all fields.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Password Error', 'Passwords must match.');
      return;
    }

    // call backend ? ->With this I think: console.log('User Registered:', { name, email, zipCode, phone, password });
    

    Alert.alert('Welcome to ConnectOrlando!', 'Reserve your tablet today');
    navigation.navigate('Home'); 
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

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#fff' 

  },
  title: { fontSize: 24, fontWeight: '600', color: '#3D2A75', //purple
    marginBottom: 6, textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#666', //gray
     marginBottom: 30, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', //light gray
     padding: 12, borderRadius: 8, marginBottom: 16 },button: { backgroundColor: '#3D2A75', //purple
    padding: 16, borderRadius: 8, marginTop: 12 },
  buttonText: { color: '#fff', //white
    textAlign: 'center', fontWeight: '600' }, backText: { marginTop: 16, textAlign: 'center', color: '#3D2A75' //purple

  },
});
