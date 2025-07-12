// screens/AdminDashboardScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function AdminDashboardScreen() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const res = await fetch('http://18.223.161.174:3000/admin/dashboard');
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error('Failed to load dashboard:', err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" color="#338669" />;
  }

  return (
      <Verify role="admin">
        {loading ? (
            <ActivityIndicator size="large" style={{ flex: 1 }} color="#338669" />
        ) : (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Top 4 Metrics */}
      <View style={styles.metricsRow}>
        {[
          { label: 'Total Devices Available', value: 3 },
          { label: 'Check Out Today', value: 9 },
          { label: 'Check In Today', value: 2 },
          { label: 'Overdue', value: 1 },
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
        )}
      </Verify>
  );
}



const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F3F2EF', // Neutral Linen
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
    borderLeftColor: '#338669', // Green accent border
  },
  metricLabel: {
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
    color: '#338669', // Green label
    fontFamily: 'Lato-Bold',
  },
  metricValue: {
    fontSize: 36,
    fontWeight: '900',
    marginBottom: 4,
    color: '#338669', // Green value
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
    backgroundColor: '#D6E6F2', // Soft Blue bar
    borderRadius: 6,
    marginBottom: 10,
  },
});
