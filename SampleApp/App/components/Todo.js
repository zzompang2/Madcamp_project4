// app/components/Todo.js

import React from "react"
import {View, Text, StyleSheet, Dimensions, Image, TouchableOpacity} from "react-native"

// 화면의 가로, 세로 길이 받아오기
const {width,height} = Dimensions.get('window')
// 이미지 가져오기
var btn_checkbox_true = require('../../asset/btn_check_true.png')
var btn_checkbox_false = require('../../asset/btn_check_false.png')
var btn_delete = require('../../asset/btn_delete.png')

const TodoItem= ({text, isComplete, changeComplete}) => (
  <View style={styles.todoContainer}>
    <TouchableOpacity
    onPress={changeComplete}>
      <Image source={isComplete ? btn_checkbox_true : btn_checkbox_false}
      style={{height: 30, width: 30, justifyContent: 'center', alignItems: 'center'}}/>
      </TouchableOpacity>
    <View style={styles.objContainer}>
        
      <Text style={styles.todos}>{text}</Text>
      <TouchableOpacity>
        <Image source={btn_delete} 
        style={{height: 30, width: 30, justifyContent: 'center', alignItems: 'center'}}/>
      </TouchableOpacity>
    </View>
  </View>
)

const styles = StyleSheet.create({
  todoContainer: {
    padding: 5,
    marginTop: 5,
    borderBottomWidth:1,
    width: width-40,
    flexDirection:'row'
  },
  todos: {
    fontSize: 20
  },
  objContainer: {
    flex: 1,
    flexDirection:'row',
    justifyContent: 'space-between'
  }
})

export default TodoItem