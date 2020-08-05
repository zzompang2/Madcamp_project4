import React from 'react';
import {
  SafeAreaView, StyleSheet, View, FlatList, TouchableOpacity,
} from 'react-native';

import ChoreoItem from '../components/ChoreoItem';
import Musicbar from '../components/Musicbar';
import {COLORS} from '../values/Colors';

export default class ChoreoScreen extends React.Component {

  state = {
    choreoNote: [{
      lyrics: "사람들이 움직이는 게 ", 
      choreo: ["업락", "다운락", "다운락", "다운락", "다운락", "다운락"],
      time: 0,
    }, {
      lyrics: "신기해", 
      choreo: ["스쿠바", "스쿠바2"],
      time: 10,
    },{
      lyrics: "팔다리가 앞뒤로 막 움 움 움 움직이는 게", 
      choreo: ["스쿠비두"],
      time: 20,
    }],
    positionList: [
      [
        {posx: 10, posy:0, time: 0},
        {posx: 20, posy:0, time: 10},
        {posx: 30, posy:0, time: 20},
      ],
    ],
  }

  _makeChoreoItem = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate('formation')}>
        <ChoreoItem
        index={index}
        lyrics={item.lyrics} 
        choreo={item.choreo}
        position={[
          {posx: 320, posy:180},
          {posx: 0, posy: 0}
        ]}/>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.rowContainer}>
        <Musicbar/>
        <FlatList
        data={this.state.choreoNote}
        renderItem={this._makeChoreoItem}
        keyExtractor={item => item.lyrics}/>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  rowContainer : {
    flexDirection:'row',
    flex: 1,
    backgroundColor: COLORS.blackDark,
  },
  playerBar: {
    height: '100%', 
    width: 50, 
    justifyContent: 'center', 
    alignItems: 'center',
    resizeMode: 'contain',
  },
});