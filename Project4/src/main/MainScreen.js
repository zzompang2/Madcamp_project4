import React from 'react';
import {
  StyleSheet, View, FlatList, Text, TouchableOpacity,
} from 'react-native';

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

  //performance이름으로 데이타베이스의 정보 받아오기
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
  
  render() {
    console.log(this.TAG + "render");
    return (
      <View style={styles.container}>
        <FlatList
        data={this.state.noteList}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('choreo', {title: item.title})}>
              
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
    height: '100%', 
    width: '100%',
    flex: 1,
    backgroundColor: COLORS.blackDark,
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
    fontFamily: FONTS.binggrae2_bold,
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
  }
});