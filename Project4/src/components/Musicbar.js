import React from 'react';
import {
  SafeAreaView,View,Text,Image,TouchableOpacity,Alert,StyleSheet
} from 'react-native';

import Sound from 'react-native-sound';
import Slider from '@react-native-community/slider';

//음악재생image 설정
const img_pause = require('../../asset/ui_pause.png');
const img_play = require('../../asset/ui_play.png');
const img_playjumpleft = require('../../asset/ui_playjumpleft.png');
const img_playjumpright = require('../../asset/ui_playjumpright.png');

//음악재생바
class Musicbar extends React.Component{

  constructor(){
    super();
    this.state = {
      playState: 'paused', //playing, paused
      playSeconds: 0,
      duration: 0,
      timemark: 'default'
    }
    this.sliderEditing = false;
  }

  componentDidMount(){
    this.play();
    
    this.timeout = setInterval(() => {
      if(this.sound && this.sound.isLoaded() && this.state.playState == 'playing' && !this.sliderEditing){
        this.sound.getCurrentTime((seconds, isPlaying) => {
          this.setState({playSeconds:seconds});
        })
      }
    }, 100);
  }
  componentWillUnmount(){
    if(this.sound){
      this.sound.release();
      this.sound = null;
  }
    if(this.timeout){
      clearInterval(this.timeout);
    }
  }

  onSliderEditStart = () => {
    this.sliderEditing = true;
  }
  onSliderEditEnd = () => {
    this.sliderEditing = false;
  }
  onSliderEditing = value => {
    if(this.sound){
      this.sound.setCurrentTime(value);
      this.setState({playSeconds:value});
    }
  }

  play = async () => {
    if(this.sound){
      this.sound.play(this.playComplete);
      this.setState({playState:'playing'});
    }else{
      //const filepath = this.props.navigation.state.params.filepath;
      //const filepath = 'file:///Phone/sdcard/Music/madclown.mp3';
      const filepath = Sound.MAIN_BUNDLE;
      console.log('[Play]', filepath);

      this.sound = new Sound('madclown.mp3',filepath, (error) => {
        if (error) {
          console.log('failed to load the sound', error);
          Alert.alert('Notice', 'audio file error. (Error code : 1)');
          this.setState({playState:'paused'});
        }else{
          this.setState({playState:'playing', duration:this.sound.getDuration()});
          this.sound.play(this.playComplete);
        }
      });    
    }
  }
  playComplete = (success) => {
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
    if(this.sound){
      this.sound.pause();
    }

    this.setState({playState:'paused'});
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

    const currentTimeString = this.getAudioTimeString(this.state.playSeconds);
    const durationString = this.getAudioTimeString(this.state.duration);

    return (
      <View style={styles.container}>
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

        <View style={{backgroundColor:'red'}}>
          <TouchableOpacity onPress={this.showBookMark}>
            <Text>move1</Text>
          </TouchableOpacity>
          <Text>{this.state.timemark}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container : {
    //justifyContent:'center', 
    backgroundColor:'black', 
    flexDirection:'row',
    //flex: 1,
  },
  musicbarContainer : {
    //marginVertical:15, 
    //marginHorizontal:15, 
    padding: 5,
    flexDirection:'column', 
    backgroundColor:'blue',
    //flex: 1,
    alignItems: 'center',
    width: 50,
  },
  button: {
    marginVertical: 3,
    //backgroundColor: "pink",
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
    width: 220, 
    height: 20,
    //backgroundColor: 'purple',
  },
});

export default Musicbar;