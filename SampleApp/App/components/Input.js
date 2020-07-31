// app/components/Input.js

import React from "react";
import {TextInput,StyleSheet} from 'react-native';

const Input = ({value, changeText, addTodo}) => (
  <TextInput
    value={value}  
    style={styles.input}
    placeholder={"오늘 어떤 일을 하실건가요?"}  // hint
    maxLength={30}                            // 입력 최대 길이
    returnKeyType="done"                      // 완료 버튼에 출력할 글자
    onChangeText={changeText}                 // 입력된 텍스트가 바뀔 때마다 실행
    onEndEditing={addTodo}
    returnKeyType="done"/>
);

const styles = StyleSheet.create({
    input: {
        fontSize: 25,
        paddingTop: 15,
    }
})

export default Input;