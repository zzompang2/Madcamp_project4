import React from 'react';
import {
  SafeAreaView,StyleSheet,ScrollView,View,Text,StatusBar,FlatList,Image
} from 'react-native';

import ChoreoItem from '../components/ChoreoItem';
import Draggable from '../components/Draggable';
// import Position from '../components/Position';

class FormationScreen extends React.Component {

  state = {
    position1: [
      {posx: 0, posy:0, duration: 0},
    ]
  }

  render() {
    console.log("ham");
    return (
      <View>
        <Draggable number='1' posx='200' posy='100' duration='2000'/>
      </View>
    );
  }
};

export default FormationScreen;