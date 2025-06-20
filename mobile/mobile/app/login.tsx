import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default function LoginScreen() {
  return (
    <View style={{ flex:1, justifyContent:'center', padding:20 }}>
      <Text style={{ color: 'white', fontSize: 20, marginBottom: 20, textAlign: 'center' }}>
        Login Screen [example]
      </Text>
      <Text style={{ fontSize:24, marginBottom:20 }}>Login</Text>
      <TextInput placeholder="Email" style={{ borderWidth:1, marginBottom:15, padding:10 }} />
      <TextInput placeholder="Password" secureTextEntry style={{ borderWidth:1, marginBottom:15, padding:10 }} />
      <Button title="Sign In" onPress={() => { /* handle login */ }} />
    </View>
  );
}
