import React, {Component} from "react";
import {StyleSheet, Text, View, Image, ListView} from "react-native";

var btn_delete = require('../../asset/btn_delete.png')

const ChoreoItem = ({lyrics, formation, choreo}) =>  (
  <View style={styles.container}>
    <Text style={styles.lyricsText}>{lyrics}</Text>
    <Text style={styles.lyricsText}>{formation}</Text>
    <Image source={choreo} style={{height: 30, width: 30, justifyContent: 'center', alignItems: 'center'}}/>
  </View>
)

const styles = StyleSheet.create({
  container: {
    padding: 3,
    flexDirection:'row',
    justifyContent: 'space-between'
  },
  lyricsText: {
    fontSize: 10
  },
})

export default ChoreoItem