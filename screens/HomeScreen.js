import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../lib/supabase';

// Dummy local images
const localImages = [
  require('../assets/padthai.jpg'),
  require('../assets/fishtaco.jpg'),
  require('../assets/default.jpg'),
];

export default function HomeScreen({ navigation }) {
  const [recipes, setRecipes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    async function fetchFilteredRecipes() {
      let query = supabase.from('recipes_enriched').select('*').limit(100);
      const { data, error } = await query;

      if (error) {
        console.error('❌ Supabase error:', error);
      } else {
        console.log('✅ Fetched recipes:', data);
        setRecipes(data);
      }
    }

    fetchFilteredRecipes();
  }, []);

  const generatedMeals = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    .map((day, index) => {
      const recipe = recipes[index];
      return recipe ? {
        day,
        title: recipe.title,
        image: localImages[index % localImages.length],
      } : null;
    })
    .filter(Boolean);

  const renderMealCard = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Day', { day: item.day, mealTitle: item.title })}>
      <View style={styles.card}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDay}>{item.day}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>AI meal planning coming soon!</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalClose}>
              <Text style={styles.modalCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Top Icons */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Preferences')}>
          <Ionicons name="settings-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="star" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="time" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Ask AI */}
      <View style={styles.askAIContainer}>
        <TouchableOpacity style={styles.askAIButton} onPress={() => setModalVisible(true)}>
          <Ionicons name="sparkles" size={20} color="#fff" style={{ marginRight: 6 }} />
          <Text style={styles.askAIText}>Ask AI to Plan My Week</Text>
        </TouchableOpacity>
      </View>

      {/* Meal Planner */}
      <Text style={styles.sectionTitle}>Meal Planner</Text>
      <FlatList
        data={generatedMeals}
        renderItem={renderMealCard}
        keyExtractor={(item) => item.day}
        horizontal
        contentContainerStyle={styles.list}
        showsHorizontalScrollIndicator={false}
      />

      {/* Supabase Recipes */}
      <Text style={styles.sectionTitle}>Recipes from Supabase</Text>
      {recipes.length > 0 ? (
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.id?.toString() || item['Unnamed: 0']?.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.name}>{item.title}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={[styles.connectionStatus, { color: 'red' }]}>⚠️ No recipes found yet</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 60 },
  topBar: { flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: 16, marginBottom: 8, gap: 16 },
  iconButton: { paddingHorizontal: 4 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', paddingHorizontal: 16, marginBottom: 8 },
  list: { paddingHorizontal: 16 },
  card: { backgroundColor: '#f2f2f2', borderRadius: 8, overflow: 'hidden', width: 160, height: 180, marginRight: 12 },
  image: { width: '100%', height: 100 },
  cardTitle: { paddingHorizontal: 8, paddingTop: 6, fontWeight: '600', fontSize: 14 },
  cardDay: { paddingHorizontal: 8, paddingBottom: 10, fontSize: 12, color: '#777' },
  askAIContainer: { paddingHorizontal: 16, marginBottom: 16 },
  askAIButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#000', borderRadius: 12, paddingVertical: 10, paddingHorizontal: 16 },
  askAIText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.4)' },
  modalContent: { width: '80%', backgroundColor: '#fff', borderRadius: 12, padding: 20, alignItems: 'center' },
  modalText: { fontSize: 16, marginBottom: 12, textAlign: 'center' },
  modalClose: { backgroundColor: '#000', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 },
  modalCloseText: { color: '#fff', fontWeight: 'bold' },
  item: { marginBottom: 12, padding: 10, backgroundColor: '#f0f0f0', borderRadius: 8, marginHorizontal: 16 },
  name: { fontSize: 16 },
  connectionStatus: { fontSize: 16, marginBottom: 10, paddingHorizontal: 16 },
});
