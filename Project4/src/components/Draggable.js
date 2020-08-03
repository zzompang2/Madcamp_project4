import React, { Component } from "react";
import { Text,StyleSheet,PanResponder,Animated } from "react-native";

export default class Draggable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 초기값 정의 
      pan: new Animated.ValueXY(),
    };
    this._val = { x:0, y:0 };
    this.state.pan.addListener((value) => this._val = value);
    // Initialize PanResponder with move handling
    this.panResponder = PanResponder.create({
      // 주어진 터치 이벤트에 반응할지를 결정
      onStartShouldSetPanResponder: (e, gesture) => true,

       // moving 제스쳐가 진행중일 때 실행.
       // 마우스 따라 움직이도록 하는 코드.
      onPanResponderMove:
        Animated.event(
          [null, 
          { dx: this.state.pan.x, 
            dy: this.state.pan.y }
          ], 
          {useNativeDriver: false}
        ),

      // 터치이벤트 발생할 때
      onPanResponderGrant: (e, gesture) => {
        console.log(this.TAG + "onPanResponderGrant/터치이벤트 발생");
        console.log(this.TAG + "_val: " + Math.round(this._val.x) + ", " + Math.round(this._val.y));

        this.state.pan.setOffset({
        x: this._val.x,
        y: this._val.y,
        })
        //this.state.pan.setValue({x:0, y:0});
        //this.onChange();
      },

      // 터치이벤트 끝날 때.
      onPanResponderRelease: (e) => {
        console.log(this.TAG + "onPanResponderRelease/터치 끝");
        // 부모 컴포넌트로 값 보내기
        this.props.onSearchSubmit(this._val.x, this._val.y);
      }
    });

    this.TAG = "Draggable/";
  }

  playAnimation() {
    console.log(this.TAG + "playAnimation: " + this.props.position)
    var transformList = [];

    transformList.push( 
      Animated.timing(
        this.state.pan,
        {
          toValue: {x:this.props.position[0].posx, y:this.props.position[0].posy},
          duration: 1,
          useNativeDriver: true,
        }
    ));

    for(var i=1; i<this.props.position.length; i++){
      transformList.push( 
        Animated.timing(
          this.state.pan,
          {
            toValue: {x:this.props.position[i].posx, y:this.props.position[i].posy},
            duration: (this.props.position[i].time - this.props.position[i-1].time) * 1000,
            useNativeDriver: true,
          }
      ));
    }
    Animated.sequence(transformList).start();
  }

  getCurPosition() {
    for(var i=0; i<this.props.position.length; i++){
      if(this.props.curTime < this.props.position[i].time){
        break;
      }
    }
    if(i == this.props.position.length) {
      return({x: this.props.position[i-1].posx, y: this.props.position[i-1].posy});}
    
    const dx = (this.props.position[i].posx - this.props.position[i-1].posx) * (this.props.curTime - this.props.position[i-1].time) / (this.props.position[i].time - this.props.position[i-1].time);
    const dy = (this.props.position[i].posy - this.props.position[i-1].posy) * (this.props.curTime - this.props.position[i-1].time) / (this.props.position[i].time - this.props.position[i-1].time);

    return({x: this.props.position[i-1].posx + dx, y: this.props.position[i-1].posy + dy})
  }

  render() {
    console.log(this.TAG + "render");
    console.log(this.TAG + "_val: " + Math.round(this._val.x) +", "+Math.round(this._val.y));
    console.log(this.TAG + "getCurPosition: " + this.getCurPosition().x +", "+this.getCurPosition().y);
    
    this.state.pan.setOffset({x: 0, y: 0})
    this.state.pan.setValue(this.getCurPosition())
    
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

  componentDidUpdate() {
    console.log(this.TAG + "componentDidMount: " + this.props.toggle);
    if(this.props.toggle) {
      var transformList = [];

      transformList.push( 
        Animated.timing(
          this.state.pan,
          {
            toValue: {x:this.props.position[0].posx, y:this.props.position[0].posy},
            duration: 1,
            useNativeDriver: true,
          }
      ));

      for(var i=1; i<this.props.position.length; i++){
        transformList.push( 
          Animated.timing(
            this.state.pan,
            {
              toValue: {x:this.props.position[i].posx, y:this.props.position[i].posy},
              duration: (this.props.position[i].time - this.props.position[i-1].time) * 1000,
              useNativeDriver: true,
            }
        ));
      }
      Animated.sequence(transformList).start(); 
    }
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