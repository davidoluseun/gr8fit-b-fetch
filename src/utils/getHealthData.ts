import AppleHealthKit, {
  HealthValue,
  HealthKitPermissions,
} from 'react-native-health';
import auth from '@react-native-firebase/auth';
import db from '@react-native-firebase/database';

export default async function getHealthData(
  healthKitOptions: HealthKitPermissions
) {
  const { currentUser } = auth();
  const ref = `/users/${currentUser?.uid}`;
  console.log('getHealthData');

  const options = {
    startDate: new Date(2024, 5, 1).toISOString(),
  };

  AppleHealthKit.initHealthKit(healthKitOptions, (err, results) => {
    if (err) return;

    AppleHealthKit.getStepCount(options, (err, result) => {
      if (err) return;

      if (currentUser) db().ref(ref).update({ steps: result.value });
    });

    AppleHealthKit.getDistanceWalkingRunning(options, (err, result) => {
      if (err) return;

      if (currentUser) db().ref(ref).update({ distance: result.value });
    });

    AppleHealthKit.getActiveEnergyBurned(options, (err, results) => {
      if (err) return;
      if (currentUser) {
        const cummulator = (sum: number, entry: HealthValue) =>
          sum + entry.value;
        const totalValue = results.reduce(cummulator, 0);

        db().ref(ref).update({ calories: totalValue });
      }
    });
  });
}
