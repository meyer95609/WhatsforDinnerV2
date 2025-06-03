import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function GroceryListScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Grocery List will appear here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
});
