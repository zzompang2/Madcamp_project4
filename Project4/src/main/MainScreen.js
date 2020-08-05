import React from 'react';
import {
  StyleSheet, View, FlatList, Text, TouchableOpacity,
} from 'react-native';

import {COLORS} from '../values/Colors';
import {FONTS} from '../values/Fonts';

export default class MainScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      noteList: [
        {
          title: "2019 봄 정기공연",
          music: "악동뮤지션_사람들이 움직이는게",
          date: "2019/06/11",
        }, {
          title: "2019 가을 정기공연", 
          music: "이승기_원하고 원망하죠",
          date: "2019/11/28",
        }, {
          title: "2020 락킹 캠프", 
          music: "임창정_소주 한 잔",
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
              <View style={styles.rowContainer}>
                <Text numberOfLines={1} style={styles.title}>{item.title}</Text>
                <View style={styles.columnContainer}>
                  <Text numberOfLines={1} style={styles.music}>{item.music}</Text>
                  <Text numberOfLines={1} style={styles.date}>{item.date}</Text>
                </View>
              </View>
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
    flex: 1,
    backgroundColor: COLORS.blackDark,
  },
  rowContainer: {
    flexDirection:'row',
    flex: 1,
    justifyContent: 'space-between',
    marginLeft: 15,
    marginRight: 15,
    padding: 9,
    borderBottomWidth: 0.8,
    borderBottomColor: COLORS.grayDark,
  },
  columnContainer: {
    flexDirection:'column',
    alignItems: 'flex-end',
  },
  title: {
    color: COLORS.white, 
    fontSize:18,
    flex: 1,
    fontFamily: FONTS.binggrae2_bold,
  },
  music: {
    color: COLORS.red, 
    fontSize:12,
    width: 250,
    paddingLeft: 10,
    textAlign: 'right',
    fontFamily: FONTS.binggrae2,
  },
  date: {
    color: COLORS.grayDark, 
    fontSize:12,
    paddingLeft: 10,
    fontFamily: FONTS.binggrae2,
  }
});