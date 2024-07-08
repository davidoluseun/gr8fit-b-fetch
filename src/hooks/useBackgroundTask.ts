import * as React from 'react';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import { HealthKitPermissions } from 'react-native-health';

import getHealthData from '../utils/getHealthData';

export const BACKGROUND_FETCH_TASK = 'background-fetch-task';

export default function useTask(healthOptions: HealthKitPermissions | null) {
  React.useEffect(() => {
    TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
      try {
        // Log errors to Sentry or Bugsnag for error monitoring
        if (healthOptions) getHealthData(healthOptions);

        return BackgroundFetch.BackgroundFetchResult.NewData;
      } catch (error) {
        // Log errors to Sentry or Bugsnag for error monitoring

        return BackgroundFetch.BackgroundFetchResult.Failed;
      }
    });
  }, []);

  return;
}
