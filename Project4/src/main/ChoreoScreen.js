import React from 'react';
import {
  SafeAreaView, StyleSheet, View, FlatList, TouchableOpacity, Alert, Image, Text,
} from 'react-native';

import ChoreoItem from '../components/ChoreoItem';
import Musicbar from '../components/Musicbar';
import {COLORS} from '../values/Colors';
import {FONTS} from '../values/Fonts';

import firestore from '@react-native-firebase/firestore';

export default class ChoreoScreen extends React.Component {
  constructor(props){
    console.log("ChoreoScreen/constructor");
    super(props);
    this.state = {
      title: this.props.route.params.title,
      date: "",
      music: this.props.route.params.music,
      choreoList: [], // [{lyrics: "...", choreo: ["..."], time: 0,}, ... ]
      time: 0,
      playState: 'paused',
      positionList: [
        [
          {posx: 0, posy:0, time: 0},
        ],
      ],
    }
    // this.positionList = [
    //   [
    //     {posx: 0, posy:0, time: 0},
    //   ],
    // ];

    this.TAG = 'ChoreoScreen/';
    this.notePull(this.state.title);
  }

  // 노트 이름으로 데이타베이스의 정보 받아오기
  notePull(noteTitle) {
    console.log("notePull");

    const firebaseRef = firestore().collection('ChoreoNote').doc(noteTitle);

    firebaseRef.get().then(function(doc) {
      // console.log("doc: " + doc.data().title);
      this.setState({ 
        date: doc.data().date,
        music: doc.data().music,
        choreoList: doc.data().choreoList});
    }.bind(this));

    var _positionList=[];
    firebaseRef.collection('positionList').get().then(function(positionDoc) {
      positionDoc.forEach(function(doc) {
        _positionList.push([...doc.data().pos]);
      });
      this.setState({positionList: _positionList});
    }.bind(this));
    
  }

  // 데이타베이스에 정보 업로드 하기
  notePush(noteTitle) {
    console.log("notePush");

    const firebaseRef = firestore().collection('ChoreoNote').doc(noteTitle);
    firebaseRef.set({
      title: this.state.title,
      music: this.state.music,
      date: this.state.date,
      choreoList: this.state.choreoList,
    })
    
    firebaseRef.collection('positionList').get().then((positionDoc) => {
      const _positionList = this.state.positionList;
      var curNum = 0;

      positionDoc.forEach(function(doc) {
        curNum++;
      });

      // curNum: 원래 있던 doc 개수
      // _positionList.length: 수정한 후 doc 개수
      for(var i=0; i<_positionList.length; i++){
        firebaseRef.collection('positionList').doc(i.toString()).set({ pos: _positionList[i] });
      }
      // 1개 이상의 doc이 delete된 경우
      if(curNum > _positionList.length){
        for(; i<curNum; i++){
          firebaseRef.collection('positionList').doc(i.toString()).delete();
        }
      }
    })
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

  formationPressHandler = (time) => {
    if(this.state.playState == 'paused')
      this.props.navigation.navigate('formation', {time: time, positionList: this.state.positionList, updatePositionList: this.updatePositionList, music: this.state.music})
    else
      Alert.alert('Notice', 'Can\'t edit while listening :)');
  }

  lyricsPressHandler = () => {
    this.props.navigation.navigate('lyrics', {curLyrics: this.makeLyricsList()})
  }

  addChoreoHandler = (itemIndex, index) => {
    var curChoreoList = this.state.choreoList;
    curChoreoList[itemIndex].choreo.splice(index+1, 0, "");
    this.setState({choreoList: curChoreoList});
  }

  deleteChoreoHandler = (itemIndex, index) => {
    var curChoreoList = this.state.choreoList;
    if(curChoreoList[itemIndex].choreo.length == 1){
      curChoreoList[itemIndex].choreo.splice(index, 1, "");
    }
    else{
      curChoreoList[itemIndex].choreo.splice(index, 1);
    }
    this.setState({choreoList: curChoreoList});
  }

  editChoreoHandler = (itemIndex, index, text) => {
    var _choreoList = this.state.choreoList;
    _choreoList[itemIndex].choreo.splice(index, 1, text);
    this.setState({choreoList: _choreoList});
  }

  editTimeHandler = (itemIndex) => {
    console.log(this.TAG + "editTimeHandler");
    var _choreoList = this.state.choreoList;
    _choreoList[itemIndex].time = this.state.time;
    this.setState({choreoList: _choreoList});
  }

  _makeChoreoItem = ({item, index}) => {
    //console.log(this.TAG + "_makeChoreoItem");
    return (
      // <TouchableOpacity onPress={() => this.formationPressHandler(item)}>
      <ChoreoItem
      itemIndex={index}
      lyrics={item.lyrics} 
      choreo={item.choreo}
      position={this.getCurPosition(this.state.positionList, item.time)}
      formationPressHandler={this.formationPressHandler}
      time={item.time}
      lyricsPressHandler={this.lyricsPressHandler}
      addChoreoHandler={this.addChoreoHandler}
      deleteChoreoHandler={this.deleteChoreoHandler}
      editChoreoHandler={this.editChoreoHandler}
      editTimeHandler={this.editTimeHandler}/>
    )
  }

  // 자식 컴포넌트(Musicbar)에서 값 받아오기
  onSearchSubmitInMusicbar = (_time, _playState) => {
    console.log("get submit in musicbar: " + _time);
    this.setState({time: _time, playState: _playState});
  }

  // LyricsScreen에 보낼 lyrics text 만들기
  makeLyricsList() {
    const curChoreoList = this.state.choreoList;
    var lyricsText = "";

    if(curChoreoList != undefined){
      for(var i=0; i<curChoreoList.length; i++){
        lyricsText = lyricsText + curChoreoList[i].lyrics;
        if(i < curChoreoList.length-1)
          lyricsText += "\n";
      }
    }
    return lyricsText;
  }

  render() {
    console.log(this.TAG + "render");

    // FormationScreen에서 값을 받아왔다면
    if(this.props.navigation.dangerouslyGetState().routes.find(v => v.name === 'choreo').params.positionList != undefined){

      console.log(this.TAG + "FormationScreen에서 값을 받아왔다면");

      this.setState({positionList: this.props.route.params.positionList});
      this.props.route.params.positionList = undefined;
    }

    // LyricsScreen에서 값을 받아왔다면 
    if(this.props.navigation.dangerouslyGetState().routes.find(v => v.name === 'choreo').params.lyrics != undefined){

      console.log(this.TAG + "LyricsScreen에서 값을 받아왔다면");

      //const lyricsList = this.props.routes.params.lyrics;
      const lyricsList = this.props.navigation.dangerouslyGetState().routes.find(v => v.name === 'choreo').params.lyrics;
      this.props.navigation.dangerouslyGetState().routes.find(v => v.name === 'choreo').params.lyrics = undefined;

      const prevChoreoList = this.state.choreoList;
      var newChoreoList = [];

      console.log("lyricsList: " + lyricsList.length);

      var i=0;
      if(prevChoreoList != undefined){
        for(; i < prevChoreoList.length && i < lyricsList.length; i++){
          newChoreoList.push({lyrics: lyricsList[i], choreo: [...prevChoreoList[i].choreo], time: prevChoreoList[i].time});
        }
      }
      for(; i<lyricsList.length; i++)
        newChoreoList.push({lyrics: lyricsList[i], choreo: [""], time: 0});
      
      this.setState({choreoList: newChoreoList});
    }

    return (
      <View style={styles.rowContainer}>
        <Musicbar onSearchSubmit={this.onSearchSubmitInMusicbar} time={this.state.time} musicTitle={this.state.music}/>
        <View style={styles.columnContainer}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 4}}>
            <Text style={styles.title}>{this.state.title + " <" + this.state.music + ">"}</Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity onPress={() => this.notePush(this.state.title)} style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image source={require('../../assets/drawable/btn_save.png')} style={styles.button}/>
                <Text style={styles.buttonText}>save</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.lyricsPressHandler()} style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image source={require('../../assets/drawable/btn_edit.png')} style={styles.button}/>
                <Text style={styles.buttonText}>edit lyrics</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                Alert.alert("새로고침", "현재 데이터가 지워지고 가장 최근에 저장한 데이터로 교체됩니다. 계속하시겠습니까?",
                [
                  {
                    text: "예(현재 데이터 삭제)",
                    onPress: () => {this.notePull(this.state.title)},
                  },
                  {
                    text: "아니오",
                  }
                ], {cancelable: false})
                }} style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image source={require('../../assets/drawable/btn_refresh.png')} style={styles.button}/>
                <Text style={styles.buttonText}>refresh</Text>
              </TouchableOpacity>
            </View>
          </View>
          <FlatList
          data={this.state.choreoList}
          renderItem={this._makeChoreoItem}
          keyExtractor={(item, index) => index.toString()}/>
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
  columnContainer : {
    flexDirection:'column',
    flex: 1,
  },
  playerBar: {
    height: '100%', 
    width: 50, 
    justifyContent: 'center', 
    alignItems: 'center',
    resizeMode: 'contain',
  },
  button: {
    width: 25,
    height: 25,
    marginVertical: 10,
    marginHorizontal: 3,
  },
  buttonText: {
    color: COLORS.red, 
    fontSize: 13,
    fontFamily: FONTS.binggrae,
    marginVertical: 10,
    marginRight: 10,
  },
  title: {
    color: COLORS.white, 
    fontSize: 14,
    fontFamily: FONTS.binggrae,
    marginVertical: 10,
    marginLeft: 10,
  },
});