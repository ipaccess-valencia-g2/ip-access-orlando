
//need to be able to show devices / times available vs faded out if unavailable


import React, { useState } from 'react';
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
  const [neighborhood, setNeighborhood] = useState(null);
  const [deviceType, setDeviceType] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date()); // todays date by default
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);

  const [showTablets, setShowTablets] = useState(false);
  const tabletTypes = ['iPad Pro', 'iPad Mini', 'Samsung Galaxy', 'Amazon Fire', 'Chrome Tablet'];
  const times = ['9:00am', '10:00am', '11:00am', '1:00pm', '2:00pm', '3:00pm', '4:00pm'];

  const handleZipSearch = () => {
    if (zipCode === '32801') {
      setNeighborhood('Downtown Tech Center');
    } else if (zipCode === '32822') {
      setNeighborhood('East Orlando Hub');
    } else {
      setNeighborhood('Neighborhood Center Name');
    }
    setShowTablets(true);
  };

  const handleConfirm = () => {
    if (!zipCode || !deviceType || !selectedTime) {
      Alert.alert('Please fill in all fields.');
      return;
    }

    navigation.navigate('Reservation Confirmation', {
      zipCode,
      neighborhood,
      deviceType,
      selectedDate,
      selectedTime,
    });
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

      {neighborhood && (
        <View style={styles.section}>
          <Text style={styles.label}>Nearest Center:</Text>
          <Text style={styles.value}>{neighborhood}</Text>
        </View>
      )}

      {showTablets && (
        <>
          <View style={styles.section}>
            <Text style={styles.label}>Select Tablet Type:</Text>
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

          {/* Date Selection */}
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
              minimumDate={new Date()} // prevent past dates
            />
          )}

          {/* Time Selection */}
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
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3D2A75',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 12,
    marginBottom: 12,
  },
  searchButton: {
    backgroundColor: '#3D2A75',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 20,
  },
  searchText: {
    color: '#fff',
    fontWeight: '600',
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  value: {
    fontSize: 16,
    color: '#333',
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
    borderColor: '#3D2A75',
    borderRadius: 6,
    margin: 4,
    minWidth: 120,
    alignItems: 'center',
  },
  tabletText: {
    color: '#3D2A75',
  },
  selectedTablet: {
    backgroundColor: '#3D2A75',
  },
  selectedTabletText: {
    color: '#fff',
    fontWeight: '600',
  },
  dateButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 12,
    marginBottom: 16,
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
    borderColor: '#3D2A75',
    borderRadius: 6,
    margin: 4,
    minWidth: 80,
    alignItems: 'center',
  },
  selectedTime: {
    backgroundColor: '#3D2A75',
  },
  timeText: {
    color: '#3D2A75',
  },
  selectedTimeText: {
    color: '#fff',
    fontWeight: '600',
  },
  confirmButton: {
    marginTop: 24,
    backgroundColor: '#3D2A75',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
