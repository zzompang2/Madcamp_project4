import React, { Component } from "react";
import {
  StyleSheet,
  View,
  PanResponder,
  Animated,
  Text
} from "react-native";

export default class Draggable extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  render() {
    const panStyle = {
      transform: this.state.pan.getTranslateTransform()
    }
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