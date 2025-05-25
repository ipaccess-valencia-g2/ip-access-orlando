import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard
} from 'react-native';
import RegistrationProgress from '../../components/RegistrationProgress';

export default function RegistrationStep2({ navigation, route }) {
  const { name, email } = route.params;
  const [zipCode, setZipCode] = useState('');
  const [phone, setPhone] = useState('');

  const handleNext = () => {
    if (!zipCode || !phone) return alert('Please enter all fields');

    navigation.navigate('RegistrationStep3', {
      name,
      email,
      zipCode,
      phone,
    });
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
            <RegistrationProgress currentStep={2} />

          <Text style={styles.title}>Step 2</Text>
          <Text style={styles.subtitle}>Find a Neighbordhood Center Near You and Enter Your Zip Code</Text>

          <TextInput
            style={styles.input}
            placeholder="ZIP Code"
            value={zipCode}
            onChangeText={setZipCode}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />

          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Next</Text>
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
  title: { fontSize: 24, fontWeight: '600', color: '#3D2A75',//pirple
     marginBottom: 6, textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#666', //gray
    marginBottom: 30, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', //light gray
    padding: 12, borderRadius: 8, marginBottom: 16 },
  button: { backgroundColor: '#3D2A75', //purple
    padding: 16, borderRadius: 8, marginTop: 12 },
  buttonText: { color: '#fff', //white
    textAlign: 'center', fontWeight: '600'   },
  backText: { marginTop: 16, textAlign: 'center', color: '#3D2A75' //purple

  },
});
