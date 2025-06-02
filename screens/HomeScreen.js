import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default function HomeScreen({ navigation }) {
  const [isAdmin, setIsAdmin] = useState(false); // toggle admin

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.gridWrapper}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Reserve Tablet')}>
          <Text style={styles.buttonText}>Reserve Tablet</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Tablet Return')}>
          <Text style={styles.buttonText}>Return Tablet</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.buttonText}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Settings')}>
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>

        {isAdmin && (
          <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Admin Dashboard')}>
            <Text style={styles.buttonText}>Admin Dashboard</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Toggle Admin Mode Button */}
      <TouchableOpacity
        style={[styles.toggleAdminBtn, isAdmin && styles.adminActive]}
        onPress={() => setIsAdmin(!isAdmin)}
      >
        <Text style={styles.toggleText}>
          {isAdmin ? 'Disable Admin Mode' : 'Enable Admin Mode'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  gridWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  navButton: {
    backgroundColor: '#3D2A75',
    padding: 16,
    borderRadius: 8,
    marginBottom: 15,
    width: '48%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  toggleAdminBtn: {
    marginTop: 20,
    padding: 12,
    borderRadius: 6,
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
  },
  adminActive: {
    backgroundColor: '#DBB86F', // Gold
  },
  toggleText: {
    fontWeight: '600',
    color: '#333',
  },
});