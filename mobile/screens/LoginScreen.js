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
  Image,
  Alert,
} from 'react-native';
import * as SecureStore from 'expo-secure-store'; // use for storing tokens if needed


export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Save token
  const saveToken = async (token) => {
    await SecureStore.setItemAsync("jwt", token);
    console.log("Token saved: ", token);
  };

  // Retrieve token from SecureStore
  const retrieveToken = async () => {
    let result = await SecureStore.getItemAsync("jwt");
    return result;
  };

  // Delete token off of SecureStore
  const deleteToken = async () => {
    await SecureStore.deleteItemAsync('jwt');
    console.log('Token deleted');
  };

  const handleLogin = async () => {
  if (!username || !password) {
    Alert.alert('Please fill in all fields');
    return;
  }

  try {
    const response = await fetch('http://3.15.153.52:3307/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Expo (Mobile)'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    });

    const data = await response.json();
    console.log("Login response:", data);

    if (!response.ok || !data.token || typeof data.token !== 'string') {
      throw new Error(data.message || 'Login failed');
    }

    await SecureStore.setItemAsync("jwt", data.token);
    console.log("✅ Token saved to SecureStore:", data.token);

    navigation.navigate('Home');
  } catch (err) {
    console.log("Login error:", err.message);
    Alert.alert("Login Failed", err.message);
    await SecureStore.deleteItemAsync("jwt"); // remove bad token just in case
  }
};


  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Image source={require('../assets/TabletLogoOfficial.png')} style={styles.logo} /> {/*logo*/}

          <Text style={styles.title}>ConnectOrlando</Text>
          <Text style={styles.subtitle}>Login</Text>

          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

{/*forgot password link placeholder - NOT COMPLETE */}
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


//styles
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