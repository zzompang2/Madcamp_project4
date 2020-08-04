import React from 'react';
import MainScreen from './MainScreen'
import ChoreoScreen from './ChoreoScreen'
import FormationScreen from './FormationScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {COLORS} from '../values/colors';

const Stack = createStackNavigator();

//const Tab = createBottomTabNavigator();
// export default function App() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator>
//         <Tab.Screen name="전체" component={MainScreen} />
//         <Tab.Screen name="동선짜기" component={FormationScreen} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.blackDark },
        headerTintColor: COLORS.yellow,
        headerTitleAlign: 'center',
      }}>
        <Stack.Screen name="choreo note" component={MainScreen}/>
        <Stack.Screen name="undefined" component={ChoreoScreen} />
        <Stack.Screen name="formation" component={FormationScreen} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}