import React from 'react';
import {
  StyleSheet, View, FlatList, Text, TouchableOpacity, TextInput, Image,
} from 'react-native';

import {COLORS} from '../values/Colors';
import {FONTS} from '../values/Fonts';

import firestore from '@react-native-firebase/firestore';
import DocumentPicker from 'react-native-document-picker';
import LinearGradient from 'react-native-linear-gradient';

export default class MakeScreen extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      title: "",
      music: "",
      musicUri: "",
      date: "",
    }
    // this.title = "";
    // this.music = "";
    // this.musicUri = "";
    // this.date = "";

    this.TAG = 'MakeScreen/';
  }
  
  componentDidMount() {
    console.log(this.TAG + "setDate");
    //현재시간 받기
    var that = this;
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    //글자수 맞춰주기
    if (date < 10){ date = '0' + date;}
    if (month < 10){month = '0' + month;}
    console.log(this.TAG + year +'.' + month + '.' + date);
    this.setState({date: year +'.' + month + '.' + date});
  }

  chooseMusic = async () => {
    // Pick a single file
    try {
      const res = await DocumentPicker.pick({type: [DocumentPicker.types.audio],});
      this.setState({musicUri: res.uri});
    }catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  }

  checkInputState = () => {
    console.log(this.TAG, "checkInputState");
    if(this.state.title == "" || this.state.music == "" || this.state.musicUri == "") return;

    console.log(this.TAG, this.state.title, this.state.music, this.state.musicUri, this.state.date);
    this.props.route.params.addNewNote(this.state.title, this.state.music, this.state.musicUri, this.state.date);
    this.props.navigation.navigate('main');
  }

  getMusicUri() {
    if(this.state.musicUri == "") 
      return "Please upload music file...";
    return this.state.musicUri;
  }

  render() {
    return (
      <View style={styles.container}>
        <LinearGradient start={{x:1, y:0}} end={{x:0, y:0}} colors={[COLORS.red, COLORS.purple]} style={styles.appBar}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('main')}>
            <Text style={{color: COLORS.white, fontSize: 15, fontFamily: FONTS.binggrae2, padding: 15}}>취소</Text>
          </TouchableOpacity>
          <Text style={styles.appTitle}>Make New Note</Text>
          <TouchableOpacity onPress={() => this.checkInputState()}>
            <Text style={{color: COLORS.white, fontSize: 15, fontFamily: FONTS.binggrae2, padding: 15}}>확인</Text>
          </TouchableOpacity>
        </LinearGradient>

        <View style={{flexDirection: 'column', width: '70%', alignItems: 'center'}}>
          <TextInput 
          style={styles.inputBox}
          placeholder='Type note title here'
          onChangeText={(text) => this.setState({title: text})}>
          </TextInput>
          <TextInput
          style={styles.inputBox}
          placeholder='Type music here'
          onChangeText={(text) => this.setState({music: text})}>
          </TextInput>
          <View style={{flexDirection: 'row', width: '90%', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text numberOfLines={1} style={styles.musicUri}>{this.getMusicUri()}</Text>
            <TouchableOpacity onPress={this.chooseMusic}>
            <Image source={require('../../assets/drawable/btn_fileupload.png')} style={styles.button}/>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
};
const styles = StyleSheet.create({
  appBar: {
    width: '100%',
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
    fontSize:18,
    fontFamily: FONTS.aAlleyGarden,
  },
  container: {
    height: '100%', 
    width: '100%',
    flex: 1,
    flexDirection:'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: COLORS.blackDark,
  },
  inputBox: {
    backgroundColor: COLORS.white,
    width: '100%',
    height: 60,
    borderRadius: 20,
    borderColor: COLORS.red,
    borderWidth: 2,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 15,
    textAlignVertical: 'center',
  },
  musicUri: {
    backgroundColor: COLORS.grayDark,
    flex: 1,
    height: 45,
    borderRadius: 20,
    borderColor: COLORS.red,
    borderWidth: 2,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 15,
    marginBottom: 15,
    textAlignVertical: 'center',
  },
  button: {
    width: 50,
    height: 50,
    padding: 10,
    margin: 10,
  },
});