import React from "react";
import {StyleSheet, Text, View, Image, Dimensions, TextInput, TouchableOpacity} from "react-native";
import {COLORS} from '../values/Colors';
import { FlatList } from "react-native-gesture-handler";
import { FONTS } from "../values/Fonts";

const {width,height} = Dimensions.get('window')

const ChoreoItem = ({index, lyrics, choreo, position}) => {

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
  return(
    <View style={styles.container}>
      <Text style={styles.indexText}>{index+1}</Text>
      <View style={styles.formation}>
      <Image source={require('../../assets/drawable/background_formation_small.png')} 
        style={{height: 110, width: 180, borderRadius: 5, resizeMode: 'contain'}}/>    
        {draggables}
      </View>

      <View style={styles.columnContainer}>
        <Text style={styles.lyricsText}>{lyrics}</Text>
        <FlatList
        data={choreo}
        renderItem={({item}) =>
          <TextInput style={styles.choreoText}>{item}</TextInput>}
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
    fontSize: 15,
    marginRight: 7,
    color: COLORS.grayDark,
    fontFamily: FONTS.binggrae2_bold,
  },
  columnContainer: {
    flexDirection:'column',
    justifyContent: 'space-between',
    marginLeft: 10,
    flex: 1,
  },
  lyricsText: {
    fontSize: 15,
    color: COLORS.purple,
    paddingTop: 2,
    paddingBottom: 5,
    paddingLeft: 0,
    marginBottom: 5,
    fontFamily: FONTS.binggrae2,
    // backgroundColor: COLORS.yellow,
    // borderRadius: 20,
  },
  choreoText: {
    fontSize: 15,
    color: COLORS.white,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 0,
    paddingRight: 0,
    borderTopWidth: 0.8,
    borderTopColor: COLORS.grayDark,
  },
  formation: {
    height: 110, 
    width: 180,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.red,
    backgroundColor: COLORS.blackLight,
  },
  circle: {
    backgroundColor: COLORS.purple,
    width: 16,
    height: 16,
    borderRadius: 8,
    padding: 0,
    margin: 0,
  },
})

export default ChoreoItem