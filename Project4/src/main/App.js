import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
} from 'react-native';

import ChoreoItem from '../components/ChoreoItem';

class App extends React.Component {

  state = {
    choreoNote: [{
      lyrics: "잘 있나요~", 
      formation: "나의 사랑아", 
      choreo: require('../../asset/btn_delete.png')
    }, {
      lyrics: "보고 싶은", 
      formation: "나의 사람아~", 
      choreo: require('../../asset/btn_delete.png')
    }]
  }

  _makeChoreoItem = ({item, index}) => {
    return (
      <ChoreoItem
      lyrics={item.lyrics} 
      formation={item.formation} 
      choreo={item.choreo}/>
    )
  }

  render() {
    console.log("ham");
    return (
      <View>
        {/* <ChoreoItem lyrics={this.state.choreoNote[0].lyrics} formation={this.state.choreoNote[0].formation} choreo={this.state.choreoNote[0].choreo}/>
        <ChoreoItem lyrics={this.state.choreoNote[1].lyrics} formation={this.state.choreoNote[1].formation} choreo={this.state.choreoNote[1].choreo}/> */}
        <FlatList
        data={this.state.choreoNote}
        renderItem={this._makeChoreoItem}/>
      </View>
    );
  }
  
  /*
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Step One</Text>
              <Text style={styles.sectionDescription}>
                Edit <Text style={styles.highlight}>App.js</Text> to change this
                screen and then come back to see your edits.
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>See Your Changes</Text>
              <Text style={styles.sectionDescription}>
                <ReloadInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Debug</Text>
              <Text style={styles.sectionDescription}>
                <DebugInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Learn More</Text>
              <Text style={styles.sectionDescription}>
                Read the docs to discover what to do next:
              </Text>
            </View>
            <LearnMoreLinks />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
  */
};

const styles = StyleSheet.create({
  
});

export default App;
