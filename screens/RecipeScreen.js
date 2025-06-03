import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

export default function RecipeScreen({ route }) {
  const { meal } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={meal.image} style={styles.image} />
      <Text style={styles.title}>{meal.title}</Text>
      <Text style={styles.subheader}>{meal.day} • {meal.price}</Text>

      <Text style={styles.section}>Ingredients</Text>
      <Text style={styles.paragraph}>
        - 8 oz rice noodles{'\n'}
        - 1 tbsp oil{'\n'}
        - 2 eggs{'\n'}
        - 1 cup bean sprouts{'\n'}
        - 1/2 cup chopped peanuts{'\n'}
        - Lime wedges
      </Text>

      <Text style={styles.section}>Instructions</Text>
      <Text style={styles.paragraph}>
        1. Cook noodles according to package instructions.{'\n'}
        2. In a pan, heat oil and scramble the eggs.{'\n'}
        3. Add noodles, sprouts, and sauce. Stir well.{'\n'}
        4. Serve with peanuts and lime wedges.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  image: { width: '100%', height: 200, borderRadius: 10, marginBottom: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 4 },
  subheader: { fontSize: 14, color: '#888', marginBottom: 20 },
  section: { fontSize: 18, fontWeight: '600', marginTop: 10, marginBottom: 6 },
    paragraph: { fontSize: 14, lineHeight: 22 },
});

