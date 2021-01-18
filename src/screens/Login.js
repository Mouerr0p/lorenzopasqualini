import React, { Component } from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet, ImageBackground} from 'react-native';
import { auth } from '../firebase/config';

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }

    render() {
        console.log(this.state.loggedIn);
        return (
            <View style= {styles.container}>
                <ImageBackground source={require('../../assets/bg.png')} style={styles.image}>
                <Text style= {styles.text}> Login </Text>
                <TextInput
                    style= {styles.field}
                    keyboardType= 'email-address'
                    placeholder= 'E-Mail'
                    onChangeText= {text=> this.setState({ email: text })}
                />
                <TextInput
                    style={styles.field}
                    keyboardType= 'number-pad'
                    placeholder= 'Password'
                    secureTextEntry= {true}
                    onChangeText= {text => this.setState({ password: text })}
                />
                <TouchableOpacity style= {styles.button} onPress={()=> this.props.handleLogin(this.state.email, this.state.password)}>
                    <Text style= {styles.text}> Login </Text>
                </TouchableOpacity>
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },

    field: {
        width: '80%',
        backgroundColor: 'white',
        padding: 10,
        marginVertical: 10
    },

    button: {
        width: '30%',
        backgroundColor: 'salmon',
        textAlign: 'center',
        padding: 10,
    },

    text: {
        color: 'white',
        fontSize: 20
    },

    image: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        height: '100%'        
    },
})