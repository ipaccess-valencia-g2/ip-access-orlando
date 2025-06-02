// screens/AdminDashboardScreen.js

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function AdminDashboardScreen() {
  return (
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
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
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
  },
  metricLabel: {
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  metricValue: {
    fontSize: 36,
    fontWeight: '900',
    marginBottom: 4,
  },
  viewText: {
    color: '#3D2A75',
    fontWeight: '500',
  },
  columns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  column: {
    flex: 1,
    backgroundColor: '#fff',
  },
  columnTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  activityItem: {
    height: 20,
    backgroundColor: '#E0E0E0',
    borderRadius: 6,
    marginBottom: 10,
  },
});
