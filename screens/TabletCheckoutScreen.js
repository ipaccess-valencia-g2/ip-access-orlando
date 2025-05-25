// screens/TabletCheckoutScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TabletCheckoutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tablet Checkout</Text>
      <Text style={styles.placeholder}>Checkout flow handled in Check Availability screen for now.</Text>
      <Text style={styles.placeholder}>This screen is reserved for future enhancements.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#3D2A75',
    marginBottom: 20,
  },
  placeholder: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginVertical: 8,
  },
});
