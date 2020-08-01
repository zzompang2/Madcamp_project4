import React, { Component } from "react";
import { Text,StyleSheet,PanResponder,Animated } from "react-native";

export default class Draggable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 초기값 정의 
      pan: new Animated.ValueXY()
    };
  }
  
  componentWillMount() {
    // Add a listener for the delta value change
    this._val = { x:0, y:0 }
    this.state.pan.addListener((value) => this._val = value);
    // Initialize PanResponder with move handling
    this.panResponder = PanResponder.create({
      // 주어진 터치 이벤트에 반응할지를 결정
      onStartShouldSetPanResponder: (e, gesture) => true,

       //moving 제스쳐가 진행중일 때 실행
      onPanResponderMove:
        Animated.event([null, { dx: this.state.pan.x, dy: this.state.pan.y }]),
      onPanResponderGrant: (e, gesture) => {
        this.state.pan.setOffset({
        x: this._val.x,
        y: this._val.y
        })
        this.state.pan.setValue({x:0, y:0})
      }
    });
  }

  componentDidMount() {
    const transform1 = Animated.timing(
      this.state.pan,
      {
        toValue: {x:100, y:0},
        duration: 2000
      }
    );
    const transform2 = Animated.timing(
      this.state.pan,
      {
        toValue: {x:this.props.posx, y:this.props.posy},
        duration: this.props.duration
      }
    );
    Animated.sequence([transform1, transform2]).start();
  }

  render() {
    // 위치를 지정할 스타일
    const panStyle = { transform: this.state.pan.getTranslateTransform() }
    return (
      <Animated.View
        {...this.panResponder.panHandlers}
        style={[panStyle, styles.circle]}>
        <Text style={styles.number}>{this.props.number}</Text>
      </Animated.View>
    );
  }
}

let CIRCLE_RADIUS = 30;
let styles = StyleSheet.create({
  // 모양 정의를 위한 스타일
  circle: {
    backgroundColor: "skyblue",
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS,
  },
  number: {
    fontSize: 30,
    // justifyContent: 'center',
    // alignItems: 'center',
    marginLeft: 21,
    marginTop: 8,
    // backgroundColor: 'red'
  }
});