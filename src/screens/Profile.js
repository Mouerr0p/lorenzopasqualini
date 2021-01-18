import React, {Component} from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet, ImageBackground} from 'react-native';
import { auth, db } from '../firebase/config';

export default class CreatePost extends Component {
    constructor(props){
        super(props);
        this.state= {}
    }
    
    render(){
        return(
            <View style={styles.container}>
            <ImageBackground source={require('../../assets/bg.png')} style={styles.image}>
                <Text style={styles.profile}> Username: {auth.currentUser.displayName} </Text>
                <Text style={styles.profile}> E-Mail: {auth.currentUser.email} </Text>
                <TouchableOpacity style= {styles.button} onPress={()=> this.props.handleLogout()}>
                    <Text style= {styles.text}> Logout </Text>
                </TouchableOpacity>
            </ImageBackground>
            </View>
        )
    }
}

const styles= StyleSheet.create({
    container: {
        flex: 1
    },

    button: {
        width: '40%',
        backgroundColor: 'salmon',
        textAlign: 'center',
        padding: 10,
    },

    text: {
        color: 'white',
        fontSize: 15
    },

    image: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },

    profile:{
        margin: 10,
        color: 'white'
    }
})