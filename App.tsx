import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Login } from './src/screens/Login';
import { Register } from './src/screens/Register';
import { LoadingScreen } from './src/screens/Loading';
import { AppNavigator } from './src/navigation/AppNavigator';

import useLocation from './src/hooks/useLocation';
import useAppleHealthKit from './src/hooks/useAppleHealthKit';

export default function App() {
  const Stack = createNativeStackNavigator();

  useLocation();
  useAppleHealthKit();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='LoadingScreen'
          component={LoadingScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name='Login'
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name='Register'
          component={Register}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name='Main'
          component={AppNavigator}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
