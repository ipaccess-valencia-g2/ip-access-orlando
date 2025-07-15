// screens/AdminDashboardScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import Verify from '../components/Verify';


const AdminDashboardScreen = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch('http://3.15.153.52:3000/admin/dashboard');
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

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" color="#338669" />;
  }

  return (
    <Verify role="admin">
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.metricsRow}>
          {dashboardData && [
            { label: 'Total Devices Available', value: dashboardData.totalDevices },
            { label: 'Check Out Today', value: dashboardData.checkedOutToday },
            { label: 'Check In Today', value: dashboardData.checkedInToday },
            { label: 'Overdue', value: dashboardData.overdue },
          ].map((item, index) => (
            <View key={index} style={styles.metricBox}>
              <Text style={styles.metricLabel}>{item.label}</Text>
              <Text style={styles.metricValue}>{item.value}</Text>
              <TouchableOpacity><Text style={styles.viewText}>view</Text></TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.columns}>
          <View style={styles.column}>
            <Text style={styles.columnTitle}>Recent Activity</Text>
            {[...Array(6)].map((_, idx) => (
              <View key={idx} style={styles.activityItem} />
            ))}
          </View>

          <View style={styles.column}>
            <Text style={styles.columnTitle}>Admin / Request</Text>
            {[...Array(6)].map((_, idx) => (
              <View key={idx} style={styles.activityItem} />
            ))}
          </View>
        </View>
      </ScrollView>
    </Verify>
  );
};

export default AdminDashboardScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F3F2EF',
  },
  metricsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  metricBox: {
    width: '48%',
    backgroundColor: '#E0E0E0',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#338669',
  },
  metricLabel: {
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
    color: '#338669',
    fontFamily: 'Lato-Bold',
  },
  metricValue: {
    fontSize: 36,
    fontWeight: '900',
    marginBottom: 4,
    color: '#338669',
    fontFamily: 'CrimsonText-Bold',
  },
  viewText: {
    color: '#003153',
    fontWeight: '500',
    fontFamily: 'Lato-Regular',
  },
  columns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  column: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  columnTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#003153',
    fontFamily: 'Lato-Bold',
  },
  activityItem: {
    height: 20,
    backgroundColor: '#D6E6F2',
    borderRadius: 6,
    marginBottom: 10,
  },
});