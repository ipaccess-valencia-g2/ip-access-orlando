import React from 'react';
import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white', // Add a light background color
      }}
    >
      <Text style={{ color: 'black', fontSize: 20, marginBottom: 20 }}>
        ConnectOrlando
        </Text>
      <Button title="Register" onPress={() => router.push('/register')} />
      <Button title="Login" onPress={() => router.push('/login')} />
    </View>
  );
}
