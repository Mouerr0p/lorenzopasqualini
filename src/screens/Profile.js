import React, {Component} from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet} from 'react-native';
import { auth, db } from '../firebase/config';

export default class CreatePost extends Component {
    constructor(props){
        super(props);
        this.state= {}
    }
    
    render(){
        return(
            <View style={styles.container}>
                <Text> Username: {auth.currentUser.displayName} </Text>
                <Text> E-Mail: {auth.currentUser.email} </Text>
            </View>
        )
    }
}

const styles= StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'left'
    }
})