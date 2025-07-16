// screens/AdminDashboardScreen.js

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
  ActivityIndicator
} from 'react-native';
import Verify from '../components/Verify';

const API_BASE = 'http://3.15.153.52:3307';


const AdminDashboardScreen = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
   const [activeTab, setActiveTab] = useState('devices');
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [checkout, setCheckout] = useState({ userId: '', deviceId: '', returnDate: '', reason: '' });
  const [reservation, setReservation] = useState({ userId: '', deviceId: '', startTime: '', endTime: '', reason: '' });


  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch(`${API_BASE}/admin/dashboard`);
        const json = await res.json();
        setDashboardData(json);
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${API_BASE}/admin/users`);
        const json = await res.json();
        setUsers(json);
      } catch (err) {
        console.error('Failed to fetch users:', err);
      }
    };
    fetchUsers();
  }, []);

  const handleCheckout = async () => {
    try {
      await fetch(`${API_BASE}/admin/log-device`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: checkout.userId,
          deviceId: checkout.deviceId,
          startTime: new Date().toISOString(),
          endTime: checkout.returnDate,
          reason: checkout.reason
        })
      });
      setCheckout({ userId: '', deviceId: '', returnDate: '', reason: '' });
    } catch (err) {
      console.error('Manual checkout failed:', err);
    }
  };

  const handleReservation = async () => {
    try {
      await fetch(`${API_BASE}/admin/reservations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: reservation.userId,
          deviceId: reservation.deviceId,
          startTime: reservation.startTime,
          endTime: reservation.endTime,
          reason: reservation.reason
        })
      });
      setReservation({ userId: '', deviceId: '', startTime: '', endTime: '', reason: '' });
    } catch (err) {
      console.error('Manual reservation failed:', err);
    }
  };

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" color="#338669" />;
  }

  const filteredUsers = users.filter(u => {
    const term = searchTerm.toLowerCase();
    return (
      u.username?.toLowerCase().includes(term) ||
      u.firstName?.toLowerCase().includes(term) ||
      u.lastName?.toLowerCase().includes(term)
    );
  });

  const renderUser = ({ item }) => (
    <View style={styles.userRow}>
      <Text style={styles.userText}>{item.firstName} {item.lastName}</Text>
      <Text style={styles.userSub}>{item.username}</Text>
    </View>
  );

  return (
    <Verify role="admin">
      <View style={styles.container}>
        <View style={styles.tabRow}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'devices' && styles.activeTab]}
            onPress={() => setActiveTab('devices')}
          >
            <Text style={styles.tabText}>Device Management</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'users' && styles.activeTab]}
            onPress={() => setActiveTab('users')}
          >
            <Text style={styles.tabText}>User Management</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'howto' && styles.activeTab]}
            onPress={() => setActiveTab('howto')}
          >
            <Text style={styles.tabText}>How To</Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'devices' && (
          <ScrollView>
            <View style={styles.metricsRow}>
              {dashboardData && [
                { label: 'Total Devices Available', value: dashboardData.totalDevices },
                { label: 'Check Out Today', value: dashboardData.checkedOutToday },
                { label: 'Check In Today', value: dashboardData.checkedInToday },
                { label: 'Overdue', value: dashboardData.overdue }
              ].map((item, index) => (
                <View key={index} style={styles.metricBox}>
                  <Text style={styles.metricLabel}>{item.label}</Text>
                  <Text style={styles.metricValue}>{item.value}</Text>
                </View>
              ))}
            </View>

            <Text style={styles.sectionTitle}>Manual Checkout</Text>
            <View style={styles.formRow}>
              <TextInput
                style={styles.input}
                placeholder="User ID"
                value={checkout.userId}
                onChangeText={t => setCheckout({ ...checkout, userId: t })}
              />
              <TextInput
                style={styles.input}
                placeholder="Device ID"
                value={checkout.deviceId}
                onChangeText={t => setCheckout({ ...checkout, deviceId: t })}
              />
              <TextInput
                style={styles.input}
                placeholder="Return Date"
                value={checkout.returnDate}
                onChangeText={t => setCheckout({ ...checkout, returnDate: t })}
              />
              <TextInput
                style={styles.input}
                placeholder="Reason"
                value={checkout.reason}
                onChangeText={t => setCheckout({ ...checkout, reason: t })}
              />
              <TouchableOpacity style={styles.submitBtn} onPress={handleCheckout}>
                <Text style={styles.submitText}>Submit</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>Manual Reservation</Text>
            <View style={styles.formRow}>
              <TextInput
                style={styles.input}
                placeholder="User ID"
                value={reservation.userId}
                onChangeText={t => setReservation({ ...reservation, userId: t })}
              />
              <TextInput
                style={styles.input}
                placeholder="Device ID"
                value={reservation.deviceId}
                onChangeText={t => setReservation({ ...reservation, deviceId: t })}
              />
              <TextInput
                style={styles.input}
                placeholder="Start Time"
                value={reservation.startTime}
                onChangeText={t => setReservation({ ...reservation, startTime: t })}
              />
              <TextInput
                style={styles.input}
                placeholder="End Time"
                value={reservation.endTime}
                onChangeText={t => setReservation({ ...reservation, endTime: t })}
              />
              <TextInput
                style={styles.input}
                placeholder="Reason"
                value={reservation.reason}
                onChangeText={t => setReservation({ ...reservation, reason: t })}
              />
              <TouchableOpacity style={styles.submitBtn} onPress={handleReservation}>
                <Text style={styles.submitText}>Create</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}

        {activeTab === 'users' && (
          <View style={{ flex: 1 }}>
            <TextInput
              style={styles.input}
              placeholder="Search users..."
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
            <FlatList
              data={filteredUsers}
              keyExtractor={item => String(item.userID)}
              renderItem={renderUser}
            />
          </View>
        )}

          {activeTab === 'howto' && (
          <View style={{ padding: 20 }}>
            <Text style={styles.sectionTitle}>App Tutorial</Text>
            <Text>Placeholder for tutorial video.</Text>
          </View>
       )}
      </View>
    </Verify>
  );
};

export default AdminDashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F3F2EF'
  },
  tabRow: {
    flexDirection: 'row',
    marginBottom: 12
  },
  tabButton: {
    flex: 1,
    padding: 8,
    backgroundColor: '#ccc',
    alignItems: 'center',
    borderRadius: 6,
    marginHorizontal: 2
  },
  activeTab: {
    backgroundColor: '#338669'
  },
  tabText: {
    color: '#003153',
    fontWeight: '600'
  },
  metricsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24
  },
  metricBox: {
    width: '48%',
    backgroundColor: '#E0E0E0',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#338669'
  },
  metricLabel: {
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
    color: '#338669'
    //fontFamily: 'Lato-Bold',
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 4,
    color: '#338669'
    //fontFamily: 'CrimsonText-Bold',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#003153'
  },
  formRow: {
    marginBottom: 20
  },
 input: {
    borderWidth: 1,
    //borderColor: '#ddd',
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 6,
    marginBottom: 8,
    backgroundColor: '#fff'
  },
  submitBtn: {
    backgroundColor: '#003153',
    padding: 10,
    borderRadius: 6,
    //marginBottom: 10,
    alignItems: 'center',
    marginTop: 4
  },
  submitText: {
    color: '#fff',
    fontWeight: '600'
  },
  userRow: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#ddd'
  },
  userText: {
    fontWeight: '600',
    color: '#003153'
  },
  userSub: {
    color: '#555',
    fontSize: 12
  }
});