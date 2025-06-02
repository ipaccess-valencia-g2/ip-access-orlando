import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import RegistrationProgress from '../../components/RegistrationProgress';

export default function RegistrationStep1({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState(null);
  const [showPicker, setShowPicker] = useState(false);

  const handleNext = () => {
    if (!firstName || !lastName || !email || !dob) {
      alert('Please fill in all fields');
      return;
    }

    navigation.navigate('Registration Step 2', {
      firstName,
      lastName,
      email,
      dob: `${dob.getMonth() + 1}/${dob.getDate()}/${dob.getFullYear()}`

    });
  };

  const handleDateChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) setDob(selectedDate);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <RegistrationProgress currentStep={1} />

          <Text style={styles.title}>Step 1</Text>
          <Text style={styles.subtitle}>Enter your name, date of birth, and email</Text>

          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
          />

          <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.input}>
            <Text style={{ color: dob ? '#000' : '#999' }}>
              {dob ? `${dob.getMonth() + 1}/${dob.getDate()}/${dob.getFullYear()}` : 'Select Date of Birth'}

            </Text>
          </TouchableOpacity>

          {showPicker && (
            <DateTimePicker
              mode="date"
              display="default"
              value={dob || new Date(2000, 0, 1)}
              onChange={handleDateChange}
              maximumDate={new Date()}
            />
          )}

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
            <Text style={styles.linkText}>Already have an account? Login here</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: '600', color: '#3D2A75', marginBottom: 6, textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 30, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16
  },
  button: {
    backgroundColor: '#3D2A75',
    padding: 16,
    borderRadius: 8,
    marginTop: 12
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600'
  },
  linkText: {
    color: '#DBB86F',
    textAlign: 'center',
    fontWeight: '500',
    marginTop: 16
  }
});
