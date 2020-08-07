import React from 'react';
import {
  SafeAreaView,View,Text,Image,TouchableOpacity,Alert,StyleSheet,Dimensions,ImageBackground,
} from 'react-native';

import Sound from 'react-native-sound';
import Slider from '@react-native-community/slider';
import {COLORS} from '../values/Colors';
import { FONTS } from '../values/Fonts';

// 화면의 가로, 세로 길이 받아오기
const {width,height} = Dimensions.get('window')

//음악재생image 설정
const img_pause = require('../../assets/drawable/btn_pause.png');
const img_play = require('../../assets/drawable/btn_play.png');
const img_background = require('../../assets/drawable/background_music_player.png');
const img_before3 = require('../../assets/drawable/btn_before3.png');
const img_after3 = require('../../assets/drawable/btn_after3.png');
const img_before10 = require('../../assets/drawable/btn_before10.png');
const img_after10 = require('../../assets/drawable/btn_after10.png');

//음악재생바
class Musicbar extends React.Component{

  constructor(props){
    super(props);
    console.log("Musicbar/constructor")
    this.state = {
      playState: 'paused', //playing, paused
      playSeconds: this.props.time,
      duration: 0,
      timemark: 'default',
    }
    this.music = this.props.musicTitle;
    this.sliderEditing = false;
    this.TAG = 'Musicbar/';
  }

  onSliderEditStart = () => {
    this.sliderEditing = true;
  }
  onSliderEditEnd = () => {
    this.sliderEditing = false;
    if(this.props.onSearchSubmit != undefined){
      this.props.onSearchSubmit(this.state.playSeconds);
    }
  }
  onSliderEditing = value => {
    if(this.sound){
      this.sound.setCurrentTime(value);
      this.setState({playSeconds:value});
    }
  }

  load = () => {
    console.log(this.TAG + "load");
    //const filepath = this.props.navigation.state.params.filepath;
    //const filepath = 'file:///Phone/sdcard/Music/madclown.mp3';
    const filepath = Sound.MAIN_BUNDLE;
    console.log("????: " + this.music + '.mp3');

    this.sound = new Sound(this.music + '.mp3', filepath, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        //Alert.alert('Notice', 'audio file error. (Error code : 1)');
        this.setState({playState:'paused'});
      }
      else{
        this.sound.setCurrentTime(this.props.time);
        this.setState({playState:'paused', duration:this.sound.getDuration()});
      }
    });  
  }

  play = async () => {
    console.log(this.TAG + "play");
    if(this.sound){
      console.log(this.TAG + "test1");
      this.sound.play(this.playComplete);
      this.setState({playState:'playing'});
      // 애니메이션 실행을 위해 전달.
      if(this.props.playAnimation != undefined)
        this.props.playAnimation(true);
      // 노래 재생 상태를 알리기 위해
      if(this.props.onSearchSubmit != undefined)
        this.props.onSearchSubmit(this.state.playSeconds, 'playing');
    }
    // else{
    //   this.load();
    //   this.play();
    // }
  }
  playComplete = (success) => {
    //console.log(this.TAG + "playComplete");
    if(this.sound){
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
        //Alert.alert('Notice', 'audio file error. (Error code : 2)');
      }
      this.setState({playState:'paused', playSeconds:0});
      this.sound.setCurrentTime(0);
    }
  }

  pause = () => {
    console.log(this.TAG + "pause");
    if(this.sound){
      this.sound.pause();
    }
    this.setState({playState:'paused'});
    // 애니메이션 실행을 위해 전달.
    if(this.props.playAnimation != undefined)
      this.props.playAnimation(false);
    if(this.props.onSearchSubmit != undefined)
      this.props.onSearchSubmit(this.state.playSeconds, 'paused');
  }

  jumpPrev3Seconds = () => {this.jumpSeconds(-3);}
  jumpNext3Seconds = () => {this.jumpSeconds(3);}
  jumpPrev10Seconds = () => {this.jumpSeconds(-10);}
  jumpNext10Seconds = () => {this.jumpSeconds(10);}
  jumpSeconds = (secsDelta) => {
    if(this.sound){
      this.sound.getCurrentTime((secs, isPlaying) => {
        console.log(this.TAG + "getCurrentTime: " + secs);
        let nextSecs = secs + secsDelta;
        if(nextSecs < 0) nextSecs = 0;
        else if(nextSecs > this.state.duration) nextSecs = this.state.duration;
        this.sound.setCurrentTime(nextSecs);
        this.setState({playSeconds:nextSecs});
        
        if(this.props.onSearchSubmit != undefined){
          this.props.onSearchSubmit(this.state.playSeconds, this.state.playState);
        } 
      })
    }
  }

  getAudioTimeString(seconds){
      const h = parseInt(seconds/(60*60));
      const m = parseInt(seconds%(60*60)/60);
      const s = parseInt(seconds%60);

      //return ((h<10?'0'+h:h) + ':' + (m<10?'0'+m:m) + ':' + (s<10?'0'+s:s));
      return ((m<10?'0'+m:m) + ':' + (s<10?'0'+s:s));
  }
  
  // showBookMark = () => {
  //   this.setState({timemark: this.getAudioTimeString(this.state.playSeconds)});
  //   console.log(this.TAG + "timemark: " + this.state.timemark);
  // }

  componentDidMount(){
    console.log(this.TAG + "componentDidMount");
    this.load();

    //console.log(this.TAG + "current time: " + this.props.time);
    
    // 0.100초 마다 그려주기 위해...
    this.timeout = setInterval(() => {
      if(this.sound && this.sound.isLoaded() && this.state.playState == 'playing' && !this.sliderEditing){
        this.sound.getCurrentTime((seconds, isPlaying) => {
          this.setState({playSeconds: seconds});
        })
      }
    }, 100);
  }

  // 컴포넌트가 DOM 상에서 제거될 때 호출
  componentWillUnmount(){
    console.log(this.TAG + "componentWillUnmount");
    if(this.sound){
      this.sound.release();
      this.sound = null;
  }
    if(this.timeout){
      clearInterval(this.timeout);
    }
  }

  render(){
    console.log(this.TAG + "render");
    console.log(this.TAG + "playSeconds: " + this.state.playSeconds);

    const currentTimeString = this.getAudioTimeString(this.state.playSeconds);
    const durationString = this.getAudioTimeString(this.state.duration);

    return (
      <View style={styles.musicbarContainer}>
        <ImageBackground source={img_background} style={{width: '100%', height: '100%', justifyContent: 'center'}}>
          <View style={styles.rowContainer}>
            <Slider
            style={styles.slider}
            onTouchStart={this.onSliderEditStart}
            onTouchEnd={this.onSliderEditEnd}
            onValueChange={this.onSliderEditing}
            value={this.state.playSeconds}
            maximumValue={this.state.duration}
            maximumTrackTintColor={COLORS.grayLight}
            minimumTrackTintColor={COLORS.purple} 
            thumbTintColor={COLORS.red}
            />
            <View style={styles.columnContainer}>
              <TouchableOpacity onPress={this.jumpPrev10Seconds}>
                <Image source={img_before10} style={[styles.jumpButton, {marginBottom: 10}]}/>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.jumpPrev3Seconds}>
                <Image source={img_before3} style={[styles.jumpButton, {marginBottom: 10}]}/>
              </TouchableOpacity>

              <Text style={styles.timeText}>{currentTimeString}</Text>

              {this.state.playState == 'playing' && 
              <TouchableOpacity onPress={this.pause}>
                <Image source={img_pause} style={styles.playButton}/>
              </TouchableOpacity>}
              {this.state.playState == 'paused' && 
              <TouchableOpacity onPress={this.play}>
                <Image source={img_play} style={styles.playButton}/>
              </TouchableOpacity>}

              <Text style={styles.timeText}>{durationString}</Text>

              <TouchableOpacity onPress={this.jumpNext3Seconds}>
                <Image source={img_after3} style={[styles.jumpButton, {marginTop: 10}]}/>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.jumpNext10Seconds}>
                <Image source={img_after10} style={[styles.jumpButton, {marginTop: 10}]}/>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  musicbarContainer : {
    width: 70,
    elevation: 10,
  },
  columnContainer: {
    flexDirection:'column', 
    alignItems: 'center',
  },
  rowContainer: {
    flexDirection:'row', 
    // backgroundColor: COLORS.purple,
    alignItems: 'center',
    flex: 1,
  },
  playButton: {
    marginLeft: 50,
    marginVertical: 10,
    width:55, 
    height:55,
  },
  jumpButton: {
    width:18,
    height:24,
  },
  timeText: {
    color: COLORS.grayMiddle,
    fontSize: 10,
    fontFamily: FONTS.binggrae,
  },
  buttonText: {
    position:'absolute', 
    marginTop:1, 
    color:'white', 
    fontSize:12, 
    marginHorizontal:7
  },
  slider: {
    transform: [{rotate: '90deg'}, {translateY: -199}], 
    flexDirection: 'column',
    width: height-24,
    height: 20,
    // backgroundColor: COLORS.blue,
    marginLeft: -366,
  },
});

export default Musicbar;