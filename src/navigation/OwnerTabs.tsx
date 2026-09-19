import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DirectoryScreen } from '../screens/owner/DirectoryScreen';
import { TrackingScreen } from '../screens/owner/TrackingScreen';
import { Text } from 'react-native';

const Tab = createBottomTabNavigator();

export const OwnerTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#3B82F6', // primary
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 10,
          height: 60,
          paddingBottom: 10,
        }
      }}
    >
      <Tab.Screen 
        name="Directorio" 
        component={DirectoryScreen} 
        options={{
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>🐕</Text>
        }}
      />
      <Tab.Screen 
        name="Rastreo" 
        component={TrackingScreen} 
        options={{
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>📍</Text>
        }}
      />
    </Tab.Navigator>
  );
};
