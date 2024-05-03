import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Puissance4 from './src/Components/Puissance4';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Game" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Game" component={Puissance4} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
