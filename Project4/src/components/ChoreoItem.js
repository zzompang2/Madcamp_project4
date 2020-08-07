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
        left: position[i].posx*160/width + 90 - 10,
        top: position[i].posy*90/height + 55 - 10,
      }]}/>
    )
  }

  // 초 => 분:초
  function getAudioTimeString(seconds){
    const m = parseInt(seconds%(60*60)/60);
    const s = parseInt(seconds%60);
    return ((m<10?'0'+m:m) + ':' + (s<10?'0'+s:s));
  }

  return(
    <View style={styles.container}>
      <View style={{flexDirection: 'column', alignItems: 'center'}}>
        <TouchableOpacity onPress={() => formationPressHandler(time)}>
          <View style={styles.formation}>
            <Image source={require('../../assets/drawable/background_formation_small.png')} 
              style={{height: 106, width: 176, borderRadius: 4, resizeMode: 'contain'}}/>    
            {draggables}
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => editTimeHandler(itemIndex)}>
          <Text style={styles.timeText}>{getAudioTimeString(time)}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.columnContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.indexText}>{itemIndex+1}</Text>
            <TouchableOpacity onPress={() => lyricsPressHandler()}>
              <Text style={styles.lyricsText} numberOfLines={1}>{lyrics}</Text>
            </TouchableOpacity>
          </View>
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
            numberOfLines={1}>{item}</TextInput>
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
    paddingVertical: 5,
    paddingLeft: 5,
    paddingRight: 18,
    marginVertical: 5,
    marginHorizontal: 13,
    alignItems: 'flex-start', // 텍스트 위쪽 정렬을 위해
    backgroundColor: COLORS.white,
    borderRadius: 30,
  },
  formation: {
    height: 110, 
    width: 180,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderWidth: 2,
    borderColor: COLORS.blackLight,
    backgroundColor: COLORS.blackDark,
    marginTop: 0,
  },
  timeText: {
    width: 180,
    fontSize: 15,
    color: COLORS.white,
    paddingVertical: 5,
    fontFamily: FONTS.binggrae,
    backgroundColor: COLORS.red,
    textAlign: 'center',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  indexText: {
    fontSize: 11,
    width: 18,
    height: 18,
    color: COLORS.white,
    fontFamily: FONTS.binggrae,
    paddingTop: 1,
    margin: 3,
    backgroundColor: COLORS.purple,
    borderRadius: 10,
    textAlign: 'center'
  },
  columnContainer: {
    flexDirection:'column',
    justifyContent: 'space-between',
    marginLeft: 10,
    flex: 1,
  },
  lyricsText: {
    fontSize: 14,
    color: COLORS.purple,
    paddingVertical: 2,
    paddingLeft: 0,
    fontFamily: FONTS.binggrae2,
    // borderRadius: 20,
  },
  choreoContainer: {
    flexDirection: 'row',
    marginVertical: 1.5,
  },
  choreoText: {
    height: 23,
    fontSize: 13,
    color: COLORS.blackLight,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 8,
    paddingRight: 0,
    flex: 1,
    fontFamily: FONTS.binggrae,
    backgroundColor: COLORS.grayLight,
    borderRadius: 20,
  },
  button: {
    height: 25,
    width: 25,
    fontSize: 18,
    color: COLORS.grayMiddle,
    marginRight: 0,
    marginLeft: 6,
    fontFamily: FONTS.binggrae2,
    backgroundColor: COLORS.grayLight,
    borderRadius: 15,
    textAlign: 'center',
  },
  circle: {
    backgroundColor: COLORS.yellow,
    width: 16,
    height: 16,
    borderRadius: 8,
    padding: 0,
    margin: 0,
  },
})

export default ChoreoItem