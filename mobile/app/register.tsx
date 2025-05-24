import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onRegister = () => {
    // Just a simple alert for now
    if (!name || !email || !password) {
      Alert.alert('Please fill all fields');
      return;
    }
    Alert.alert('Registered!', `Name: ${name}\nEmail: ${email}`);
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
      <Text style={{ color: 'white', fontSize: 24, marginBottom: 20, textAlign: 'center' }}>
        Register [example]
      </Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 12, borderRadius: 4 }}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 12, borderRadius: 4 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 20, borderRadius: 4 }}
      />
      <Button title="Register" onPress={onRegister} />
    </View>
  );
}
