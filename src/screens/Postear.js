import React, {Component} from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet} from 'react-native';
import { auth, db } from '../firebase/config';

export default class CreatePost extends Component {
    constructor(props){
        super(props);
        this.state= {
            comment: ''
        }
    }

    handlePost(){
        db.collection('posts').add({
            owner: auth.currentUser.displayName,
            description: this.state.comment,
            email: auth.currentUser.email,
            createdAt: Date.now(),
            likes: [],
            comments: []
        })
        .then(response=> {
            console.log(response);
            alert('Posteo realizado!');
            this.setState({
                comment: ''
            })
            console.log(this.props);
            this.props.navigation.navigate('Home');
        })
        .catch(e=> {
            console.log(e);
            alert('Se produjo un error');
        })
    }
    
    render(){
        return(
            <View style={styles.container}>
                <TextInput
                    style={styles.field}
                    keyboardType= 'default'
                    placeholder= 'Publicá tu comentario!'
                    multiline= {true}
                    numberOfLines= {4}
                    onChangeText= {text => this.setState({ comment: text })}
                    value = {this.state.comment}
                />
                <TouchableOpacity style= {styles.button} onPress={()=> this.handlePost()}>
                    <Text style= {styles.text}> Publicar </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles= StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    field: {
        width: '80%',
        backgroundColor: 'white',
        color: 'black',
        padding: 10,
        marginVertical: 10
    },
    button: {
        width: '40%',
        backgroundColor: 'salmon',
        textAlign: 'center',
        padding: 10,
    },
    text: {
        color: 'white',
        fontSize: 20
    }
})