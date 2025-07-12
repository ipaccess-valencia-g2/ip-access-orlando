import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Platform,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';

export default function CheckAvailabilityCheckoutScreen({ navigation }) {
  const [locations, setLocations] = useState([]);
  const [selectedCenterId, setSelectedCenterId] = useState(null);

  const [deviceType, setDeviceType] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);

  const [reasons, setReasons] = useState([]);
  const [reason, setReason] = useState('');
  const [customReason, setCustomReason] = useState('');

  const [centerOpen, setCenterOpen] = useState(false);
  const [centerItems, setCenterItems] = useState([]);

  const [reasonOpen, setReasonOpen] = useState(false);
  const [reasonItems, setReasonItems] = useState([]);

  const tabletTypes = [
    'Dell Latitude 3550 Laptop',
    'Apple iPad 10th Gen',
    'Inseego MiFi X Pro 5G Hotspot',
  ];
  const times = ['9:00am', '10:00am', '11:00am', '1:00pm', '2:00pm', '3:00pm', '4:00pm'];

  useEffect(() => {
    fetch('http://18.223.161.174:3307/locations')
      .then((res) => res.json())
      .then((data) => {
        setLocations(data.locations);
        setCenterItems(
          data.locations.map(loc => ({
            label: loc.name,
            value: loc.locationID,
          }))
        );
      })
      .catch(err => console.error('Error fetching locations:', err));
  }, []);

  useEffect(() => {
    fetch('http://18.223.161.174:3307/reasons')
      .then((res) => res.json())
      .then((data) => {
        setReasons(data.reasons || []);
        setReasonItems(
          data.reasons.map(r => ({
            label: r.label,
            value: r.label,
          }))
        );
      })
      .catch(err => console.error('Error fetching reasons:', err));
  }, []);

  const handleConfirm = async () => {
    const selectedCenter = locations.find(loc => loc.locationID === selectedCenterId);

    if (!selectedCenter || !deviceType || !selectedTime || !reason) {
      Alert.alert('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch('http://18.223.161.174:3307/reserve_mobile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 123, // Replace with real user ID
          deviceType: deviceType,
          locationId: selectedCenter.locationID,
          date: selectedDate.toISOString().split('T')[0],
          time: selectedTime,
          reason: reason === 'Other' ? customReason : reason,
        }),
      });

      const data = await response.json();
      console.log('Server response:', data);

      if (response.ok) {
        Alert.alert('Success!',`Your reservation was created successfully!`);

        navigation.navigate('Reservation Confirmation', {
          selectedCenter,
          deviceType,
          selectedDate: selectedDate.toISOString(), // pass date as string
          selectedTime,
          reason: reason === 'Other' ? customReason : reason,
        });
      } else {
        Alert.alert('Oops!','Something went wrong while creating your reservation. Please try again.');

      }
    } catch (error) {
      console.error('Reservation failed:', error);
      Alert.alert('Network error', 'Could not reach server.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.innerContent}>
        <Text style={styles.heading}>Find a Tablet Near You</Text>

        {/* Center Dropdown */}
        <View style={styles.section}>
          <Text style={styles.label}>Select Community Center:</Text>
          <DropDownPicker
            open={centerOpen}
            value={selectedCenterId}
            items={centerItems}
            setOpen={setCenterOpen}
            setValue={setSelectedCenterId}
            setItems={setCenterItems}
            placeholder="-- Select Center --"
            style={styles.dropdown}
            textStyle={styles.dropdownText}
            dropDownContainerStyle={styles.dropdownContainer}
          />
        </View>

        {/* Device Type */}
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

        {/* Date Picker */}
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

        {/* Reason Dropdown */}
        <View style={styles.section}>
          <Text style={styles.label}>Why are you checking out this device today?</Text>
          <DropDownPicker
            open={reasonOpen}
            value={reason}
            items={reasonItems}
            setOpen={setReasonOpen}
            setValue={setReason}
            setItems={setReasonItems}
            placeholder="-- Select a reason --"
            style={styles.dropdown}
            textStyle={styles.dropdownText}
            dropDownContainerStyle={styles.dropdownContainer}
          />
          {reason === 'Other' && (
            <TextInput
              style={styles.input}
              placeholder="Please describe your reason"
              value={customReason}
              onChangeText={setCustomReason}
            />
          )}
        </View>

        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmText}>Confirm Reservation</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F2EF',
  },
  innerContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40, // ✅ Ensure room for confirm button
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#003153',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'CrimsonText-Bold',
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    color: '#0B3D20',
    fontFamily: 'Lato-Bold',
  },
  dropdown: {
    borderColor: '#ccc',
    borderRadius: 6,
    backgroundColor: '#F3F2EF',
  },
  dropdownText: {
    fontFamily: 'Lato-Regular',
    color: '#003153',
    fontSize: 14,
  },
  dropdownContainer: {
    borderColor: '#ccc',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 12,
    marginTop: 10,
    backgroundColor: '#F3F2EF',
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
