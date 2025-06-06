import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function SettingsScreen({ navigation }) {
  const [reminderEnabled, setReminderEnabled] = useState(true);
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifText, setNotifText] = useState(false);
  const [notifCall, setNotifCall] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Settings</Text>

      {/* Profile & Account Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>

        <TouchableOpacity style={styles.item}>
          <Text>Update Personal Information</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <Text>Change Password</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <Text>Manage Linked Devices</Text>
        </TouchableOpacity>
      </View>

 {/* Notifications */}
<View style={styles.section}>
  <Text style={styles.sectionTitle}>Notifications</Text>

  <View style={styles.row}>
    <Text style={{ color: '#003153', fontFamily: 'Lato-Regular' }}>Email</Text>
    <Switch
      value={notifEmail}
      onValueChange={setNotifEmail}
      trackColor={{ false: '#ccc', true: '#ddd' }} // Soft gray when ON
      thumbColor={notifEmail ? '#338669' : '#f4f3f4'}
      ios_backgroundColor="#ccc"
    />
  </View>

  <View style={styles.row}>
    <Text style={{ color: '#003153', fontFamily: 'Lato-Regular' }}>Text Message</Text>
    <Switch
      value={notifText}
      onValueChange={setNotifText}
      trackColor={{ false: '#ccc', true: '#ddd' }}
      thumbColor={notifText ? '#338669' : '#f4f3f4'}
      ios_backgroundColor="#ccc"
    />
  </View>

  <View style={styles.row}>
    <Text style={{ color: '#003153', fontFamily: 'Lato-Regular' }}>Phone Call</Text>
    <Switch
      value={notifCall}
      onValueChange={setNotifCall}
      trackColor={{ false: '#ccc', true: '#ddd' }}
      thumbColor={notifCall ? '#338669' : '#f4f3f4'}
      ios_backgroundColor="#ccc"
    />
  </View>

  <View style={styles.row}>
    <Text style={{ color: '#003153', fontFamily: 'Lato-Regular' }}>Reservation Reminders</Text>
    <Switch
      value={reminderEnabled}
      onValueChange={setReminderEnabled}
      trackColor={{ false: '#ccc', true: '#ddd' }}
      thumbColor={reminderEnabled ? '#338669' : '#f4f3f4'}
      ios_backgroundColor="#ccc"
    />
  </View>
</View>




      {/* Preferences */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>

        <TouchableOpacity style={styles.item}>
          <Text>Saved Pickup Location</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <Text>Language Selection</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <Text>Accessibility Options</Text>
        </TouchableOpacity>
      </View>

      {/* Support */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>

        <TouchableOpacity style={styles.item}>
          <Text>Help Center / FAQ</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <Text>Terms of Service</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <Text>Privacy Policy</Text>
        </TouchableOpacity>
      </View>

      {/* Other */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Other</Text>

        <TouchableOpacity style={styles.item}>
          <Text>View Past Reservations</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <Text>Submit Feedback</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.item, styles.logout]}>
          <Text style={{ color: '#A00' }}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#F3F2EF', // Neutral Linen
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
    color: '#003153', // Midnight Navy
    fontFamily: 'CrimsonText-Bold',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#0B3D20', // Evergreen
    fontFamily: 'Lato-Bold',
  },
  item: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#D6E6F2', // Ice Blue Divider
    fontFamily: 'Lato-Regular',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#D6E6F2',
    fontFamily: 'Lato-Regular',
  },
  logout: {
    borderTopWidth: 1,
    borderColor: '#D6E6F2',
    marginTop: 20,
    paddingVertical: 12,
  },
});

