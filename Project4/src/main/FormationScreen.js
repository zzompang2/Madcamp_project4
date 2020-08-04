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
        {posx: 50, posy:0, time: 0},
        {posx: 50, posy:50, time: 4},
        {posx: 100, posy:50, time: 8},
        {posx: 100, posy:100, time: 10},
        {posx: 150, posy:100, time: 12},
        {posx: 150, posy:150, time: 15},
      ],
      time: 0,
      animationPlayToggle: false,
    }
    this.pos = {x: 0, y: 0};
    this.TAG = "FormationScreen/";
  }

  _addPosition(_x, _y) {
    console.log(this.TAG + "_addPosition");

    var prevPositionList = [...this.state.position1];
    const curTime = Math.round(this.state.time);
    const newPosition = {posx: _x, posy: _y, time: curTime};

    var index = 0;
    var isSame = 0;
    for(index=0; index<prevPositionList.length; index++){
      if(curTime <= prevPositionList[index].time){
        // 같은 시간에 다른 값이 있으면 대체
        if(curTime == prevPositionList[index].time){
          isSame = 1;
        }
        break;
      }
    }
    prevPositionList.splice(index, isSame, newPosition);
    this.setState({ position1: prevPositionList });
  }

  // 자식 컴포넌트(Draggable)에서 값 받아오기
  onSearchSubmit = (_x, _y) => {
    console.log(this.TAG + "onSearchSubmit");

    console.log(this.TAG + "놓은 위치: " + Math.round(_x) + ", " + Math.round(_y));
    this.pos = {x: _x, y: _y};
    this._addPosition(_x, _y);
    //this.setState({pos: {x: Math.round(_x), y: Math.round(_y)}});
  }

  // 자식 컴포넌트(Musicbar)에서 값 받아오기
  onSearchSubmitInMusicbar = (_time) => {
    console.log("get submit in musicbar: " + _time);
    this.setState({time: Math.round(_time)});
  }

  playAnimation = (isPlay) => {
    console.log(this.TAG + "playAnimation: " + isPlay);
    this.setState({animationPlayToggle: isPlay});
  }

  render() {
    console.log(this.TAG + "render");
    return (
      <View style={styles.columnContainer}>
        <View style={styles.rowContainer}>
          <Musicbar onSearchSubmit={this.onSearchSubmitInMusicbar} playAnimation={this.playAnimation}/>
          <View style={styles.formationScreen}>
            <Draggable 
            number='1' 
            position={this.state.position1} 
            onSearchSubmit={this.onSearchSubmit} 
            curTime={this.state.time} 
            toggle={this.state.animationPlayToggle}/>
          </View>

          <FlatList
          style={{backgroundColor: 'yellow', width: 80, flex: 1}}
          data={this.state.position1}
          renderItem={({item}) => {
            return (
              <Text style={{width:80, color:'black', fontSize:10, backgroundColor:'white'}}>{item.time}: {Math.round(item.posx)}, {Math.round(item.posy)}</Text>
            )
          }}
          keyExtractor={(item, index) => index.toString()}/>
        </View>
        <View style={{flexDirection:'row', backgroundColor: 'gray', justifyContent:'space-between'}}>
          <Text>{Math.round(this.state.time)}: {this.pos.x}, {this.pos.y}</Text>
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
    flex: 6,
  }
});

export default FormationScreen;