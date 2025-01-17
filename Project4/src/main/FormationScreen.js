import React from 'react';
import {
  SafeAreaView,StyleSheet,ScrollView,View,Text,StatusBar,FlatList,Image,TouchableOpacity,Dimensions,Alert, ImageBackground
} from 'react-native';

import ChoreoItem from '../components/ChoreoItem';
import Draggable from '../components/Draggable';
import { TextInput } from 'react-native-gesture-handler';
// import Position from '../components/Position';
import Musicbar from '../components/Musicbar';
import {COLORS} from '../values/Colors';
import { useBackButton } from '@react-navigation/native';

const {width,height} = Dimensions.get('window')

class FormationScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      positionList: this.props.route.params.positionList,
      time: this.props.route.params.time,
      animationPlayToggle: false,
      music: this.props.route.params.music,
    }
    
    this.pos = {x: 0, y: 0};
    this.TAG = "FormationScreen/";
  }

  _addPosition(index, _x, _y) {
    console.log(this.TAG + "_addPosition");

    var prevPositionList = [...this.state.positionList];
    var prevPosition_i = [...this.state.positionList[index]];
    const curTime = Math.round(this.state.time * 10) / 10;
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

  deleteDraggable = () => {
    const index = this.state.positionList.length-1;
    if(index < 0){
      return;
    }
    var prevPositionList = [...this.state.positionList];
    prevPositionList.splice(index, 1);

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
        <View style={{position: 'absolute'}}>
          <Draggable 
          number={i+1} 
          position={this.state.positionList[i]} 
          onSearchSubmit={this.onSearchSubmit} 
          curTime={this.state.time} 
          toggle={this.state.animationPlayToggle}
          elevation={100}/>
        </View>
      )
    }

    console.log(this.TAG + "current time2: " + this.state.time + "\n\n");

    return (
      <ImageBackground source={require('../../assets/drawable/background_formation.png')}
      style={{width: '100%', height: '100%', backgroundColor: COLORS.blackLight, alignItems: 'center', justifyContent: 'center'}}>
        {draggables}
        <View style={styles.rowContainer}>
          <Musicbar onSearchSubmit={this.onSearchSubmitInMusicbar} playAnimation={this.playAnimation} time={this.state.time} musicTitle={this.state.music}/>
          <View style={styles.columnContainer}>
            <View style={styles.rowContainer}>
              <Text style={{color: COLORS.white, flex: 1, marginVertical: 10}}>{Math.round(this.state.time * 10) / 10}: {this.pos.x}, {this.pos.y}</Text>
              <TouchableOpacity onPress={this.addDraggable}>
                <Image source={require('../../assets/drawable/btn_adddancer.png')} style={styles.button}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.deleteDraggable}>
                <Image source={require('../../assets/drawable/btn_deletedancer.png')} style={styles.button}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => 
                // this.props.route.params.updatePositionList(this.state.positionList);
                this.props.navigation.navigate('choreo', {time: this.state.time, positionList: this.state.positionList})}>
                <Image source={require('../../assets/drawable/btn_complete.png')} style={styles.button}/>
              </TouchableOpacity>
            </View>

            <FlatList
            data={this.state.positionList}
            renderItem={(item) => {
              return(
                <View>

                </View>
              )
            }}
            keyExtractor={(item, index) => index.toString()}/>
          </View>
        </View>
      </ImageBackground>
    );
  }
};

const styles = StyleSheet.create({
  columnContainer : {
    flexDirection:'column',
    flex: 1,
  },
  rowContainer : {
    flexDirection:'row',
    flex: 1,
    justifyContent:'space-between', 
    alignItems: 'flex-start'
  },
  // formationScreen: {
  //   flex: 1,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  button: {
    width: 50,
    height: 50,
    marginTop: 10,
    marginRight: 10,
  }
});

export default FormationScreen;