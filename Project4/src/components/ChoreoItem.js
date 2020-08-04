import React from "react";
import {StyleSheet, Text, View, Image, ListView, TextInput, TouchableOpacity} from "react-native";
import {COLORS} from '../values/colors';

const ChoreoItem = ({lyrics, formation, choreo}) =>  (
  <View style={styles.container}>
    <Text style={styles.lyricsText}>{lyrics}</Text>
    <View style={styles.choreoContainer}>
      <TouchableOpacity>
        <Image source={formation} style={styles.formation}/>
      </TouchableOpacity>
      <TextInput 
      style={styles.choreoText}>{choreo}</TextInput>
    </View>
  </View>
)

const styles = StyleSheet.create({
  container: {
    padding: 3,
    flexDirection:'column',
    justifyContent: 'space-between',
    backgroundColor: 'gray'
  },
  choreoContainer : {
    flexDirection:'row',
    backgroundColor: 'black',
    padding: 5,
    alignItems: 'flex-start', // 텍스트 위쪽 정렬을 위해
    //justifyContent: 'space-between'
  },
  lyricsText: {
    fontSize: 15,
    padding: 3,
    color: 'white',
    backgroundColor: 'blue'
  },
  choreoText: {
    fontSize: 15,
    padding: 3,
    marginLeft: 5,
    color: 'white',
    backgroundColor: 'pink',
  },
  formation: {
    height: 100, 
    width: 150, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
})

export default ChoreoItem