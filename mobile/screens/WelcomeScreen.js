// screens/WelcomeScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
const logo = require('../assets/TabletLogoOfficial.png'); // adjust path if needed



export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
  <Image source={logo} style={styles.logo} resizeMode="contain" />
  
  <Text style={styles.title}>Welcome to ConnectOrlando</Text>
  <Text style={styles.subtitle}>
    Find, reserve, and return tablets from your local community center.
  </Text>

  <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
    <Text style={styles.buttonText}>Get Started</Text>
  </TouchableOpacity>
</View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F2EF', // Neutral Linen
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#003153', // Midnight Navy
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#003153', // Midnight Navy 
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff', // White
    fontWeight: '600',
    fontSize: 16,
  },
  logo: {
  width: '70%',
  height: 200,
  marginBottom: 32,
},

});
