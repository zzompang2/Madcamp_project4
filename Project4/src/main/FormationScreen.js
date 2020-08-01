import React from 'react';
import {
  SafeAreaView,StyleSheet,ScrollView,View,Text,StatusBar,FlatList,Image
} from 'react-native';

import ChoreoItem from '../components/ChoreoItem';
import Draggable from '../components/Draggable';
import { TextInput } from 'react-native-gesture-handler';
// import Position from '../components/Position';

class FormationScreen extends React.Component {
  state = {
    position1: [
      {posx: 0, posy:200, time: 1},
      {posx: 100, posy:0, time: 2000},
      {posx: 200, posy:100, time: 6000},
      {posx: 400, posy:200, time: 8000},
    ]
  }

  _addPosition = () => {
    var prevPositionList = [...this.state.position1];
    const newPosition = {posx: 100, posy:100, time: 4000};
    prevPositionList.splice(2, 0, newPosition);

    this.setState({
      position1: prevPositionList
    });
  }

  render() {
    return (
      <View style={styles.columnContainer}>
        <View>
          <Draggable number='1' position={this.state.position1}/>
        </View>
        <View>
          <TextInput
          placeholder="pos x"
          onEndEditing={this._addPosition}/>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  columnContainer : {
    flexDirection:'column',
    flex: 1,
    //justifyContent: 'space-between'
  },
  playerBar: {
    height: '100%', 
    width: 50, 
    justifyContent: 'center', 
    alignItems: 'center',
    resizeMode: 'contain'

  },
});

export default FormationScreen;