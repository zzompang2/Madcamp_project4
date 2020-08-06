import React from 'react';
import {
  StyleSheet, View, FlatList, Text, TouchableOpacity, Image,
} from 'react-native';

import {COLORS} from '../values/Colors';
import {FONTS} from '../values/Fonts';
import { TextInput } from 'react-native-gesture-handler';

export default class LyricsScreen extends React.Component {
  constructor(props){
    super(props);
    this.lyrics = props.route.params.curLyrics;
  }

  splitLyricsToList() {
    console.log("splitLyricsToList: " + this.lyrics);
    if(this.lyrics == "") return [];
    console.log("not undefined!!")
    const lyricsList = this.lyrics.split('\n');
    return lyricsList;
  }

  render(){
    return(
      <View style={styles.container}>
        <TextInput 
        style={styles.lyrics}
        placeholder={"가사를 입력해주세요! \n띄어쓰기 단위로 리스트가 나누어집니다."}
        multiline={true}
        onEnd
        onChangeText={(text) => {
          console.log("onSubmitEditing")
          this.lyrics = text;
          }}>{this.lyrics}</TextInput>
        <TouchableOpacity onPress={() => 
          this.props.navigation.navigate('choreo', {lyrics: this.splitLyricsToList()})}>
          <Image source={require('../../assets/drawable/btn_complete.png')} style={styles.button}/>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container : {
    flexDirection:'row',
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: COLORS.blackDark,
  },
  lyrics: {
    backgroundColor: COLORS.white,
    height: '90%',
    flex: 1,
    borderRadius: 20,
    borderColor: COLORS.red,
    borderWidth: 2,
    padding: 20,
    margin: 15,
    textAlignVertical: 'top',
  },
  button: {
    width: 50,
    height: 50,
    marginBottom: 15,
    marginRight: 15,
  }
})