import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { OwnerTabs } from './OwnerTabs';
import { WalkerTabs } from './WalkerTabs';

export const AppNavigator = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
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
