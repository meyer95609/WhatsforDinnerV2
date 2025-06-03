import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const allergiesList = ['Peanuts', 'Dairy', 'Gluten', 'Shellfish', 'Eggs', 'Soy'];
const nutritionGoals = ['High Protein', 'Low Carb', 'Balanced', 'Vegan', 'Keto'];
const cuisines = ['Mexican', 'Italian', 'Mediterranean', 'American', 'Asian', 'Indian'];
const costOptions = ['Budget ($)', 'Moderate ($$)', 'Premium ($$$)'];
const timeOptions = ['<15 min', '<30 min', '30–60 min', 'Slow cook'];
const daysOfWeek = ['M', 'T', 'W', 'Th', 'F', 'Sa', 'Su'];

export default function PreferencesScreen() {
  const [selectedAllergies, setSelectedAllergies] = useState([]);
  const [selectedNutrition, setSelectedNutrition] = useState('');
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [selectedCost, setSelectedCost] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [numPeople, setNumPeople] = useState(2);
  const [selectedDays, setSelectedDays] = useState([...daysOfWeek]);

  const toggleItem = (list, setList, item) => {
    setList((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const renderPills = (options, selected, setSelected, multi = false) =>
    options.map((item) => {
      const isSelected = multi
        ? selected.includes(item)
        : selected === item;
      return (
        <TouchableOpacity
          key={item}
          style={[styles.pill, isSelected && styles.selectedPill]}
          onPress={() =>
            multi
              ? toggleItem(selected, setSelected, item)
              : setSelected(item)
          }
        >
          <Text style={[styles.pillText, isSelected && styles.selectedPillText]}>
            {item}
          </Text>
        </TouchableOpacity>
      );
    });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.section}>Allergies</Text>
      <View style={styles.pillRow}>
        {renderPills(allergiesList, selectedAllergies, setSelectedAllergies, true)}
      </View>

      <Text style={styles.section}>Nutrition Goals (optional)</Text>
      <View style={styles.pillRow}>
        {renderPills(nutritionGoals, selectedNutrition, setSelectedNutrition)}
      </View>

      <Text style={styles.section}>Preferred Cuisines</Text>
      <View style={styles.pillRow}>
        {renderPills(cuisines, selectedCuisines, setSelectedCuisines, true)}
      </View>

      <Text style={styles.section}>Cost Preference</Text>
      <View style={styles.pillRow}>
        {renderPills(costOptions, selectedCost, setSelectedCost)}
      </View>

      <Text style={styles.section}>Time to Cook</Text>
      <View style={styles.pillRow}>
        {renderPills(timeOptions, selectedTime, setSelectedTime)}
      </View>

      <Text style={styles.section}>Number of People</Text>
      <View style={styles.pillRow}>
        {renderPills(['1', '2', '3', '4', '5+'], numPeople.toString(), (val) => setNumPeople(parseInt(val)))}
      </View>

      <Text style={styles.section}>Meals Per Day</Text>
      <View style={styles.pillRow}>
        {renderPills(daysOfWeek, selectedDays, setSelectedDays, true)}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  section: { fontSize: 18, fontWeight: 'bold', marginBottom: 6, marginTop: 18 },
  pillRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  pill: {
    backgroundColor: '#eee',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedPill: { backgroundColor: '#000' },
  pillText: { color: '#333', fontSize: 14 },
  selectedPillText: { color: '#fff' },
});
