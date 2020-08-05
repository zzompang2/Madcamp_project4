import React from 'react';
import {
  SafeAreaView,StyleSheet,ScrollView,View,Text,StatusBar,FlatList,Image,TouchableOpacity
} from 'react-native';

import ChoreoItem from '../components/ChoreoItem';
import Draggable from '../components/Draggable';
import { TextInput } from 'react-native-gesture-handler';
// import Position from '../components/Position';
import Musicbar from '../components/Musicbar';
import {COLORS} from '../values/Colors';
import { useBackButton } from '@react-navigation/native';

class FormationScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      positionList: this.props.route.params.positionList,
      time: this.props.route.params.time,
      animationPlayToggle: false,
    }
    this.pos = {x: 0, y: 0};
    this.TAG = "FormationScreen/";
  }

  _addPosition(index, _x, _y) {
    console.log(this.TAG + "_addPosition");

    var prevPositionList = [...this.state.positionList];
    var prevPosition_i = [...this.state.positionList[index]];
    const curTime = Math.round(this.state.time);
    const newPosition = {posx: _x, posy: _y, time: curTime};

    var i = 0;
    var isSame = 0;
    for(i=0; i<prevPosition_i.length; i++){
      if(curTime <= prevPosition_i[i].time){
        // 같은 시간에 다른 값이 있으면 대체
        if(curTime == prevPosition_i[i].time){
          isSame = 1;
        }
        break;
      }
    }
    prevPosition_i.splice(i, isSame, newPosition);
    prevPositionList.splice(index, 1, prevPosition_i);
    this.setState({ positionList: prevPositionList });
  }

  // 자식 컴포넌트(Draggable)에서 값 받아오기
  onSearchSubmit = (index, _x, _y) => {
    console.log(this.TAG + "onSearchSubmit");

    console.log(this.TAG + "놓은 위치: " + Math.round(_x) + ", " + Math.round(_y));
    this.pos = {x: _x, y: _y};
    this._addPosition(index, _x, _y);
    //this.setState({pos: {x: Math.round(_x), y: Math.round(_y)}});
  }

  // 자식 컴포넌트(Musicbar)에서 값 받아오기
  onSearchSubmitInMusicbar = (_time) => {
    console.log("get submit in musicbar: " + _time);
    this.setState({time: _time});
  }

  playAnimation = (isPlay) => {
    console.log(this.TAG + "playAnimation: " + isPlay);
    this.setState({animationPlayToggle: isPlay});
  }

  addDraggable = () => {
    const index = this.state.positionList.length;
    var prevPositionList = [...this.state.positionList];
    const newPosition = [{posx: 0, posy: 0, time: 0}];

    prevPositionList.splice(index, 0, newPosition);

    this.setState(
      {
        positionList: prevPositionList,
      }
    );
  }

  render() {
    console.log(this.TAG + "render");
    
    var draggables = [];
    for(var i=0; i<this.state.positionList.length; i++){
      draggables.push(
        <View style={{position: 'absolute', alignItems: 'center'}}>
          <Draggable 
          number={i+1} 
          position={this.state.positionList[i]} 
          onSearchSubmit={this.onSearchSubmit} 
          curTime={this.state.time} 
          toggle={this.state.animationPlayToggle}
          elevation={1}/>
        </View>
      )
    }

    console.log(this.TAG + "current time2: " + this.state.time + "\n\n");

    return (
      <View style={styles.rowContainer}>
        <Musicbar onSearchSubmit={this.onSearchSubmitInMusicbar} playAnimation={this.playAnimation} time={this.state.time}/>
        <View style={styles.columnContainer}>
          <View style={styles.formationScreen}>
            <Image source={require('../../assets/drawable/background_formation.png')}
            style={{resizeMode: 'repeat'}}></Image>
            {draggables}
          </View>
          <View style={{flexDirection:'row', justifyContent:'space-between', alignItems: 'baseline'}}>
            <Text style={{color: COLORS.white, flex: 1}}>{Math.round(this.state.time)}: {this.pos.x}, {this.pos.y}</Text>
            <TouchableOpacity onPress={this.addDraggable}>
              <Image source={require('../../assets/drawable/btn_adddancer.png')} style={styles.button}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('choreo', {time: this.state.time, positionList: this.state.positionList})}>
              <Image source={require('../../assets/drawable/btn_complete.png')} style={styles.button}/>
            </TouchableOpacity>
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
    backgroundColor: COLORS.blackLight,
  },
  rowContainer : {
    flexDirection:'row',
    flex: 1,
  },
  formationScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 50,
    height: 50,
    marginBottom: 15,
    marginRight: 15,
  }
});

export default FormationScreen;