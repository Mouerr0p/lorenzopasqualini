import React, {Component} from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet, Image, ImageBackground} from 'react-native';
import { auth, db } from '../firebase/config';
import MyCamera from '../components/MyCamera';

export default class CreatePost extends Component {
    constructor(props){
        super(props);
        this.state= {
            comment: '',
            photo: '',
            showCamera: true
        }
    }

    handlePost(){
        db.collection('posts').add({
            owner: auth.currentUser.displayName,
            description: this.state.comment,
            email: auth.currentUser.email,
            createdAt: Date.now(),
            likes: [],
            comments: [],
            photo: this.state.photo
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

    guardarFoto(url){
        this.setState({
            photo: url,
            showCamera: false,
        })
    }
    
    render(){
        return(
            <>
            {this.state.showCamera ? 
            <MyCamera savePhoto = {(url)=>this.guardarFoto(url)}/>
            :
            <>
            <View style={styles.container}>
            <ImageBackground source={require('../../assets/bg.png')} style={styles.bg}>
                <Image
                    source ={{uri: this.state.photo}}
                    style = {styles.preview}
                />
                <TextInput
                    style={styles.field}
                    keyboardType='default'
                    placeholder="Publicá tu comentario"
                    multiline={true}
                    numberOfLines = {2}
                    onChangeText={text => this.setState({ comment: text })}
                    value = {this.state.comment}
                />
                <TouchableOpacity style = {styles.button} onPress={() => this.handlePost()}>
                    <Text style = {styles.text}> Post </Text>
                </TouchableOpacity>
            </ImageBackground>
            </View>
            </>
            }
            </>
        )
    }
}

const styles= StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },

    field: {
        width: '50%',
        backgroundColor: 'white',
        color: 'black',
        margin: 10
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
    },

    bg: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        height: '100%'        
    },

    preview:{
        width: '50%',
        height: '50%',
        margin: 4,
        borderRadius: 10
    }
})