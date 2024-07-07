import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Leaderboard } from '../screens/Leaderboard';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='FeedScreen'
        component={Leaderboard}
        options={{
          headerTitle: 'Leaderboard',
        }}
      />
    </Stack.Navigator>
  );
};
