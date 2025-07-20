

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';

const logo = require('../assets/TabletLogoOfficial.png');

export default function WelcomeScreen({ navigation }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await SecureStore.getItemAsync("jwt");
        if (!token || typeof token !== "string") {
          console.log("No token or invalid format");
          setLoading(false);
          return;
        }

        const decoded = jwtDecode(token);
        const now = Math.floor(Date.now() / 1000);
        if (decoded.exp > now) {
          console.log(" Token valid. Navigating to Home.");
          navigation.navigate("Home");
        } else {
          console.log(" Token expired. Deleting...");
          await SecureStore.deleteItemAsync("jwt");
          setLoading(false);
        }
      } catch (err) {
        console.error(" Error decoding token:", err);
        setLoading(false);
      }
    };

    checkToken();
  }, []);

  if (loading) {
    return <View style={{ flex: 1, backgroundColor: '#F3F2EF' }} />;
  }

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
    backgroundColor: '#F3F2EF',
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#003153',
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
    backgroundColor: '#003153',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  logo: {
    width: '70%',
    height: 200,
    marginBottom: 32,
  },
});
