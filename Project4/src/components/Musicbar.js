import React from 'react';
import {
  SafeAreaView,View,Text,Image,TouchableOpacity,Alert,StyleSheet,Dimensions
} from 'react-native';

import Sound from 'react-native-sound';
import Slider from '@react-native-community/slider';
import {COLORS} from '../values/Colors';

// 화면의 가로, 세로 길이 받아오기
const {width,height} = Dimensions.get('window')

//음악재생image 설정
const img_pause = require('../../assets/drawable/ui_pause.png');
const img_play = require('../../assets/drawable/ui_play.png');
const img_playjumpleft = require('../../assets/drawable/ui_playjumpleft.png');
const img_playjumpright = require('../../assets/drawable/ui_playjumpright.png');

//음악재생바
class Musicbar extends React.Component{

  constructor(props){
    super(props);
    console.log("Musicbar/constructor")
    this.state = {
      playState: 'paused', //playing, paused
      playSeconds: this.props.time,
      duration: 0,
      timemark: 'default'
    }
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
    console.log('[Play]', filepath);

    this.sound = new Sound('madclown.mp3', filepath, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        Alert.alert('Notice', 'audio file error. (Error code : 1)');
        this.setState({playState:'paused'});
      }
      else{
        this.setState({playState:'paused', duration:this.sound.getDuration()});
      }
    });  
  }

  play = async () => {
    console.log(this.TAG + "play");
    if(this.sound){
      this.sound.play(this.playComplete);
      this.setState({playState:'playing'});
      // 애니메이션 실행을 위해 전달.
      if(this.props.playAnimation != undefined)
        this.props.playAnimation(true);
    }else{
      this.load();
      this.play();
    }
  }
  playComplete = (success) => {
    //console.log(this.TAG + "playComplete");
    if(this.sound){
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
        Alert.alert('Notice', 'audio file error. (Error code : 2)');
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
    if(this.props.onSearchSubmit != undefined){
      this.props.onSearchSubmit(this.state.playSeconds);
    }
  }

  jumpPrev3Seconds = () => {this.jumpSeconds(-3);}
  jumpNext3Seconds = () => {this.jumpSeconds(3);}
  jumpSeconds = (secsDelta) => {
    if(this.sound){
      this.sound.getCurrentTime((secs, isPlaying) => {
        let nextSecs = secs + secsDelta;
        if(nextSecs < 0) nextSecs = 0;
        else if(nextSecs > this.state.duration) nextSecs = this.state.duration;
        this.sound.setCurrentTime(nextSecs);
        this.setState({playSeconds:nextSecs});
        
        if(this.props.onSearchSubmit != undefined){
          this.props.onSearchSubmit(this.state.playSeconds);
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
  
  showBookMark = () => {
    this.setState({timemark:this.getAudioTimeString(this.state.playSeconds)});
    console.log(this.state.timemark);
  }

  render(){
    console.log(this.TAG + "render");
    console.log(this.TAG + "playSeconds: " + this.state.playSeconds);

    const currentTimeString = this.getAudioTimeString(this.state.playSeconds);
    const durationString = this.getAudioTimeString(this.state.duration);

    return (
      <View style={styles.musicbarContainer}>
        <Text style={{color:'white'}}>{currentTimeString}</Text>
        <Slider
          style={styles.slider}
          onTouchStart={this.onSliderEditStart}
          onTouchEnd={this.onSliderEditEnd}
          onValueChange={this.onSliderEditing}
          value={this.state.playSeconds} 
          maximumValue={this.state.duration} 
          maximumTrackTintColor='gray' 
          minimumTrackTintColor='white' 
          thumbTintColor='white'
          />
        <Text style={{color:'white'}}>{durationString}</Text>
        {this.state.playState == 'playing' && 
        <TouchableOpacity onPress={this.pause} style={styles.button}>
          <Image source={img_pause} style={styles.button}/>
        </TouchableOpacity>}
        {this.state.playState == 'paused' && 
        <TouchableOpacity onPress={this.play} style={styles.button}>
          <Image source={img_play} style={{width:20, height:20}}/>
        </TouchableOpacity>}
        <TouchableOpacity onPress={this.jumpPrev3Seconds} style={{justifyContent:'center'}}>
          <Image source={img_playjumpleft} style={styles.button}/>
          <Text style={styles.buttonText}>3</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.jumpNext3Seconds} style={{justifyContent:'center'}}>
          <Image source={img_playjumpright} style={styles.button}/>
          <Text style={styles.buttonText}>3</Text>
        </TouchableOpacity>
      </View>
    )
  }
  componentDidMount(){
    console.log(this.TAG + "componentDidMount");
    this.load();

    //console.log(this.TAG + "current time: " + this.props.time);
    
    this.timeout = setInterval(() => {
      if(this.sound && this.sound.isLoaded() && this.state.playState == 'playing' && !this.sliderEditing){
        this.sound.getCurrentTime((seconds, isPlaying) => {
          this.setState({playSeconds:seconds});
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
}

const styles = StyleSheet.create({
  musicbarContainer : {
    //marginVertical:15, 
    //marginHorizontal:15, 
    padding: 5,
    flexDirection:'column', 
    backgroundColor: COLORS.blackDark,
    //flex: 1,
    alignItems: 'center',
    width: 50,
    elevation: 10,
  },
  button: {
    marginVertical: 3,
    width:20, 
    height:20,
  },
  buttonText: {
    position:'absolute', 
    marginTop:1, 
    color:'white', 
    fontSize:12, 
    marginHorizontal:7
  },
  slider: {
    transform: [{rotate: '90deg'}], 
    flex: 1,
    flexDirection: 'column',
    width: height-140, 
    height: 20,
  },
});

export default Musicbar;