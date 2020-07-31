import React, {Component} from 'react';
import {StyleSheet, Button, View} from 'react-native';
// custom component 가져오기
// ./TestComponent : 실제 파일명을 뜻함
import TestComponent from './TestComponent';

const datas1 = [
  {id:"gdHong",count:0,color:"red"},
  {id:"ksYu",count:0,color:"green"},
  {id:"ssLee",count:0,color:"blue"},
];

type Props = {};
export default class App extends Component<Props> {
  constructor(props){
    super(props);
    this.state={datas:datas1};
  }

  _updateCount(idx){
    const newDatas = this.state.datas;
    newDatas[idx].count = newDatas[idx].count + 1;
    // newArray[idx].count++;

    this.setState({datas:newDatas});
  }

  render() {
    return (
      <View style={styles.container}>
        {
          this.state.datas.map((data, index) => {
            return(
              <TestComponent
                key={data.id}
                id={data.id}
                color={data.color}
                title={data.count.toString()}
                updateCount={this._updateCount.bind(this, index)}/>
            )
          })
        }
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