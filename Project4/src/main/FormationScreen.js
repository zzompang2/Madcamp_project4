import React from 'react';
import {
  SafeAreaView,StyleSheet,ScrollView,View,Text,StatusBar,FlatList,Image
} from 'react-native';

import ChoreoItem from '../components/ChoreoItem';
import Draggable from '../components/Draggable';

class FormationScreen extends React.Component {
  render() {
    console.log("ham");
    return (
      <View>
        <Draggable/>
      </View>
    );
  }
};

export default FormationScreen;