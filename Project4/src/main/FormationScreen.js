import React from 'react';
import {
  SafeAreaView,StyleSheet,ScrollView,View,Text,StatusBar,FlatList,Image
} from 'react-native';

import ChoreoItem from '../components/ChoreoItem';
import Draggable from '../components/Draggable';
import { TextInput } from 'react-native-gesture-handler';
// import Position from '../components/Position';
import Musicbar from '../components/Musicbar';

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

  // 자식 컴포넌트에서 값 받아오기
  onSearchSubmit(x, y) {
    console.log("get submit: " + x + ", " + y);
  }

  render() {
    return (
      <View style={styles.columnContainer}>
        <View style={styles.rowContainer}>
          <Musicbar/>
          <View style={styles.formationScreen}>
            <Draggable number='1' position={this.state.position1} onSearchSubmit={this.onSearchSubmit}/>
          </View>
          <View>
            <TextInput
            placeholder="pos x"
            onEndEditing={this._addPosition}/>
          </View>
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
  rowContainer : {
    flexDirection:'row',
    flex: 1,
    backgroundColor: 'gray',
    //justifyContent: 'space-between'
  },
  formationScreen: {
    backgroundColor: 'pink',
    flex: 1,
  }
});

export default FormationScreen;