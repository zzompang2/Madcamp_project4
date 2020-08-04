import React from 'react';
import {
  StyleSheet, View, FlatList, Text, TouchableOpacity,
} from 'react-native';

import {COLORS} from '../values/colors';

export default class MainScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      noteList: [
        {
          title: "2019 봄 정기공연", 
          date: "2019/06/11",
        }, {
          title: "2019 가을 정기공연", 
          date: "2019/11/28",
        }, {
          title: "2020 락킹 캠프", 
          date: "2020/01/08",
        }
      ]
    }
  }
  
  render() {
    return (
      <View style={styles.container}>
        <FlatList
        data={this.state.noteList}
        renderItem={({item}) => {
          return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('choreo')}>
              <Text style={styles.title}>{item.title}</Text>
            </TouchableOpacity>
          )
        }}
        keyExtractor={(item, index) => index.toString()}/>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    height: '100%', 
    width: '100%',
    flexDirection:'row',
    flex: 1,
    backgroundColor: COLORS.blackLight,
  },
  title: {
    color: COLORS.white, 
    fontSize:20,
    padding: 10,
  }
});