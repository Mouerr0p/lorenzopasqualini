import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal } from 'react-native'
import { auth, db } from '../firebase/config';
import firebase from 'firebase';

export default class Post extends Component{

    constructor(props){
        super(props);
        this.state = {
            liked: false,
            likes: 0,
            showModal: false,
        }
    }

    componentDidMount(){
        if (this.props.dataItem){
            if (this.props.dataItem.data.likes.length !== 0){
                this.setState({
                    likes: this.props.dataItem.data.likes.length
                })
                if (this.props.dataItem.data.likes.includes(auth.currentUser.email)){
                    this.setState({
                        liked: true
                    })
                }
            }
        }
    }

    onLike(){
        const posteoActualizar = db.collection('posts').doc(this.props.dataItem.id)
        
        posteoActualizar.update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then(()=> {
            this.setState({
                liked: true,
                likes: this.state.likes + 1
            })
        })
    }

    onDislike(){
        const posteoActualizar = db.collection('posts').doc(this.props.dataItem.id)
        
        posteoActualizar.update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(()=> {
            this.setState({
                liked: false,
                likes: this.state.likes - 1
            })
        })
    }

    
    showModal(){
        console.log('Mostrando modal')
        this.setState({
            showModal: true,
        })
    }
    
    
    closeModal(){
        console.log('Cerrando modal')
        this.setState({
            showModal: false,
        })
    }
    
    render(){

        console.log(this.props.dataItem);
        return(
            <View style={styles.container}>
                            <Image 
            style={styles.preview}
            source={{uri: this.props.dataItem.data.photo}}
            />
                <Text>{this.props.dataItem.data.description}</Text>
                <Text>{this.props.dataItem.data.createdAt}</Text>
                <Text>{this.props.dataItem.data.owner}</Text>
                <Text>Liked by {this.state.likes}</Text>
                {
                    !this.state.liked ?
                    <TouchableOpacity style={styles.like} onPress = {()=> this.onLike()}>
                        <Text>
                            Like
                        </Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.unlike} onPress = {()=> this.onDislike()}>
                        <Text>
                            Unlike
                        </Text>
                    </TouchableOpacity>
                }
                <TouchableOpacity onPress={()=>{this.showModal()}}>
                    <Text>
                        Ver comentarios
                    </Text>
                </TouchableOpacity>
                {
                    this.state.showModal ?

                        <Modal 
                        animationType = "fade"
                        transparent = {false}
                        visible = {this.state.showModal}
                        style = {styles.modal}
                        >
                            <View style={styles.modalView}>
                                <TouchableOpacity style={styles.closeModal} onPress={()=>{this.closeModal()}}>
                                        <Text style={styles.modalText}> X </Text>
                                </TouchableOpacity>
                                <Text>
                                    Pondriamos los comments  
                                </Text>
                                <Text>
                                    Posible comment
                                </Text>
                            </View>

                        </Modal>
                        :
                        null
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        height: 200,
    
    },
    container:{
        flex: 1,
        justifyContent: 'center',
        padding: 5,
        width: 750,
        margin: 25,
        backgroundColor: 'gainsboro',
        borderRadius: 4
    },
    
    closeModal:{
        alignSelf: 'flex-end',
        padding: 10,
        backgroundColor: 'salmon',
        marginTop:2,
        marginBotom: 10,
        borderRadius: 4,
    },

    modalText:{
        fontWeight: 'bold',
        color:'#fff',
    },

    modalView:{
        backgroundColor: 'lightblue',
        borderRadius: 4,
    },

    modal:{
        border: 'none',
    },

    like:{
        backgroundColor: 'lightgreen',
        color: 'white',
        borderRadius: 4,
        textAlign: 'center'
    },

    unlike:{
        backgroundColor: 'salmon',
        color: 'white',
        borderRadius: 4,
        textAlign: 'center'
    },

    preview: {
        width: '100%',
        height: '100%'
    },
})