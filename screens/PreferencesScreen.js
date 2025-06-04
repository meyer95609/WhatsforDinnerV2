import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const daysOfWeek = ['M', 'T', 'W', 'Th', 'F', 'S', 'Su'];

const allergiesList = [
  'Dairy', 'Eggs', 'Gluten', 'Peanuts', 'Shellfish',
  'Soy', 'Tree Nuts', 'Fish', 'Sesame',
];

const nutritionGoals = [
  'High Protein', 'Low Carb', 'Low Fat', 'Balanced',
  'Heart-Healthy', 'Low Sodium', 'Weight Loss', 'Muscle Gain',
];

const cuisines = [
  'Mexican', 'Italian', 'Mediterranean', 'American',
  'Asian', 'Indian', 'Thai', 'Japanese', 'Chinese', 'Middle Eastern',
];

const householdSizes = ['1', '2', '3–4', '5+'];

export default function PreferencesScreen() {
  const [selectedDays, setSelectedDays] = useState([...daysOfWeek]);
  const [selectedAllergies, setSelectedAllergies] = useState([]);
  const [selectedNutrition, setSelectedNutrition] = useState('');
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [householdSize, setHouseholdSize] = useState('');


  const toggleSelection = (item, list, setList) => {
    setList(list.includes(item)
      ? list.filter(i => i !== item)
      : [...list, item]
    );
  };

  const renderOptions = (options, selected, setSelected, multi = true) => (
    <View style={styles.optionGroup}>
      {options.map((item) => (
        <TouchableOpacity
          key={item}
          style={[styles.option, selected.includes(item) && styles.selected]}
          onPress={() => multi
            ? toggleSelection(item, selected, setSelected)
            : setSelected(item === selected ? '' : item)}
        >
          <Text style={styles.optionText}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
           <Text style={styles.header}>Meals Per Day (Select Days)</Text>
      {renderOptions(daysOfWeek, selectedDays, setSelectedDays)}
     
      <Text style={styles.header}>Household Size</Text>
      {renderOptions(householdSizes, [householdSize], setHouseholdSize, false)}

      <Text style={styles.header}>Allergies</Text>
      {renderOptions(allergiesList, selectedAllergies, setSelectedAllergies)}

      <Text style={styles.header}>Preferred Cuisines</Text>
      {renderOptions(cuisines, selectedCuisines, setSelectedCuisines)}

      <Text style={styles.header}>Nutrition Goals (optional)</Text>
      {renderOptions(nutritionGoals, [selectedNutrition], setSelectedNutrition, false)}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  optionGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  option: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 5,
    backgroundColor: '#f0f0f0',
  },
  selected: {
    backgroundColor: '#add8e6',
    borderColor: '#0077b6',
  },
  optionText: {
    fontSize: 16,
  },
});
