import React from 'react';
import {
  StyleSheet, View, FlatList, Text, TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../values/Colors';
import {FONTS} from '../values/Fonts';

// firebase
import firestore from '@react-native-firebase/firestore';

export default class MainScreen extends React.Component {
  constructor(props){
    console.log("MainScreen/constructor");
    super(props);
    this.state = {
      noteList: [
        {
          title: "...",
          music: "...",
          date: "...",
        }, {
          title: "...", 
          music: "...",
          date: "...",
        }
      ]
    }
    this.TAG = 'MainScreen/';
    this.getNotes();
  }

  // 노트 이름으로 데이타베이스의 정보 받아오기
  getNotes() {
    console.log(this.TAG + "getNotes");
    const firebaseRef = firestore().collection('ChoreoNote');
    firebaseRef.get().then((doc) => {
      var _noteList = [];
      doc.forEach((queryDocumentSnapshot) => {
        const _title = queryDocumentSnapshot.data().title;
        const _music = queryDocumentSnapshot.data().music;
        const _date = queryDocumentSnapshot.data().date;
        _noteList.push({title: _title, music: _music, date: _date});
      });
      this.setState({noteList: _noteList});
    })
  }

  //새로운 노트 만들기
  addNewNote = (_title, _music, _musicUri, _date) => {
    console.log(this.TAG + "addNewNote", _date);

    const newNote = {title: _title, music: _music, musicUri: _musicUri, date: _date};
    var curNoteList = this.state.noteList;
    curNoteList.splice(curNoteList.length, 0, newNote);
    this.setState({noteList: curNoteList});

    const firebaseRef = firestore().collection('ChoreoNote').doc(_title);
    
    firebaseRef.set({
      title: _title,
      music: _music,
      musicUri: _musicUri,
      date: _date,
      choreoList: [],
    })

    //firebaseRef.collection('positionList').add()
    firebaseRef.collection('positionList').doc('0').set({
      pos: [{posx: 0, posy: 0, time: 0}]
    })
  }
  
  render() {
    console.log(this.TAG + "render");

    return (
      <View style={styles.container}>
        <LinearGradient start={{x:1, y:0}} end={{x:0, y:0}} colors={[COLORS.red, COLORS.purple]} style={styles.appBar}>
          <View style={{width: 30}}/>
          <Text style={styles.appTitle}>Choreography Note</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('make', {addNewNote: this.addNewNote})}>
            <Text style={styles.button}>+</Text>
          </TouchableOpacity>
        </LinearGradient>
        
        <FlatList
        data={this.state.noteList}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('choreo', {title: item.title, music: item.music})}>
              <View style={styles.rowContainer}>
                <Text numberOfLines={1} style={styles.title}>{item.title}</Text>
                <View style={styles.columnContainer}>
                  <Text numberOfLines={1} style={styles.music}>{item.music}</Text>
                  <Text numberOfLines={1} style={styles.date}>{item.date}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )
        }}
        keyExtractor={(item, index) => index.toString()}/>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLORS.blackDark,
  },
  appBar: {
    width: '95%',
    marginHorizontal: '2.5%',
    height: 40,
    backgroundColor: COLORS.red,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  appTitle: {
    color: COLORS.white, 
    fontSize: 22,
    fontFamily: FONTS.aAlleyGarden,
  },
  rowContainer: {
    flexDirection:'row',
    flex: 1,
    justifyContent: 'space-between',
    marginLeft: 15,
    marginRight: 15,
    padding: 9,
    borderBottomWidth: 0.8,
    borderBottomColor: COLORS.grayDark,
  },
  columnContainer: {
    flexDirection:'column',
    alignItems: 'flex-end',
  },
  title: {
    color: COLORS.white, 
    fontSize:18,
    flex: 1,
    fontFamily: FONTS.binggrae2,
  },
  music: {
    color: COLORS.red, 
    fontSize:12,
    width: 250,
    paddingLeft: 10,
    textAlign: 'right',
    fontFamily: FONTS.binggrae2,
  },
  date: {
    color: COLORS.grayDark, 
    fontSize:12,
    paddingLeft: 10,
    fontFamily: FONTS.binggrae2,
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  button: {
    fontSize: 25,
    color: COLORS.white,
    padding: 2,
    marginRight: 8,
    marginLeft: 4,
    fontFamily: FONTS.binggrae2,
  },
});