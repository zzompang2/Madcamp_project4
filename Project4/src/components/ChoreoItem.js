import React from "react";
import {StyleSheet, Text, View, Image, ListView, TextInput, TouchableOpacity} from "react-native";
import {COLORS} from '../values/colors';
import { FlatList } from "react-native-gesture-handler";

const ChoreoItem = ({index, lyrics, formation, choreo}) =>  (
  <View style={styles.container}>
    <Text style={styles.indexText}>{index+1}</Text>
    <TouchableOpacity>
      <Image source={formation} style={styles.formation}/>
    </TouchableOpacity>
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
    color: COLORS.grayMiddle,
  },
  columnContainer: {
    flexDirection:'column',
    justifyContent: 'space-between',
    marginLeft: 10,
    flex: 1,
  },
  lyricsText: {
    fontSize: 15,
    color: COLORS.yellow,
    // borderBottomWidth: 0.8,
    // borderBottomColor: COLORS.grayDark,
    paddingBottom: 5,
  },
  choreoText: {
    fontSize: 15,
    color: COLORS.white,
    padding: 0,
    borderTopWidth: 0.8,
    borderTopColor: COLORS.grayDark,
  },
  formation: {
    height: 100, 
    width: 150,
    borderRadius: 10,
  },
})

export default ChoreoItem