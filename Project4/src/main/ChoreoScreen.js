import React from 'react';
import {
  SafeAreaView, StyleSheet, View, FlatList, TouchableOpacity,
} from 'react-native';

import ChoreoItem from '../components/ChoreoItem';
import Musicbar from '../components/Musicbar';
import {COLORS} from '../values/colors';

export default class ChoreoScreen extends React.Component {

  state = {
    choreoNote: [{
      lyrics: "사람들이 움직이는 게 ", 
      formation: require('../../asset/formation_1.png'),
      choreo: ["업락", "다운락", "다운락", "다운락", "다운락", "다운락"]
    }, {
      lyrics: "신기해", 
      formation: require('../../asset/formation_1.png'),
      choreo: ["스쿠바"]
    },{
      lyrics: "팔다리가 앞뒤로 막 움 움 움 움직이는 게", 
      formation: require('../../asset/formation_1.png'),
      choreo: ["스쿠바"]
    }]
  }

  _makeChoreoItem = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate('formation')}>
        <ChoreoItem
        index={index}
        lyrics={item.lyrics} 
        formation={item.formation} 
        choreo={item.choreo}/>
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
    backgroundColor: COLORS.blackLight,
  },
  playerBar: {
    height: '100%', 
    width: 50, 
    justifyContent: 'center', 
    alignItems: 'center',
    resizeMode: 'contain'

  },
});