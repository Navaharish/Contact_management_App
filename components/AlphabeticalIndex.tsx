import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from './ThemedText';

const alphabet = '#ABCDEFGHIJKLMNOPQRSTUVWXYZ...'.split('');

export function AlphabeticalIndex({ onLetterPress }: { onLetterPress: (letter: string) => void }) {
  return (
    <View style={styles.container}>
      {alphabet.map((letter) => (
        <TouchableOpacity
          key={letter}
          onPress={() => onLetterPress(letter)}
          style={styles.letterContainer}
        >
          <ThemedText style={styles.letter}>{letter}</ThemedText>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 5,
    top: 0,
    bottom: 0,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    zIndex: 1,
  },
  letterContainer: {
    padding: 2,
  },
  letter: {
    fontSize: 11,
    color: '#9BA1A6',
  },
}); 