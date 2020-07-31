import React, {Component} from "react";
import {StyleSheet, Text, View, Image, ListView} from "react-native";

const styles=StyleSheet.create({
    choreoItem: {
        flexDirection: "row",
        backgroundColor: "black",
        borderBottomColor: "orange",
        borderBottomWidth: 2,
        padding: 5,
        heignh: 170,
    },
    lyrics: {
        backgroundColor: "red",
        fontSize: 15,
        fontWeight: "bold"
    },
    formation: {
        backgroundColor: "yellow",
        flex: 1,
        heignh: 150,
        resizeMode: "contain",
    },
    choreo: {
        backgroundColor: "green",
        flex: 3,
        heignh: 150,
        resizeMode: "contain",
    }
});

class ChoreoItem extends Component{
    render() {
        return (
            <View style={styles.choreoItem}>
                <Text style={styles.lyrics}>{this.props.lyrics}</Text>
                <Image style={styles.formation} source={{uri: this.props.formationURL}}/>
                <Image style={styles.choreo} source={{uri: this.props.choreoURL}}/>
            </View>
        );
    }
}

export default ChoreoItem;