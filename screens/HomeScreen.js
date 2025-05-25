import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default function HomeScreen({ navigation }) {
  const isAdmin = false; // admin hidden features

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/*
      <View style={styles.hero}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.heroText}>Reserve Today with ConnectOrlando</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>How it works</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.card}><Text>Step 1</Text></View>
          <View style={styles.card}><Text>Step 2</Text></View>
          <View style={styles.card}><Text>Step 3</Text></View>
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Reserve Now</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {['iPad Mini', 'iPad Pro', 'Amazon Fire', 'Samsung Tab'].map((device, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.reserveCard}
              onPress={() => navigation.navigate('CheckAvailability')}
            >
              <Text>{device}</Text>
              <Text style={styles.reserveBtn}>Reserve Now!</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      */}

      <View style={styles.gridWrapper}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('CheckAvailability')}>
          <Text style={styles.buttonText}>Reserve Tablet</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('TabletReturn')}>
          <Text style={styles.buttonText}>Return Tablet</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.buttonText}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Settings')}>
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>

        {isAdmin && (
          <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('AdminDashboard')}>
            <Text style={styles.buttonText}>Admin Dashboard</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  hero: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  heroText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    width: screenWidth * 0.6,
    height: 120,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 20,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reserveCard: {
    width: 120,
    height: 140,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  reserveBtn: {
    marginTop: 10,
    color: '#3D2A75',
    fontWeight: '600',
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
});
