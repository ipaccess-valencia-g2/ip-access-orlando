import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions, 
  Image
} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const logo = require('../assets/TabletLogoOfficial.png');



export default function HomeScreen({ navigation }) {
  const [isAdmin, setIsAdmin] = useState(false); // toggle admin

  const [userInfo, setUserInfo] = useState(null); // holds logged in user info

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('http://18.223.161.174:3307/user/me', {
          credentials: 'include',
        });

        if (!res.ok) {
          throw new Error('Not logged in');
        }

        const data = await res.json();
        console.log('Logged in user info:', data);
        setUserInfo(data);
      } catch (err) {
        console.log('Failed to fetch user info:', err.message);
        setUserInfo(null);
      }
    };

    fetchUser();
  }, []);

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

       {userInfo ? (
        <Text style={styles.loggedInText}>Logged in as {userInfo.firstName}</Text>
      ) : (
        <Text style={styles.loggedInText}>Not logged in</Text>
      )}

      <Image source={logo} style={styles.logo} resizeMode="contain" />

    </ScrollView>

    
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F3F2EF', // Neutral Linen
  },
  gridWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  navButton: {
    backgroundColor: '#003153', // Midnight Navy
    padding: 16,
    borderRadius: 8,
    marginBottom: 15,
    width: '48%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontFamily: 'Lato-Bold',
  },
  toggleAdminBtn: {
    marginTop: 20,
    padding: 12,
    borderRadius: 6,
    backgroundColor: '#E0E0E0', // Light Gray
    alignItems: 'center',
  },
  adminActive: {
    backgroundColor: '#338669', // Rich Green
  },
  toggleText: {
    fontWeight: '600',
    color: '#003153', // Midnight Navy
    fontFamily: 'Lato-Regular',
  },
  loggedInText: {
    textAlign: 'center',
    marginTop: 10,
    color: '#003153',
    fontFamily: 'Lato-Regular',
  },
  logo: {
  width: '80%',
  height: 300,
  alignSelf: 'center',
  marginTop: 24,
},

});
