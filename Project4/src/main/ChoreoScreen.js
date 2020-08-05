import React from 'react';
import {
  SafeAreaView, StyleSheet, View, FlatList, TouchableOpacity,
} from 'react-native';

import ChoreoItem from '../components/ChoreoItem';
import Musicbar from '../components/Musicbar';
import {COLORS} from '../values/Colors';

export default class ChoreoScreen extends React.Component {
  constructor(props){
    console.log("ChoreoScreen/constructor");
    super(props);
    this.state = {
      choreoNote: [{
        lyrics: "사람들이 움직이는 게 ", 
        choreo: ["업락", "다운락", "다운락", "다운락", "다운락", "다운락"],
        time: 0,
      }, {
        lyrics: "신기해", 
        choreo: ["스쿠바", "스쿠바2"],
        time: 10,
      },{
        lyrics: "팔다리가 앞뒤로 막 움 움 움 움직이는 게", 
        choreo: ["스쿠비두"],
        time: 20,
      }],
      time: 0,
    }
    this.positionList = [
      [
        {posx: 0, posy:0, time: 0},
        {posx: 100, posy:0, time: 10},
        {posx: 100, posy:100, time: 20},
      ],
      [
        {posx: 100, posy:0, time: 0},
        {posx: 0, posy:-50, time: 5},
        {posx: -70, posy:50, time: 30},
      ],
      [
        {posx: 65, posy:-90, time: 0},
        {posx: 5, posy:60, time: 10},
        {posx: 9, posy:-89, time: 20},
      ],
    ];
    this.TAG = 'ChoreoScreen/';
  }

  getCurPosition(positionList, time) {
    // dancer 수만큼 반복.
    var curPositionList = [];
    for(var i=0; i<positionList.length; i++){
      // 시간을 비교하며 현재 time에 어느 위치인지 찾기
      for(var j=0; j<positionList[i].length; j++){
        if(time < positionList[i][j].time) break;
      }

      if(j == positionList[i].length){
        curPositionList.push({posx: positionList[i][j-1].posx, posy: positionList[i][j-1].posy});
      }
      else {
        const curX = positionList[i][j-1].posx 
                    + (positionList[i][j].posx - positionList[i][j-1].posx) 
                    * (time - positionList[i][j-1].time) 
                    / (positionList[i][j].time - positionList[i][j-1].time);
        const curY = positionList[i][j-1].posy 
                    + (positionList[i][j].posy - positionList[i][j-1].posy) 
                    * (time - positionList[i][j-1].time) 
                    / (positionList[i][j].time - positionList[i][j-1].time);
        curPositionList.push({posx: curX, posy: curY});
      }
    }
    return curPositionList;
  }

  _makeChoreoItem = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate('formation', {time: item.time, positionList: this.positionList})}>
        <ChoreoItem
        index={index}
        lyrics={item.lyrics} 
        choreo={item.choreo}
        position={this.getCurPosition(this.positionList, item.time)}/>
      </TouchableOpacity>
    )
  }

  // 자식 컴포넌트(Musicbar)에서 값 받아오기
  onSearchSubmitInMusicbar = (_time) => {
    console.log("get submit in musicbar: " + _time);
    this.setState({time: _time});
  }

  render() {
    console.log(this.TAG + "render");

    // FormationScreen에서 값을 받고 온 거라면 값 대입
    if(this.props.route.params != undefined)
      this.positionList = this.props.route.params.positionList;

    return (
      <View style={styles.rowContainer}>
        <Musicbar onSearchSubmit={this.onSearchSubmitInMusicbar} time={this.state.time}/>
        <FlatList
        data={this.state.choreoNote}
        renderItem={this._makeChoreoItem}
        keyExtractor={item => item.lyrics}/>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  rowContainer : {
    flexDirection:'row',
    flex: 1,
    backgroundColor: COLORS.blackDark,
  },
  playerBar: {
    height: '100%', 
    width: 50, 
    justifyContent: 'center', 
    alignItems: 'center',
    resizeMode: 'contain',
  },
});