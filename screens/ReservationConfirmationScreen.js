import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function ReservationConfirmationScreen({ route, navigation }) {
  const { zipCode, deviceType, selectedDate, selectedTime } = route.params;

  return (

   



    <View style={styles.container}>
         <Text style={styles.qrNote}>QR code here.</Text>
      <Text style={styles.title}>Reservation Confirmed 🎉</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Device:</Text>
        <Text style={styles.value}>{deviceType}</Text>

        <Text style={styles.label}>Date:</Text>
        <Text style={styles.value}>{new Date(selectedDate).toDateString()}</Text>

        <Text style={styles.label}>Time:</Text>
        <Text style={styles.value}>{selectedTime}</Text>

        <Text style={styles.label}>ZIP Code:</Text>
        <Text style={styles.value}>{zipCode}</Text>

        <Text style={styles.label}>Return Instructions - coming soon</Text>
        
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
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
    color: '#3D2A75', //purple
    marginBottom: 24,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#F3F2F5', //lavender
    borderRadius: 12,
    padding: 20,
    width: '100%',
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginTop: 12,
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  button: {
    backgroundColor: '#3D2A75',
    padding: 14,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },

  qrNote: {
  marginTop: 20,
  fontStyle: 'italic',
  color: '#888',
  textAlign: 'center',
},

});
