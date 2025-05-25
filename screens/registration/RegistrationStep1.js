import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard
} from 'react-native';
import RegistrationProgress from '../../components/RegistrationProgress';


export default function RegistrationStep1({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleNext = () => {
    if (!name || !email) return alert('Please fill in all fields');

    
    navigation.navigate('RegistrationStep2', { name, email });
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
            <RegistrationProgress currentStep={1} />

          <Text style={styles.title}>Step 1</Text>
          <Text style={styles.subtitle}>Please enter your full name and email address </Text>
          <Text stle={styles.subtitle}>Check details of what's needed later</Text>

          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Next</Text>

          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
  <Text style={styles.loginLink}>Already have an account? Login here</Text>
</TouchableOpacity>

        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#fff' //

  },
  title: { fontSize: 24, fontWeight: '600', //gray
    color: '#3D2A75',//purple
     marginBottom: 6, textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#666', //gray
    marginBottom: 30, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', //light gray 
    padding: 12, borderRadius: 8, marginBottom: 16 },
  button: { backgroundColor: '#3D2A75', //purple
     padding: 16, borderRadius: 8, marginTop: 12 },
  buttonText: { color: '#fff', //white
    textAlign: 'center', fontWeight: '600' //gray
  },
});
