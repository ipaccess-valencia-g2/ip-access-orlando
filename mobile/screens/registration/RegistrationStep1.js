// screens/RegistrationStep1.js


import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import RegistrationProgress from '../../components/RegistrationProgress';

export default function RegistrationStep1({ navigation }) {
  // Step 1 fields // 
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState(new Date());
  const [email, setEmail] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  // validate inputs and pass to next registration step 
  const handleNext = () => {
    if (!firstName || !lastName || !dob || !email) {
      alert('Please fill in all required fields.');
      return;
    }

    navigation.navigate('Registration Step 2', {
      firstName,
      lastName,
      dob: dob.toISOString().split('T')[0], // Format as YYYY-MM-DD
      email,
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <RegistrationProgress currentStep={1} />

          <Text style={styles.title}>Create Your Account</Text>
          <Text style={styles.subtitle}>Let’s start with your basic information.</Text>

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

       <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateField}>
  <Text style={styles.dateLabel}>Date of Birth</Text>
  <Text style={styles.dateValue}>{dob.toDateString()}</Text>
</TouchableOpacity>


          {showDatePicker && (
  <DateTimePicker
    value={dob}
    mode="date"
    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
    onChange={(event, selectedDate) => {
      setShowDatePicker(false); // dismiss immediately
      if (event.type === 'set' && selectedDate) {
        setDob(selectedDate);
      }
    }}
    maximumDate={new Date()}
  />
)}


          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>

          <Text style={styles.linkText} onPress={() => navigation.navigate('Login')}>
            Already have an account? Log in
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}



// =====================  
// styles ===================== 
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
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#F3F2EF', 
    color: '#0B3D20', // Evergreen text
  },
  button: {
    backgroundColor: '#003153', // Midnight Navy
    padding: 16,
    borderRadius: 8,
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  linkText: {
    color: '#338669', // Rich Green
    textAlign: 'center',
    fontWeight: '500',
    marginTop: 16,
  },
});
