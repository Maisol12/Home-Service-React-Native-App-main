import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import BookingScreen from '../Screens/BookingScreen/BookingScreen';
import BusinessDetailsScreen from '../Screens/BusinessDetailsScreen/BusinessDetailsScreen';
import BusinessDetailsBooked from '../Screens/BusinessDetailsScreen/BussinessDetailBooked';

const Stack = createStackNavigator();

export default function BookingNavigation() {
  return (
    <Stack.Navigator screenOptions={{
        headerShown:false
       }}>
            <Stack.Screen name='booking-screen' component={BookingScreen} />
          
            <Stack.Screen name='business-detail' component={BusinessDetailsScreen} />

            <Stack.Screen name='business-detail-booked' component={BusinessDetailsBooked} />
       </Stack.Navigator>
  )
}