 // JSX 사용하기 위해 React를 import.
 // React가 JSX를 Javascript 형태로 변환해줌.
import React, {Component} from 'react';

// react-native에서 제공하는 컴포넌트 import.
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Platform,
  //Image,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type Props = {};
export default class App extends Component<Props> {
  /* constructor(생성자): 클래스 실행시 가장 먼저 실행되는 함수. */
  constructor(props){
    super(props);  // 상속받은 component의 생성자를 호출. constructor에서 가장 먼저 실행하는 게 원칙!
    this.state={count:0}; // 사용할 변수 초기화
  }

  _updateCount(){

    console.log("updateCount");

    // this.setState(): state를 업데이트 하는 함수
    this.setState({
      count:this.state.count+1
    });
    // this.setState((prevState, props) => {
    //   return {count:prevState.count+1}
    // });
  }

  // state.count: state 변화하면 render가 실행됨
  render() {
    console.log("render 실행");
    return (
      <View style={styles.container}>
        <Button
          color="green"
          title={this.state.count.toString()}
          // 버튼 눌렀을 때 실행되는 함수를 onPress 속성으로 전달.
          // bind(this): 함수의 this를 현재 객체(클래스) 바운더리의 this로 지정하겠다"는 뜻
          onPress={this._updateCount.bind(this)} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});