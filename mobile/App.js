import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



import WelcomeScreen from './screens/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen'; 

//
import RegistrationStep1 from './screens/registration/RegistrationStep1';
import RegistrationStep2 from './screens/registration/RegistrationStep2';
import RegistrationStep3 from './screens/registration/RegistrationStep3';

//
import ProfileScreen from './screens/ProfileScreen';

//
import CheckAvailabilityCheckoutScreen from './screens/CheckAvailabilityCheckoutScreen';
import ReservationConfirmationScreen from './screens/ReservationConfirmationScreen';
//
import TabletReturnScreen from './screens/TabletReturnScreen';

//
import AdminDashboardScreen from './screens/AdminDashboardScreen';
import SettingsScreen from './screens/SettingsScreen';











const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
 <Stack.Navigator initialRouteName="Welcome">  
  <Stack.Screen name="Welcome" component={WelcomeScreen} />
  <Stack.Screen name="Home" component={HomeScreen} />
  <Stack.Screen name="Login" component={LoginScreen} />
  <Stack.Screen name="Register" component={RegistrationStep1} />
  <Stack.Screen name="Registration Step 2" component={RegistrationStep2} />
  <Stack.Screen name="Registration Step 3" component={RegistrationStep3} />
  <Stack.Screen name="Profile" component={ProfileScreen} />
  <Stack.Screen name="Check Availability" component={CheckAvailabilityCheckoutScreen} />
  <Stack.Screen name="Reservation Confirmation" component={ReservationConfirmationScreen} />
  <Stack.Screen name="Reserve Tablet" component={CheckAvailabilityCheckoutScreen}/>
  <Stack.Screen name="Tablet Return" component={TabletReturnScreen} />
  <Stack.Screen name="Admin Dashboard" component={AdminDashboardScreen} />
  <Stack.Screen name="Settings" component={SettingsScreen} />
</Stack.Navigator>

    </NavigationContainer>
  );
}
