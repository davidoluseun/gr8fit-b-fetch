import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    backgroundColor: '#3A0098',
  },
  label: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  content: {
    height: 57,
    width: '100%',
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
});

interface CTAButtonProps {
  title: string;
  disabled?: boolean;
  loading?: boolean;
  onPress: () => void;
}

export const CTAButton = ({ title, onPress }: CTAButtonProps) => {
  return (
    <Button
      mode='contained'
      onPress={onPress}
      style={styles.container}
      labelStyle={styles.label}
      contentStyle={styles.content}
    >
      {title}
    </Button>
  );
};
