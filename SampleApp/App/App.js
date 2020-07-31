import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Header from './components/Header';
import SubTitle from './components/SubTitle';
import Input from './components/Input';
import TodoItem from './components/Todo';

//App이라는 class를 만들고 이를 export합니다.
export default class App extends React.Component {

  // 사용자 입력에 따라 바뀌도록 state 사용
  state = {
    inputValue: "",
    todos: [
      {title: "코딩하고", isComplete: true},
      {title: "코딩하기", isComplete: true},
      {title: "안녕하세요", isComplete: false},
      {title: "감사해요", isComplete: false},
      {title: "잘있어요", isComplete: false},
      {title: "다시 만나요", isComplete: false},
      {title: "끄읕", isComplete: false},
    ]
  }

  // FlatList 사용하기 위해 renderItem 속성에 들어갈 함수.
  // renderItem 속성: 한 데이터 정보를 사용해 컴포넌트를 리턴하는 함수.
  _makeTodoItem = ({ item, index }) => {
    return (
      <TodoItem 
      text={item.title} 
      isComplete={item.isComplete}
      changeComplete={() => {
        const newTodo=[...this.state.todos];  // ... 연산자: 뒤에 오는 요소를 분해해서 펼쳐주는 역할.
        newTodo[index].isComplete=!newTodo[index].isComplete;
        this.setState({todos:newTodo});
      }} />
    )
  }

  // input에 전달할 함수.
  // 입력창이 변결될 떄마다 실행할 함수!
  _changeText = (value) => {
    this.setState({inputValue: value});
  }

  // input에 전달할 함수.
  // 완료 버튼 누르면 추가하도록.
  _addTodoItem = () => {
    // prevTodo라는 변수에 지금 state에 있는 todos를 넣습니다.
    const prevTodo = this.state.todos
    // 입력한 할 일의 내용을 state.inputValue에서 받아와 title에 넣습니다.
    // 할 일을 입력할 시에는 보통 완료하지 않은 경우가 많으니 완료여부는 false를 기본값으로 설정합니다.
    // 이렇게 만든 할 일 덩어리를 newTodo라는 변수에 집어넣습니다.
    const newTodo = { title: this.state.inputValue, isComplete: false}
  
    //todos에 지금까지 저장된 할 일 덩어리들과(prevTodo)와 방금 추가한 할 일 덩어리(newTodo)를 이어서(concat) 저장합니다(setState). 추가가 완료된 이후에 입력창은 다시 공백으로 만듭니다.(inputValue: '')
    this.setState({
      inputValue: '',
      todos: prevTodo.concat(newTodo)
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.centered}>
          <Header/>
        </View>
        <View style={styles.inputContainer}>
        <SubTitle title="To-Do 입력"/>
          <Input
          value={this.state.inputValue}
          changeText={this._changeText}
          addTodo={this._addTodoItem}/>
        </View>
        <SubTitle title="To-Do List"/>
        {/* 
        <TodoItem text={this.state.todos[0].title} isComplete={this.state.todos[0].isComplete}/>
        <TodoItem text={this.state.todos[1].title} isComplete={this.state.todos[1].isComplete}/> 
        */}
        <FlatList
        data={this.state.todos}
        renderItem={this._makeTodoItem}
        keyExtractor={(item, index) => {return '$(index)'}} />
      </View>
    );
  }
}

//style을 설정해줍니다.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  centered: {
    alignItems: 'center',
    backgroundColor: 'pink',
  },
  inputContainer: {
    //marginLeft:20
  }
});