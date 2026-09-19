import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { OwnerTabs } from './OwnerTabs';
import { WalkerTabs } from './WalkerTabs';

import * as Linking from 'expo-linking';

const prefix = Linking.createURL('/');

const linking = {
  prefixes: [prefix, 'https://app.doggogo.site', 'doggogo://'],
  config: {
    screens: {
      Login: 'login',
      Owner: {
        path: 'owner',
        screens: {
          Directorio: 'directory',
          Paseo: 'tracking',
        }
      },
      Walker: {
        path: 'walker',
        screens: {
          Dashboard: 'dashboard',
          Cursos: 'courses',
          Perfil: 'profile',
        }
      }
    },
  },
};

export const AppNavigator = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer linking={linking}>
      {!user ? (
        <LoginScreen />
      ) : user.role === 'owner' ? (
        <OwnerTabs />
      ) : (
        <WalkerTabs />
      )}
    </NavigationContainer>
  );
};
