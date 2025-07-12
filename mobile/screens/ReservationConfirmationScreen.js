import React from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg'; //  Import the QR code component

export default function ReservationConfirmationScreen({ route, navigation }) {
  const { selectedCenter, deviceType, selectedDate, selectedTime } = route.params;

  // Format the data to encode in the QR
  const qrValue = JSON.stringify({
    center: selectedCenter.name,
    address: selectedCenter.address,
    deviceType,
    date: selectedDate,
    time: selectedTime,
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.innerContent}>
        {/*QR code with reservation details*/}
        <View style={styles.qrContainer}>
          <QRCode value={qrValue} size={180} />
          <Text style={styles.qrNote}>Scan this QR code to return</Text>
        </View>
{/*Confirmation title and details*/}
        <Text style={styles.title}>Reservation Confirmed 🎉</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Device:</Text>
          <Text style={styles.value}>{deviceType}</Text>

          <Text style={styles.label}>Date:</Text>
          <Text style={styles.value}>{new Date(selectedDate).toDateString()}</Text>

          <Text style={styles.label}>Time:</Text>
          <Text style={styles.value}>{selectedTime}</Text>

          <Text style={styles.label}>Center:</Text>
          <Text style={styles.value}>{selectedCenter.name}</Text>

          <Text style={styles.label}>Center Address:</Text>
          <Text style={styles.value}>{selectedCenter.address}</Text>

          <Text style={styles.label}>Return Instructions:</Text>
          <Text style={styles.value}>
            Please return your device to {selectedCenter.name} at {selectedCenter.address} by your due date.
          </Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonText}>Back to Home</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}


//styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F2EF',
  },
  innerContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrContainer: {
    marginBottom: 24,
    alignItems: 'center',
  },
  qrNote: {
    marginTop: 12,
    fontStyle: 'italic',
    color: '#888',
    textAlign: 'center',
    fontFamily: 'Lato-Regular',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#003153',
    marginBottom: 24,
    textAlign: 'center',
    fontFamily: 'CrimsonText-Bold',
  },
  card: {
    backgroundColor: '#D6E6F2',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0B3D20',
    marginTop: 12,
    fontFamily: 'Lato-Bold',
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
    color: '#003153',
    fontFamily: 'Lato-Regular',
  },
  button: {
    backgroundColor: '#003153',
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
});
