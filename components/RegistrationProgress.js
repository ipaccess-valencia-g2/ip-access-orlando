import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function RegistrationProgress({ currentStep }) {
  return (
    <View style={styles.progressContainer}>
      <View style={[styles.step, currentStep >= 1 ? styles.stepActive : styles.stepInactive]} />
      <View style={[styles.step, styles.stepSpacing, currentStep >= 2 ? styles.stepActive : styles.stepInactive]} />
      <View style={[styles.step, styles.stepSpacing, currentStep >= 3 ? styles.stepActive : styles.stepInactive]} />
    </View>
  );
}

const styles = StyleSheet.create({
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 24,
  },
  step: {
    flex: 1,
    height: 8,
    borderRadius: 4,
  },
  stepSpacing: {
    marginRight: 8,
  },
  stepActive: {
    backgroundColor: '#003153', // Midnight Navy
  },
  stepInactive: {
    backgroundColor: '#E0E0E0', // Light Gray
  },
});
