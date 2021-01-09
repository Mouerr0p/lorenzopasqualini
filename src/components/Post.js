import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, Modal } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { auth, db } from '../firebase/config';
import firebase from 'firebase';

export default class Post extends Component{
    constructor(props){
        super(props);
        this.state={
            liked: false,
            likes: 0,
            showModal: false
        }
    }

    componentDidMount(){
        if(this.props.dataItem){
            if(this.props.dataItem.data.likes.length !== 0){
                this.setState({
                    likes: this.props.dataItem.data.likes.length
                })
                if(this.props.dataItem.data.likes.includes(auth.currentUser.email)){
                    this.setState({
                        liked: true
                    })
                }
            }
        }
    }

    onLike(){
        const postUpdate= db.collection('posts').doc(this.props.id)
        postUpdate.update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then(()=>{
            this.setState({
                liked: true,
                likes: this.state.likes + 1
            })
        })
    }

    onUnlike(){
        const postUpdate= db.collection('posts').doc(this.props.dataItem.id)
        postUpdate.update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(()=>{
            this.setState({
                liked: false,
                likes: this.state.likes - 1
            })
        })
    }

    showModal(){
        this.setState({
            showModal: true
        })
    }

    closeModal(){
        this.setState({
            showModal: false
        })
    }

    render(){
        console.log(this.props.dataItem);
        return(
            <View stlye={styles.container}>
                <Text>{this.props.dataItem.data.description}</Text>
                <Text>{this.props.dataItem.data.createdAt}</Text>
                <Text>{this.props.dataItem.data.owner}</Text>
                <Text> Liked by {this.state.likes} users </Text>
                {
                    !this.state.liked ?
                    <TouchableOpacity onPress= {()=> this.onLike()}>
                        <Text> Like </Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress= {()=> this.onUnlike()}>
                        <Text> Unlike </Text>
                    </TouchableOpacity>
                }

                <TouchableOpacity onPress= {()=> this.showModal()}>
                    <Text> Ver comentarios </Text>
                </TouchableOpacity>
                {
                    this.state.showModal ?
                    <Modal visible={this.state.showModal} animationType= 'fade' transparent={false} style={styles.modal}>
                        <View>
                            <TouchableOpacity onPress= {()=>this.closeModal()}>
                                <Text> X </Text>
                            </TouchableOpacity>
                            <Text>
                                Aquí irán los comentarios
                            </Text>
                            <Text>
                                Para agregar comentarios
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
    image:{
        height: 200,
    },
    container:{
        flex: 1,
        justifyContent: 'center',
        padding: 5,
    },
    modal:{
        backgroundColor: 'green'
    }
})