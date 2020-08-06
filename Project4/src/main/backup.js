import React from 'react';
import {
  SafeAreaView, StyleSheet, View, FlatList, TouchableOpacity, Alert, Text,
} from 'react-native';

// firebase
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import ChoreoItem from '../components/ChoreoItem';
import Musicbar from '../components/Musicbar';
import {COLORS} from '../values/Colors';

export default class ChoreoScreen extends React.Component {
  constructor(props){
    console.log("ChoreoScreen/constructor");
    super(props);
    this.state = {
      title: props.route.params.title,
      date: '',
      music: '',
      choreoList: [
        {
          lyrics:'',
          time: 0,
          choreo: [''],
        }],
      time: 0,
      playState: 'paused',
      //positionList: [[{posx: 0, posy: 0, time: 0}]],
    }
    this.positionList = [[{posx: 0, posy: 0, time: 0}],];
    this.TAG = 'ChoreoScreen/';

    console.log("ChoreoScreen/project name: " + this.state.title);
    //this.getNote(this.state.title);
  }

  //performance이름으로 데이타베이스의 정보 받아오기
  // getNote(noteTitle) {
  //   console.log("getNote");
    
  //   const firebaseRef = firestore().collection('ChoreoNote').doc(noteTitle);
  
  //   firebaseRef.get().then(function(doc) {
  //     // console.log("doc: " + doc.data().title);
  //     this.setState({ date: doc.data().date,
  //                     music: doc.data().musicTitle,
  //                     choreoList: doc.data().choreoList});
  //   }.bind(this));

  //   var _positionList=[];
  //   firebaseRef.collection('positionList').get().then(function(positionDoc) {
  //     positionDoc.forEach(function(doc) {
  //       console.log("[position.length]: " + doc.data().position.length);
  //       _positionList.push([...doc.data().position]);
  //     });
  //     //this.positionList = _positionList;
  //     this.setState({positionList: _positionList});
  //     console.log("test: " + this.state.positionList[0]);
  //   }.bind(this));
  // }

  // //데이타베이스에 정보 업로드 하기
  // makeNewProject(projectName) {
  //   // console.log('hh:', this.state.performance, ', kk:', this.state.musictitle, ' ee:', this.state.choreoNote);
  //   firebase.firestore().collection('performance').doc(projectName).set({
  //       performTitle: this.state.performTitle,
  //       musicTitle: this.state.musicTitle,
  //       choreoNote:  this.state.choreoNote,
  //       date: this.state.date
  //     })
    
  //   for (var i = 0; i < this.positionList.length; i++) {
  //     // console.log('ggg : ',this.state.positionList[i]);
  //     firebase.firestore().collection('performance').doc(projectName).collection('positionList').doc(i.toString()).set({
  //         pos: this.positionList[i]
  //     })
  //   }
  // }

  getCurPosition(positionList, time) {
    // dancer 수만큼 반복.
    var curPositionList = [];

    console.log("postionList: " + positionList);

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
    console.log("_makeChoreoItem: " + item.lyrics);
    return (
      <TouchableOpacity onPress={() => {
        if(this.state.playState == 'paused')
          this.props.navigation.navigate('formation', {time: item.time, positionList: this.positionList})
        else
          Alert.alert('Notice', 'Can\'t edit while listening :)');
      }}>
        <ChoreoItem
        index={index}
        lyrics={item.lyrics} 
        choreo={item.choreo}
        position={this.getCurPosition(this.positionList, item.time)}/>
      </TouchableOpacity>
    )
  }

  // 자식 컴포넌트(Musicbar)에서 값 받아오기
  onSearchSubmitInMusicbar = (_time, _playState) => {
    console.log("get submit in musicbar: " + _time);
    this.setState({time: _time, playState: _playState});
  }

  render() {
    console.log(this.TAG + "render");

    // FormationScreen에서 값을 받고 온 거라면 값 대입
    if(this.props.route.params != undefined)
      this.positionList = this.props.route.params.positionList;

    return (
      <View style={styles.rowContainer}>
        <Musicbar onSearchSubmit={this.onSearchSubmitInMusicbar} time={this.state.time}/>
        <View style={{flexDirection: 'column'}}>
          <FlatList
          data={this.state.choreoList}
          renderItem={this._makeChoreoItem}
          keyExtractor={(item, index) => index.toString()}/>
            <TouchableOpacity onPress={this.makeNewProject}>
              <Text style={{color: 'white'}}>Upload on DataBase</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={this.getProject}>
              <Text style={{color: 'white'}}>get from DataBase</Text>
            </TouchableOpacity> */}
        </View>
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