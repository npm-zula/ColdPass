import { Stack, Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { globalStyles } from '../styles/globalStyles';
import { StorageService } from '../services/StorageService';

export default function Layout() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    const hasPassword = await StorageService.hasMasterPassword();
    setIsAuthenticated(hasPassword);
  };

  // Show nothing while checking authentication
  if (isAuthenticated === null) {
    return null;
  }


  return (
    <Stack 
      screenOptions={{
        headerStyle: {
          backgroundColor: globalStyles.colors.background,
        },
        headerTintColor: globalStyles.colors.primary,
        headerTitleStyle: {
          fontFamily: globalStyles.typography.fontFamily.bold,
          fontSize: globalStyles.typography.sizes.caption,
        },

        headerShadowVisible: false,
      }}
    >
      <Stack.Screen 
        name="start"
        options={{
          title: "Welcome",
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen 
        name="index"
        options={{
          title: "ColdPass",
          gestureEnabled: false,
        }}
      />
      <Stack.Screen 
        name="add"
        options={{
          title: "New Account",
          presentation: 'modal',
        }}
      />
    </Stack>
  );
}