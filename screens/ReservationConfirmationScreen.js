import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useEffect } from 'react';
export default function ReservationConfirmationScreen({ route, navigation }) {
  const { zipCode, deviceType, selectedDate, selectedTime } = route.params;
  useEffect(() => {
    const logReservation = async () => {
      try {
        const response = await fetch('http://18.223.161.174/:3000/reservations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            zipCode,
            deviceType,
            selectedDate,
            selectedTime,
          }),
        });

        const result = await response.json();

        if (!response.ok) {
          console.error('Reservation log failed:', result.error || result);
        } else {
          console.log('Reservation logged:', result.message || result);
        }
      } catch (err) {
        console.error('Network error:', err);
      }
    };

    logReservation();
  }, []);
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
    backgroundColor: '#F3F2EF', // Neutral Linen
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#003153', // Midnight Navy
    marginBottom: 24,
    textAlign: 'center',
    fontFamily: 'CrimsonText-Bold',
  },
  card: {
    backgroundColor: '#D6E6F2', // Ice Blue
    borderRadius: 12,
    padding: 20,
    width: '100%',
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0B3D20', // Evergreen
    marginTop: 12,
    fontFamily: 'Lato-Bold',
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
    color: '#003153', // Midnight Navy
    fontFamily: 'Lato-Regular',
  },
  button: {
    backgroundColor: '#003153', // Midnight Navy
    padding: 14,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    fontFamily: 'Lato-Bold',
  },
  qrNote: {
    marginTop: 20,
    fontStyle: 'italic',
    color: '#888',
    textAlign: 'center',
    fontFamily: 'Lato-Regular',
  },
});

