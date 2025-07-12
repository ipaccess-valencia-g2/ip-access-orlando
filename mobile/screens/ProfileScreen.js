import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

export default function ProfileScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Header PLACEHOLDER */}
      <View style={styles.header}>
        <View style={styles.avatar} />
        <Text style={styles.name}>Name</Text>
      </View>

   <View style={styles.section}>
  <Text style={styles.sectionTitle}>My Reservations:</Text>

  {/* Reservation 1  PLACEHOLDER*/}
  <View style={styles.myReservationCard}>
    <Text style={styles.resLabel}>Device:</Text>
    <Text style={styles.resValue}>Amazon Fire</Text>

    <Text style={styles.resLabel}>Pickup Date:</Text>
    <Text style={styles.resValue}>June 2, 2025</Text>

    <Text style={styles.resLabel}>Time:</Text>
    <Text style={styles.resValue}>10:00 AM</Text>
  </View>

  {/* Reservation 2 PLACEHOLDER */}
  <View style={styles.myReservationCard}>
    <Text style={styles.resLabel}>Device:</Text>
    <Text style={styles.resValue}>Chrome Tablet</Text>

    <Text style={styles.resLabel}>Pickup Date:</Text>
    <Text style={styles.resValue}>June 10, 2025</Text>

    <Text style={styles.resLabel}>Time:</Text>
    <Text style={styles.resValue}>2:30 PM</Text>
  </View>


      {/* My Stats  PLACEHOLDER*/}
      <Text style={styles.sectionTitle}>My Stats:</Text>
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Devices Borrowed</Text>
          <View style={styles.statBarBackground}>
            <View style={[styles.statBarFill, { width: '60%' }]} />
          </View>
        </View>

        <View style={styles.statItem}>
          <Text style={styles.statLabel}>On-Time Returns</Text>
          <View style={styles.statBarBackground}>
            <View style={[styles.statBarFill, { width: '100%' }]} />
          </View>
        </View>

        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Late Returns</Text>
          <View style={styles.statBarBackground}>
            <View style={[styles.statBarFill, { width: '25%' }]} />
          </View>
        </View>
      </View>

      {/* Past Reservations PLACEHOLDER*/}
      <Text style={styles.sectionTitle}>Past Reservations:</Text>
      <View style={styles.section}>
  


<View style={styles.reservationGrid}>

  {/* Reservation 1 PLACEHOLDER*/}
  <View style={styles.pastReservationCard}>
    <Text style={styles.resLabel}>Date:</Text>
    <Text style={styles.resValue}>May 29, 2025</Text>

    <Text style={styles.resLabel}>Device:</Text>
    <Text style={styles.resValue}>iPad Pro</Text>

    <Text style={styles.resLabel}>Checkout Duration:</Text>
    <Text style={styles.resValue}>36 hours</Text>
  </View>

  {/* Reservation 2 PLACEHOLDER*/}
  <View style={styles.pastReservationCard}>
    <Text style={styles.resLabel}>Date:</Text>
    <Text style={styles.resValue}>May 21, 2025</Text>

    <Text style={styles.resLabel}>Device:</Text>
    <Text style={styles.resValue}>Samsung Galaxy Tab</Text>

    <Text style={styles.resLabel}>Checkout Duration:</Text>
    <Text style={styles.resValue}>4 Days and 6 Hours</Text>
  </View>


{/*Reservation 3 PLACEHOLDER*/}
    <View style={styles.pastReservationCard}>
    <Text style={styles.resLabel}>Date:</Text>
    <Text style={styles.resValue}>May 31, 2025</Text>

    <Text style={styles.resLabel}>Device:</Text>
    <Text style={styles.resValue}>iPad Mini6</Text>

    <Text style={styles.resLabel}>Checkout Duration:</Text>
    <Text style={styles.resValue}>24 hours</Text>
  </View>

  {/*Reservation 4 PLACEHOLDER*/}
    <View style={styles.pastReservationCard}>
    <Text style={styles.resLabel}>Date:</Text>
    <Text style={styles.resValue}>May 18, 2025</Text>

    <Text style={styles.resLabel}>Device:</Text>
    <Text style={styles.resValue}>Chrome Tablet</Text>

    <Text style={styles.resLabel}>Checkout Duration:</Text>
    <Text style={styles.resValue}>6 hours</Text>
  </View>

  </View>
  </View>
  </View>



    </ScrollView>
  );
}


//styles
const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#d0d4d7',
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: '#003153', // Midnight Navy
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#0B3D20', // Evergreen 
  },
  reservationList: {
    marginBottom: 24,
  },
  reservationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e5ea',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  deviceIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#c4c4c4',
    borderRadius: 6,
    marginRight: 12,
  },
  reservationDetails: {
    flex: 1,
  },
  deviceTitle: {
    fontWeight: '600',
    color: '#003153',
  },
  deviceInfo: {
    fontSize: 12,
    color: '#555',
  },
  moreBtn: {
    padding: 8,
  },
  moreText: {
    fontSize: 18,
    color: '#003153',
  },
  statsContainer: {
    marginBottom: 24,
  },
  statItem: {
    marginBottom: 12,
  },
  statLabel: {
    fontSize: 14,
    marginBottom: 4,
    color: '#0B3D20', // Evergreen
  },
  statBarBackground: {
    height: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
  },
  statBarFill: {
    height: '100%',
    backgroundColor: '#003153', // Midnight Navy
  },
  pastReservationList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  resLabel: {
    fontWeight: '600',
    marginTop: 8,
    color: '#0B3D20', // Evergreen
  },
  resValue: {
    marginBottom: 4,
    color: '#333',
  },
  myReservationCard: {
    backgroundColor: '#F0F0F0',
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
  },
  reservationGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  pastReservationCard: {
    backgroundColor: '#F0F0F0',
    width: '48%',
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
  },
});