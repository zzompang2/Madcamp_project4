import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

class ChoreoList extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    return <FlatList
    data={[
      {key: 'Devin'},
      {key: 'Dan'},
      {key: 'Dominic'},
      {key: 'Jackson'},
      {key: 'James'},
      {key: 'Joel'},
      {key: 'John'},
      {key: 'Jillian'},
      {key: 'Jimmy'},
      {key: 'Julie'},
    ]}
    />
  }
}