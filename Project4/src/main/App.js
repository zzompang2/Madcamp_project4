import React from 'react';
import MainScreen from './MainScreen'
import ChoreoScreen from './ChoreoScreen'
import FormationScreen from './FormationScreen';
import LyricsScreen from './LyricsScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import firebase from '@react-native-firebase/app';

import {COLORS} from '../values/Colors';
import { FONTS } from '../values/Fonts';

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
        //headerStyle: { backgroundColor: COLORS.blackDark, height: 40},
        //headerTintColor: COLORS.purpleLight,
        //headerTitleAlign: 'left',
        headerShown: false,
      }}>
        <Stack.Screen name="choreo note" component={MainScreen}/>
        <Stack.Screen name="choreo" component={ChoreoScreen} />
        <Stack.Screen name="formation" component={FormationScreen} />
        <Stack.Screen name="lyrics" component={LyricsScreen} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}