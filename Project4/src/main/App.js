import React from 'react';
import MainScreen from './MainScreen'
import FormationScreen from './FormationScreen'

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="전체" component={MainScreen} />
        <Tab.Screen name="동선짜기" component={FormationScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}