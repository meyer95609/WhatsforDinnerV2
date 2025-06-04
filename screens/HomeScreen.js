import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../lib/supabase';

const SUPABASE_FUNCTION_URL = 'https://occqboivivsxdqgrfkgt.functions.supabase.co/generate-meal-plan';

async function generateMealPlanFromAI(prompt) {
  try {
    const response = await fetch(SUPABASE_FUNCTION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }), // you can rename this based on what your function expects
    });

    if (!response.ok) {
      throw new Error('Failed to generate meal plan');
    }

    const data = await response.json();
    return data; // Expecting a meal plan array
  } catch (error) {
    console.error('Error generating meal plan:', error);
    return [];
  }
}

const localImages = [
  require('../assets/padthai.jpg'),
  require('../assets/fishtaco.jpg'),
  require('../assets/default.jpg'),
];

const mockMealPlan = [
  {
    day: 'Monday',
    title: 'Grilled Chicken Bowl',
    cookTime: '30 min',
    ingredients: ['Chicken breast', 'Quinoa', 'Spinach', 'Avocado'],
    instructions: 'Grill chicken, cook quinoa, and combine with spinach and avocado.',
    image: require('../assets/default.jpg'),
  },
  {
    day: 'Tuesday',
    title: 'Spaghetti Bolognese',
    cookTime: '40 min',
    ingredients: ['Spaghetti', 'Ground beef', 'Tomato sauce'],
    instructions: 'Cook pasta, brown beef, add sauce, and simmer.',
    image: require('../assets/default.jpg'),
  },
  {
    day: 'Wednesday',
    title: 'Veggie Stir Fry',
    cookTime: '25 min',
    ingredients: ['Broccoli', 'Carrots', 'Bell pepper', 'Soy sauce'],
    instructions: 'Stir fry all veggies, add sauce, and serve with rice.',
    image: require('../assets/default.jpg'),
  },
  {
    day: 'Thursday',
    title: 'Salmon Tacos',
    cookTime: '30 min',
    ingredients: ['Salmon', 'Tortillas', 'Cabbage slaw', 'Lime'],
    instructions: 'Cook salmon, assemble tacos with slaw, and squeeze lime on top.',
    image: require('../assets/default.jpg'),
  },
  {
    day: 'Friday',
    title: 'Shrimp Pad Thai',
    cookTime: '35 min',
    ingredients: ['Rice noodles', 'Shrimp', 'Eggs', 'Peanuts', 'Tamarind sauce'],
    instructions: 'Sauté shrimp, scramble eggs, stir fry noodles and sauce together.',
    image: require('../assets/default.jpg'),
  },
  {
    day: 'Saturday',
    title: 'Chickpea Curry',
    cookTime: '45 min',
    ingredients: ['Chickpeas', 'Tomatoes', 'Coconut milk', 'Curry powder'],
    instructions: 'Simmer all ingredients until thick. Serve with rice or naan.',
    image: require('../assets/default.jpg'),
  },
  {
    day: 'Sunday',
    title: 'Stuffed Bell Peppers',
    cookTime: '50 min',
    ingredients: ['Bell peppers', 'Ground turkey', 'Rice', 'Cheese'],
    instructions: 'Stuff peppers and bake until golden brown.',
    image: require('../assets/default.jpg'),
  },
];

export default function HomeScreen() {
  const [mealPlan, setMealPlan] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [aiModalVisible, setAiModalVisible] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const navigation = useNavigation();

const generateMealPlan = async () => {
  try {
    const response = await fetch('https://occqboivivsxdqgrfkgt.supabase.co/functions/v1/generate-meal-plan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        preferences: {
          allergies: ['Peanuts'],
          cuisine: ['Mexican', 'Mediterranean'],
          people: 2,
          mealsPerDay: 1,
        },
      }),
    });

    const data = await response.json();
    setMealPlan(data.meals);
    setAiModalVisible(false);
  } catch (error) {
    console.error('Error generating meal plan:', error);
  }
};

const generateMealPlan = async () => {
  try {
    const meals = await generateMealPlanFromAI(aiPrompt); // now uses the input!
    setMealPlan(meals);
    setAiModalVisible(false);
  } catch (error) {
    console.error('AI Meal Plan Error:', error);
  }
};

  const openMealModal = (meal) => {
    setSelectedMeal(meal);
    setModalVisible(true);
  };

  const closeMealModal = () => {
    setModalVisible(false);
    setSelectedMeal(null);
  };

  const renderMealCard = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => openMealModal(item)}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.cookTime}>{item.cookTime}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.askAiBar} onPress={() => setAiModalVisible(true)}>
        <Ionicons name="sparkles" size={20} color="black" />
        <Text style={styles.askAiText}>Ask AI to Plan My Week</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.preferencesLink} onPress={() => navigation.navigate('PreferencesScreen')}>
        <Ionicons name="settings-outline" size={16} color="#0077b6" />
        <Text style={styles.preferencesText}>Edit Weekly Preferences</Text>
      </TouchableOpacity>

      <Text style={styles.header}>This Week's Dinners</Text>
      <FlatList
        horizontal
        data={mealPlan.length > 0 ? mealPlan : dummyMeals}
        keyExtractor={(item) => item.title}
        renderItem={renderMealCard}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cardList}
      />

      {/* Meal Detail Modal */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={closeMealModal} style={styles.closeButton}>
            <Ionicons name="close" size={30} color="black" />
          </TouchableOpacity>
          {selectedMeal && (
            <>
              <Image source={selectedMeal.image} style={styles.modalImage} />
              <Text style={styles.modalTitle}>{selectedMeal.title}</Text>
              <Text style={styles.modalText}>Time to cook: {selectedMeal.cookTime}</Text>
              <Text style={styles.modalText}>Ingredients and instructions will go here...</Text>
            </>
          )}
        </View>
      </Modal>

      {/* Ask AI Modal */}
      <Modal visible={aiModalVisible} animationType="slide" transparent>
        <View style={styles.aiModalOverlay}>
          <View style={styles.aiModalContainer}>
            <Text style={styles.modalTitle}>Ask AI to Plan Your Week</Text>
            <TextInput
  placeholder="e.g., High protein, Mexican, 2 people..."
  style={styles.aiInput}
  value={aiPrompt}
  onChangeText={setAiPrompt}
/>
<TouchableOpacity
  style={styles.aiButton}
  onPress={generateMealPlan}
>
  <Text style={styles.aiButtonText}>Generate</Text>
</TouchableOpacity>

          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 10,
  },
  askAiBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 12,
    marginHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  askAiText: {
    fontSize: 16,
    marginLeft: 8,
  },
  preferencesLink: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginBottom: 10,
  },
  preferencesText: {
    fontSize: 14,
    color: '#0077b6',
    marginLeft: 6,
  },
  cardList: {
    paddingLeft: 10,
  },
  card: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    marginRight: 10,
    padding: 10,
    alignItems: 'center',
    width: 160,
    height: 200,
    justifyContent: 'center',
  },
  image: {
    width: 140,
    height: 100,
    borderRadius: 10,
  },
  title: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  cookTime: {
    fontSize: 14,
    color: '#555',
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  modalImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  aiModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  aiModalContainer: {
    width: '85%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  aiInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
  },
  aiButton: {
    backgroundColor: '#0077b6',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  aiButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
