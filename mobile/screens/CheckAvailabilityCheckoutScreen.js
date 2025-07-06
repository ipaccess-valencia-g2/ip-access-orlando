import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function CheckAvailabilityCheckoutScreen({ navigation }) {
  const [zipCode, setZipCode] = useState('');
  const [locations, setLocations] = useState([]); // All centers from backend
  const [matchingCenters, setMatchingCenters] = useState([]); // Matches for entered ZIP
  const [deviceType, setDeviceType] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);

  const [showTablets, setShowTablets] = useState(false);
  const tabletTypes = ['Dell Latitude 3550 Laptop', 'Apple iPad 10th Gen', 'Inseego MiFi X Pro 5G Hotspot'];
  const times = ['9:00am', '10:00am', '11:00am', '1:00pm', '2:00pm', '3:00pm', '4:00pm'];

  //  Fetch all centers from your backend once
  useEffect(() => {
    fetch('http://192.168.1.55:3307/locations')
      .then((res) => res.json())
      .then((data) => {
          setLocations(data.locations);
        
      })
      .catch((err) => console.error('Error fetching locations:', err));
  }, []);

  const handleZipSearch = () => {
    //const found = locations.filter((loc) => loc.address.substring(loc.address.lastIndexOf(" ") + 1) === zipCode);
    console.log('ZIP entered:', zipCode.trim());
console.log('Locations:', locations.map(l => `${l.name}: ${l.zip}`));

    const found = locations.filter(
  (loc) => loc.zip.trim() === zipCode.trim()
);

    if (found.length > 0) {
      setMatchingCenters(found);
    } else {
      setMatchingCenters([]);
      Alert.alert('No centers found for this ZIP code.');
    }
    setShowTablets(true);
  };

  const handleConfirm = async () => {
    if (!zipCode || !deviceType || !selectedTime) {
      Alert.alert('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch('http://192.168.1.55:3307/reserve_mobile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 123,
          deviceType: deviceType,
          locationId: matchingCenters.length > 0 ? matchingCenters[0].locationID : null, // pick first for now
          date: selectedDate.toISOString().split('T')[0],
          time: selectedTime,
        }),
      });

      const data = await response.json();
      console.log('Server response:', data);

      if (response.ok) {
        Alert.alert('Reservation created!', `Reservation ID: ${data.reservation.id}`);
        navigation.navigate('Reservation Confirmation', {
          zipCode,
          matchingCenters,
          deviceType,
          selectedDate,
          selectedTime,
        });
      } else {
        Alert.alert('Failed to reserve.', data.message || 'Unknown error.');
      }
    } catch (error) {
      console.error('Reservation failed:', error);
      Alert.alert('Network error', 'Could not reach server.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Find a Tablet Near You</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter ZIP Code"
        keyboardType="numeric"
        value={zipCode}
        onChangeText={setZipCode}
      />

      <TouchableOpacity style={styles.searchButton} onPress={handleZipSearch}>
        <Text style={styles.searchText}>Find Neighborhood Center</Text>
      </TouchableOpacity>

      {matchingCenters.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.label}>Available Centers:</Text>
          {matchingCenters.map((center) => (
            <Text key={center.locationID} style={styles.value}>
              {center.name}
            </Text>
          ))}
        </View>
      )}

      {showTablets && (
        <>
          <View style={styles.section}>
            <Text style={styles.label}>Select Device Type:</Text>
            <View style={styles.tabletGrid}>
              {tabletTypes.map((tablet) => (
                <TouchableOpacity
                  key={tablet}
                  style={[
                    styles.tabletOption,
                    deviceType === tablet && styles.selectedTablet,
                  ]}
                  onPress={() => setDeviceType(tablet)}
                >
                  <Text
                    style={
                      deviceType === tablet
                        ? styles.selectedTabletText
                        : styles.tabletText
                    }
                  >
                    {tablet}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <Text style={styles.label}>Select Pickup Date:</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text>{selectedDate.toDateString()}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event, date) => {
                setShowDatePicker(false);
                if (date) setSelectedDate(date);
              }}
              minimumDate={new Date()}
            />
          )}

          <Text style={styles.label}>Select Pickup Time:</Text>
          <View style={styles.timeGrid}>
            {times.map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.timeOption,
                  selectedTime === time && styles.selectedTime,
                ]}
                onPress={() => setSelectedTime(time)}
              >
                <Text
                  style={
                    selectedTime === time
                      ? styles.selectedTimeText
                      : styles.timeText
                  }
                >
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
            <Text style={styles.confirmText}>Confirm Reservation</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#F3F2EF',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#003153',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'CrimsonText-Bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#F3F2EF',
    fontFamily: 'Lato-Regular',
  },
  searchButton: {
    backgroundColor: '#003153',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 20,
  },
  searchText: {
    color: '#fff',
    fontWeight: '600',
    fontFamily: 'Lato-Bold',
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    color: '#0B3D20',
    fontFamily: 'Lato-Bold',
  },
  value: {
    fontSize: 16,
    color: '#003153',
    fontFamily: 'Lato-Regular',
  },
  tabletGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  tabletOption: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#003153',
    borderRadius: 6,
    margin: 4,
    minWidth: 120,
    alignItems: 'center',
    backgroundColor: '#F3F2EF',
  },
  tabletText: {
    color: '#003153',
    fontFamily: 'Lato-Regular',
  },
  selectedTablet: {
    backgroundColor: '#003153',
  },
  selectedTabletText: {
    color: '#fff',
    fontWeight: '600',
    fontFamily: 'Lato-Bold',
  },
  dateButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#F3F2EF',
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  timeOption: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#003153',
    borderRadius: 6,
    margin: 4,
    minWidth: 80,
    alignItems: 'center',
    backgroundColor: '#F3F2EF',
  },
  selectedTime: {
    backgroundColor: '#003153',
  },
  timeText: {
    color: '#003153',
    fontFamily: 'Lato-Regular',
  },
  selectedTimeText: {
    color: '#fff',
    fontWeight: '600',
    fontFamily: 'Lato-Bold',
  },
  confirmButton: {
    marginTop: 24,
    backgroundColor: '#003153',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    fontFamily: 'Lato-Bold',
  },
});
