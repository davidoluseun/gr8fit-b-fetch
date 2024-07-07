import * as React from 'react';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import auth from '@react-native-firebase/auth';
import db from '@react-native-firebase/database';

import getCityAndCountry from '../utils/getCityAndCountry';

export default function useLocation() {
  const { currentUser } = auth();
  const ref = `/users/${currentUser?.uid}`;

  React.useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') return;

        let currentPosition = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = currentPosition.coords;

        const cityAndCountry = await getCityAndCountry(latitude, longitude);

        if (cityAndCountry && currentUser) {
          const { city, country } = cityAndCountry;

          const location = `${city}, ${country}`;
          db().ref(ref).update({ location });
        }
      } catch (error) {
        // Log errors to Sentry or Bugsnag for error monitoring
      }
    })();
  }, []);
}
