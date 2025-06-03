// screens/DayScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function DayScreen({ route, navigation }) {
  const { day, mealTitle } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{day}'s Meal</Text>
      <Text style={styles.meal}>{mealTitle}</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Search for a different meal</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  meal: { fontSize: 18, marginBottom: 30 },
  button: { backgroundColor: '#000', padding: 14, borderRadius: 10 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: '600' },
});
