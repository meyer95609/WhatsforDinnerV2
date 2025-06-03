import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import RecipeScreen from './screens/RecipeScreen';
import DayScreen from './screens/DayScreen';
import TabNavigator from './navigation/TabNavigator'; // ✅ This is your bottom tab nav
import PreferencesScreen from './screens/PreferencesScreen';

<Stack.Navigator>
  <Stack.Screen name="Home" component={HomeScreen} />
  <Stack.Screen name="Preferences" component={PreferencesScreen} />
</Stack.Navigator>


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen name="Recipe" component={RecipeScreen} />
        <Stack.Screen name="Day" component={DayScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
