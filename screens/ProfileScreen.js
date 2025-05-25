import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function ProfileScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      <View style={styles.profilePic} />

      
      <Text style={styles.name}> McKenna Pasquale</Text>

      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Favorite / Current / Most Used Reservations:</Text>
        <View style={styles.reservationCard}>
          <Text>Date(s)</Text>
          <Text>Device</Text>
          <TouchableOpacity style={styles.optionsBtn}>
            <Text style={styles.optionsText}>•••</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.reservationCard}>
          <Text>Date(s)</Text>
          <Text>Device</Text>
          <TouchableOpacity style={styles.optionsBtn}>
            <Text style={styles.optionsText}>•••</Text>
          </TouchableOpacity>
        </View>
      </View>

      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Stats:</Text>
        <View style={styles.statBarContainer}>
          <Text>Devices Borrowed</Text>
          <View style={styles.statBar}>
            <View style={[styles.statFill, { width: '10%' }]} />
          </View>
        </View>
        <View style={styles.statBarContainer}>
          <Text>On-Time Returns</Text>
          <View style={styles.statBar}>
            <View style={[styles.statFill, { width: '100%' }]} />
          </View>
        </View>
        <View style={styles.statBarContainer}>
          <Text>Late Returns</Text>
          <View style={styles.statBar}>
            <View style={[styles.statFill, { width: '30%' }]} />
          </View>
        </View>
        <Text>Warning Message Here</Text>
      </View>

     
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Past Reservations:</Text>
        <View style={styles.pastReservationCard}>
          <Text>Date(s)</Text>
          <Text>Device</Text>
          <Text>Checkout Duration</Text>
        </View>
        <View style={styles.pastReservationCard}>
         <Text>Date(s)</Text>
          <Text>Device</Text>
          <Text>Checkout Duration</Text>
        
        </View>
        
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#cfd8dc',
    alignSelf: 'center',
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  reservationCard: {
    backgroundColor: '#e0e0e0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    position: 'relative',
  },
  optionsBtn: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  optionsText: {
    fontSize: 18,
  },
  statBarContainer: {
    marginBottom: 12,
  },
  statBar: {
    height: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
  },
  statFill: {
    height: '100%',
    backgroundColor: '#3D2A75',
  },
  pastReservationCard: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
});
