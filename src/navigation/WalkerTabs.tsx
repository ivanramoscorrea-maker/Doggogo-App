import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DashboardScreen } from '../screens/walker/DashboardScreen';
import { CertificationsScreen } from '../screens/walker/CertificationsScreen';
import { WalkerProfileScreen } from '../screens/walker/WalkerProfileScreen';
import { Text } from 'react-native';

const Tab = createBottomTabNavigator();

export const WalkerTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#F97316', // accent
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
        name="Dashboard" 
        component={DashboardScreen} 
        options={{
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>📋</Text>
        }}
      />
      <Tab.Screen 
        name="Cursos" 
        component={CertificationsScreen} 
        options={{
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>🎓</Text>
        }}
      />
      <Tab.Screen 
        name="Perfil" 
        component={WalkerProfileScreen} 
        options={{
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>👤</Text>
        }}
      />
    </Tab.Navigator>
  );
};
