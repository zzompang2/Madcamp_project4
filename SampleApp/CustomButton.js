// CustomButton.js
import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

export default class CustomButton extends Component{
	// defaultProps: 부모 컴포넌트에서 속성을 입력하지 않았을 때 기본 값으로 동작.
  static defaultProps = {
    title: 'untitled',
    buttonColor: '#000',
    titleColor: '#fff',
    onPress: () => null,
  }
  
	constructor(props){
    super(props);
  }

  render(){
    return (
      <TouchableOpacity style={[
				styles.button,
				{backgroundColor: this.props.buttonColor}
				]}
				onPress={this.props.onPress}>
        	<Text style={[
						styles.title,
					{color: this.props.titleColor}
					]}>{this.props.title}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  button: {
		flex: 1,
		width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
		marginBottom: 10,
		borderRadius: 5,
  },
  title: {
    fontSize: 15,
  },
});