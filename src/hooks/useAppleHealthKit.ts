import * as React from 'react';
import AppleHealthKit, { HealthKitPermissions } from 'react-native-health';

import getHealthData from '../utils/getHealthData';

export default function useAppleHealthKit() {
  const [healthOptions, setHealthOptions] =
    React.useState<HealthKitPermissions | null>(null);

  React.useEffect(() => {
    const healthKitOptions = {
      permissions: {
        read: [
          AppleHealthKit.Constants.Permissions.StepCount,
          AppleHealthKit.Constants.Permissions.DistanceWalkingRunning,
          AppleHealthKit.Constants.Permissions.ActiveEnergyBurned,
        ],
      },
    } as HealthKitPermissions;

    getHealthData(healthKitOptions);

    setHealthOptions(healthKitOptions);
  }, []);

  return healthOptions;
}
