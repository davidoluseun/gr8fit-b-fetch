import * as React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import db from '@react-native-firebase/database';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#F7F7F7',
  },
  separator: {
    height: 20,
  },
  rank: {
    padding: 15,
    borderRadius: 15,
    backgroundColor: 'white',
  },
  rankRow: {
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  key: {
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
});

interface LeaderboardType {
  userId: string;
  displayName: any;
  calories: any;
  distance: any;
  steps: any;
  location: any;
}

export const Leaderboard = () => {
  const [leaderBoard, setLeaderBoard] = React.useState<LeaderboardType[]>([]);

  React.useEffect(() => {
    const ref = `/users`;

    const onValueChange = db()
      .ref(ref)
      .on('value', (snapshot) => {
        const data = snapshot.val();

        const leaderboardData = Object.keys(data).map((userId) => ({
          userId: userId,
          displayName: data[userId].displayName || '',
          calories: data[userId].calories || 0,
          distance: data[userId].distance || 0,
          steps: data[userId].steps || 0,
          location: data[userId].location || '',
        }));

        leaderboardData.sort((a, b) => b.calories - a.calories);

        setLeaderBoard(leaderboardData);
      });

    return () => db().ref(ref).off('value', onValueChange);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='purple' />

      <FlatList
        data={leaderBoard}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.userId}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.rank}>
              <View style={styles.rankRow}>
                <Text style={styles.key}>Rank</Text>
                <Text style={styles.value}>{index + 1}</Text>
              </View>

              {Object.entries(item).map(([key, value]) => {
                if (key !== 'userId') {
                  return (
                    <View key={key} style={styles.rankRow}>
                      <Text style={styles.key}>{key}</Text>
                      <Text style={styles.value}>
                        {key === 'calories' || key === 'distance'
                          ? Number(value).toFixed(2)
                          : value}
                      </Text>
                    </View>
                  );
                }
              })}
            </View>
          );
        }}
      />
    </View>
  );
};
