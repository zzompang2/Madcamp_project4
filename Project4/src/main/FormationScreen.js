import React from 'react';
import {
  SafeAreaView,StyleSheet,ScrollView,View,Text,StatusBar,FlatList,Image,TouchableOpacity
} from 'react-native';

import ChoreoItem from '../components/ChoreoItem';
import Draggable from '../components/Draggable';
import { TextInput } from 'react-native-gesture-handler';
// import Position from '../components/Position';
import Musicbar from '../components/Musicbar';

class FormationScreen extends React.Component {
  constructor(){
    super();
    this.state = {
      position1: [
        {posx: 0, posy:200, time: 0.001},
        {posx: 100, posy:0, time: 2},
        {posx: 200, posy:100, time: 6},
        {posx: 400, posy:200, time: 8},
      ],
    }
    this.pos = {x: 0, y: 0};
    this.time = 0;
  }

  _addPosition = () => {
    var prevPositionList = [...this.state.position1];
    const newPosition = {posx: 100, posy:100, time: this.time};
    prevPositionList.splice(2, 0, newPosition);

    this.setState({ position1: prevPositionList });
  }

  // 자식 컴포넌트(Draggable)에서 값 받아오기
  onSearchSubmit = (_x, _y) => {
    console.log("get submit in draggable: " + Math.round(_x) + ", " + Math.round(_y));
    this.pos = {x: Math.round(_x), y: Math.round(_y)};
    console.log("pos: " + this.pos);
  }

  // 자식 컴포넌트(Musicbar)에서 값 받아오기
  onSearchSubmitInMusicbar = (_time) => {
    console.log("get submit in musicbar: " + _time);
    this.time = _time;
  }

  render() {
    return (
      <View style={styles.columnContainer}>
        <View style={styles.rowContainer}>
          <Musicbar onSearchSubmit={this.onSearchSubmitInMusicbar}/>
          <View style={styles.formationScreen}>
            <Draggable number='1' position={this.state.position1} onSearchSubmit={this.onSearchSubmit}/>
          </View>
          <TouchableOpacity onPress={this._addPosition}>
            <Text>add</Text>
          </TouchableOpacity>
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