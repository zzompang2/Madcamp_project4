import React, { Component } from "react";
import { Text,StyleSheet,PanResponder,Animated } from "react-native";
import {COLORS} from '../values/colors';

export default class Draggable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 초기값 정의 
      pan: new Animated.ValueXY(),
    };
    this._val = { x:0, y:0 };
    this._prevVal = { x:0, y:0 };
    this.state.pan.addListener((value) => this._val = value);
    /** Initialize PanResponder with move handling **/
    this.panResponder = PanResponder.create({
      // 주어진 터치 이벤트에 반응할지를 결정.
      // 재생중일땐 움직이지 못하도록 하자.
      onStartShouldSetPanResponder: (e, gesture) => { return !this.props.toggle },

      // 터치이벤트 발생할 때
      onPanResponderGrant: (e, gesture) => {
        console.log(this.TAG + "onPanResponderGrant/터치이벤트 발생");
        console.log(this.TAG + "시작위치(_val): " + Math.round(this._val.x) + ", " + Math.round(this._val.y));

        this._prevVal = {x: Math.round(this._val.x), y: Math.round(this._val.y)}

        this.state.pan.setOffset({
        x: this._val.x,
        y: this._val.y,
        })
        this.state.pan.setValue({x:0, y:0});
        //this.onChange();
      },

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

      // 터치이벤트 끝날 때.
      onPanResponderRelease: (e, gesture) => {
        console.log(this.TAG + "onPanResponderRelease/터치 끝");

        this._val = {x: this._prevVal.x+gesture.dx, y: this._prevVal.y+gesture.dy};

        // 부모 컴포넌트로 값 보내기
        this.props.onSearchSubmit(this.props.number-1, this._val.x, this._val.y);
        this.state.pan.setOffset({x: 0, y: 0});
        //this.state.pan.flattenOffset();
      }
    });
    this.TAG = "Draggable/";
  }

  getCurPosition() {
    for(var i=0; i<this.props.position.length; i++){
      if(this.props.curTime <= this.props.position[i].time){
        console.log(this.TAG + "getCurPosition: " + this.props.curTime + " vs. ["+i+"] " + this.props.position[i].time);
        break;
      }
    }
    if(i == this.props.position.length)
      return({x: this.props.position[i-1].posx, y: this.props.position[i-1].posy});

    if(this.props.curTime == this.props.position[i].time)
      return({x: this.props.position[i].posx, y: this.props.position[i].posy});

    const dx = (this.props.position[i].posx - this.props.position[i-1].posx) * (this.props.curTime - this.props.position[i-1].time) / (this.props.position[i].time - this.props.position[i-1].time);
    const dy = (this.props.position[i].posy - this.props.position[i-1].posy) * (this.props.curTime - this.props.position[i-1].time) / (this.props.position[i].time - this.props.position[i-1].time);    
    
    console.log(this.TAG + "dx: " + dx +", dy: "+ dy);
    console.log(this.TAG + "posx: " + this.props.position[i-1].posx + ", posy: " + this.props.position[i-1].posy);
    return({x: this.props.position[i-1].posx + dx, y: this.props.position[i-1].posy + dy})
  }

  render() {
    console.log(this.TAG + "render");
    console.log(this.TAG + "_val: " + Math.round(this._val.x) +", "+Math.round(this._val.y));

    const curPosition = this.getCurPosition();
    console.log(this.TAG + "getCurPosition: " + curPosition.x +", "+curPosition.y);
    
    
    this.state.pan.setValue(curPosition)
    this._val = {x: curPosition.x, y: curPosition.y}
    
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
    console.log(this.TAG + "_val: " + Math.round(this._val.x) +", "+Math.round(this._val.y));

    console.log(this.TAG + "componentDidMount: " + this.props.toggle + "\n\n");
    if(this.props.toggle) {
      var transformList = [];

      // 시작 시간에 맞춰 애니메이션을 실행하기 위해
      // 현재 시간이 어디 사이에 있는지 찾는다.
      for(var i=0; i<this.props.position.length; i++){
        if(this.props.curTime < this.props.position[i].time){
          break;
        }
      }

      if(i == this.props.position.length) return;

      transformList.push( 
        Animated.timing(
          this.state.pan,
          {
            toValue: {x:this._val.x, y:this._val.y},
            duration: 1,
            useNativeDriver: true,
          }
      ));

      transformList.push( 
        Animated.timing(
          this.state.pan,
          {
            toValue: {x:this.props.position[i].posx, y:this.props.position[i].posy},
            duration: (this.props.position[i].time - this.props.curTime) * 1000,
            useNativeDriver: true,
          }
      ));

      for(var j=i+1; j<this.props.position.length; j++){
        transformList.push(
          Animated.timing(
            this.state.pan,
            {
              toValue: {x:this.props.position[j].posx, y:this.props.position[j].posy},
              duration: (this.props.position[j].time - this.props.position[j-1].time) * 1000,
              useNativeDriver: true,
            }
        ));
      }
      Animated.sequence(transformList).start();
    }
  }
}

let CIRCLE_RADIUS = 20;
let styles = StyleSheet.create({
  // 모양 정의를 위한 스타일
  circle: {
    backgroundColor: "skyblue",
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS,
  },
  number: {
    fontSize: 20,
    // justifyContent: 'center',
    // alignItems: 'center',
    marginLeft: 14,
    marginTop: 5,
    // backgroundColor: 'red'
  }
});