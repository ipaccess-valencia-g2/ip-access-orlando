import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import RegistrationProgress from '../../components/RegistrationProgress';

export default function RegistrationStep2({ navigation, route }) {
  const { firstName, lastName, dob, email } = route.params;

  //address and contact information 
  const [address, setAddress] = useState('');
  const [unit, setUnit] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [phone, setPhone] = useState('');


//validate and navigate to step 3

  const handleNext = () => {
    if (!address || !city || !state || !zip || !phone) {
      alert('Please fill in all required fields.');
      return;
    }

    navigation.navigate('Registration Step 3', {
      firstName,
      lastName,
      dob,
      email,
      address,
      unit, //optional
      city,
      state,
      zip,
      phone,
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <RegistrationProgress currentStep={2} />

          <Text style={styles.title}>Step 2</Text>
          <Text style={styles.subtitle}>Tell us about where you live</Text>

          <TextInput
            style={styles.input}
            placeholder="Street Address"
            value={address}
            onChangeText={setAddress}
          />
          <TextInput
            style={styles.input}
            placeholder="Unit / Apt (optional)"
            value={unit}
            onChangeText={setUnit}
          />
          <TextInput
            style={styles.input}
            placeholder="City"
            value={city}
            onChangeText={setCity}
          />
          <TextInput
            style={styles.input}
            placeholder="State"
            value={state}
            onChangeText={setState}
          />
          <TextInput
            style={styles.input}
            placeholder="ZIP Code"
            value={zip}
            onChangeText={setZip}
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
    borderColor: '#ccc',
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
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  backText: {
    marginTop: 16,
    textAlign: 'center',
    color: '#338669', // Rich Green
  },
});
