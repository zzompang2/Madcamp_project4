import React from 'react';
import {
  SafeAreaView,StyleSheet,ScrollView,View,Text,StatusBar,FlatList,Image
} from 'react-native';

import ChoreoItem from '../components/ChoreoItem';
import Draggable from '../components/Draggable';
import { State } from 'react-native-gesture-handler';
// import Position from '../components/Position';

class FormationScreen extends React.Component {
  state = {
    position1: [
      {posx: 100, posy:0, duration: 2000},
      {posx: 100, posy:100, duration: 2000},
      {posx: 200, posy:100, duration: 2000},
      {posx: 200, posy:200, duration: 2000},
    ]
  }

  render() {
    console.log("ham");
    return (
      <View>
        <Draggable number='1' position={this.state.position1}/>
      </View>
    );
  }
};

export default FormationScreen;