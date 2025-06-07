import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Image
} from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Please fill in all fields');
      return;
    }

    // backend fix ?  console.log('Logging in with:', { email, password });
    
    navigation.navigate('Home');
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Image source={require('../assets/TabletLogoOfficial.png')} style={styles.logo} />

          <Text style={styles.title}>ConnectOrlando</Text>
          <Text style={styles.subtitle}>Login</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity onPress={() => alert('Page coming soon')}>
  <Text style={styles.forgotText}>Forgot Password?</Text>
</TouchableOpacity>


          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.linkText}>Don't have an account? Register Now!</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#F3F2EF', // Neutral Linen
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    color: '#003153', // Midnight Navy
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: '#003153', // Midnight Navy
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc', // Light gray
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#F3F2EF',
  },
  button: {
    backgroundColor: '#003153', // Midnight Navy
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
  linkText: {
    color: '#338669', // Rich Green
    textAlign: 'center',
    fontWeight: '500',
  },
  forgotText: {
    color: '#003153', // Midnight Navy
    textAlign: 'right',
    marginBottom: 16,
    fontWeight: '500',
  },
   logo: {
  width: 200,
  height: 300,
  marginBottom: 16,
  resizeMode: 'contain',
  alignSelf: 'center',
},
});
