import React from "react";
import {StyleSheet, Text, View, Image, Dimensions, TextInput, TouchableOpacity} from "react-native";
import {COLORS} from '../values/Colors';
import { FlatList } from "react-native-gesture-handler";
import { FONTS } from "../values/Fonts";

const {width,height} = Dimensions.get('window')

const ChoreoItem = ({
  itemIndex, lyrics, choreo, position, time, 
  formationPressHandler,
  lyricsPressHandler, 
  addChoreoHandler, 
  deleteChoreoHandler,
  editChoreoHandler,
  editTimeHandler,
}) => {

  //console.log("w,h: " + width + ", " + height);
  var draggables = [];
  for(var i=0; i<position.length; i++){
    draggables.push(
      <View 
      style={[styles.circle, {
        position: 'absolute', 
        // position에선 원점이 중심이지만
        // 여기에선 원점이 사각형의 왼쪽위 모서리이기 때문에
        // 작은 화면의 절반 더하고(+90/+55)
        // 원의 반지름만큼 빼줘야 한다(-8)
        left: position[i].posx*160/width + 90 - 8,
        top: position[i].posy*90/height + 55 - 8,
      }]}/>
    )
  }

  // 초 => 분:초
  function getAudioTimeString(seconds){
    const h = parseInt(seconds/(60*60));
    const m = parseInt(seconds%(60*60)/60);
    const s = parseInt(seconds%60);

    //return ((h<10?'0'+h:h) + ':' + (m<10?'0'+m:m) + ':' + (s<10?'0'+s:s));
    return ((m<10?'0'+m:m) + ':' + (s<10?'0'+s:s));
  }

  return(
    <View style={styles.container}>
      <TouchableOpacity onPress={() => formationPressHandler(time)}>
        <View style={styles.formation}>
        <Image source={require('../../assets/drawable/background_formation_small.png')} 
          style={{height: 106, width: 176, borderRadius: 4, resizeMode: 'contain'}}/>    
          {draggables}
        </View>
      </TouchableOpacity>

      <View style={styles.columnContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.indexText}>{itemIndex+1}</Text>
            <TouchableOpacity onPress={() => lyricsPressHandler()}>
              <Text style={styles.lyricsText}>{lyrics}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => editTimeHandler(itemIndex)}>
            <Text style={styles.timeText}>{getAudioTimeString(time)}</Text>
          </TouchableOpacity>
        </View>
        <FlatList
        data={choreo}
        renderItem={({item, index}) =>
          <View style={styles.choreoContainer}>
            <TextInput 
            style={styles.choreoText}
            onChangeText={(text) => {
              console.log("ham??");
              editChoreoHandler(itemIndex, index, text)}}
            >{item}</TextInput>
            <TouchableOpacity onPress={() => addChoreoHandler(itemIndex, index)}>
              <Text style={styles.button}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteChoreoHandler(itemIndex, index)}>
              <Text style={styles.button}>-</Text>
            </TouchableOpacity>
          </View>}
        keyExtractor={(item, index) => index.toString()}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container : {
    flexDirection:'row',
    padding: 5,
    alignItems: 'flex-start', // 텍스트 위쪽 정렬을 위해
    // borderBottomWidth: 0.8,
    // borderBottomColor: COLORS.grayDark,
  },
  indexText: {
    fontSize: 9,
    height: 20,
    color: COLORS.grayDark,
    fontFamily: FONTS.binggrae2,
    paddingTop: 3,
    paddingRight: 3,
    paddingBottom: 0,
    marginBottom: 0,
  },
  columnContainer: {
    flexDirection:'column',
    justifyContent: 'space-between',
    marginLeft: 10,
    flex: 1,
  },
  lyricsText: {
    fontSize: 15,
    color: COLORS.red,
    paddingTop: 2,
    paddingBottom: 5,
    paddingLeft: 0,
    fontFamily: FONTS.binggrae2,
    // borderRadius: 20,
  },
  timeText: {
    fontSize: 12,
    color: COLORS.yellow,
    paddingTop: 2,
    paddingBottom: 2,
    paddingRight: 10,
    marginBottom: 2,
    fontFamily: FONTS.binggrae2,
    // backgroundColor: COLORS.yellow,
    // borderRadius: 20,
  },
  choreoContainer: {
    flexDirection: 'row',
    borderTopWidth: 0.8,
    borderTopColor: COLORS.grayDark,
  },
  choreoText: {
    fontSize: 15,
    color: COLORS.white,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 8,
    paddingRight: 0,
    flex: 1,
  },
  formation: {
    height: 110, 
    width: 180,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: COLORS.purple,
    backgroundColor: COLORS.blackLight,
    marginTop: 5,
  },
  circle: {
    backgroundColor: COLORS.purple,
    width: 16,
    height: 16,
    borderRadius: 8,
    padding: 0,
    margin: 0,
  },
  button: {
    fontSize: 18,
    color: COLORS.grayMiddle,
    padding: 2,
    marginRight: 8,
    marginLeft: 4,
    fontFamily: FONTS.binggrae2,
  }
})

export default ChoreoItem