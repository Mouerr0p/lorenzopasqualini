import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal } from 'react-native'
import { auth, db } from '../firebase/config';
import firebase from 'firebase';
import Comments from '../components/Comments';

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
                <View style={styles.previewView}>
                    <Image 
                    style={styles.preview}
                    source={{uri: this.props.dataItem.data.photo}}
                    />
                </View>

                <Text style={styles.desc}>{this.props.dataItem.data.description}</Text>
                <Text style={styles.descUser}>{this.props.dataItem.data.owner}</Text>
                <Text style={styles.desc}>{this.props.dataItem.data.createdAt}</Text>
                <Text style={styles.desc}>Liked by {this.state.likes}</Text>

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

                {this.props.dataItem.data.owner == auth.currentUser.displayName ? (
                <TouchableOpacity
                    onPress={()=>
                        this.props.deletePost(this.props.dataItem.data.createdAt)
                    }
                    style={styles.delete}
                > Delete?
                </TouchableOpacity>
                )
                : null
                }

                <TouchableOpacity onPress={()=>{this.showModal()}}>
                    <Text style={styles.desc}>
                        Ver comentarios
                    </Text>
                </TouchableOpacity>
                {
                    this.state.showModal ?
                        <Modal 
                        animationType = 'fade'
                        transparent = {false}
                        visible = {this.state.showModal}
                        style = {styles.modal}
                        >
                            <View style={styles.modalView}>
                                <TouchableOpacity style={styles.closeModal} onPress={()=>{this.closeModal()}}>
                                        <Text style={styles.desc}> X </Text>
                                </TouchableOpacity>
                                <Comments
                                comments={this.props.dataItem.data.comments}
                                postId={this.props.dataItem.id}
                                />
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
    container:{
        flex: 1,
        justifyContent: 'center',
        padding: 10,
        margin: 10,
    },
    
    closeModal:{
        alignSelf: 'flex-end',
        padding: 10,
        backgroundColor: 'salmon',
        marginTop: 2,
        marginBotom: 10,
        borderRadius: 4,
    },

    modalText:{
        fontWeight: 'bold',
        color: 'white',
    },

    modalView:{
        backgroundColor: 'lightblue',
        borderRadius: 4,
        padding: 4,
    },

    modal:{
        border: 'none',
        width: '100%',
    },

    like:{
        backgroundColor: 'lightgreen',
        borderRadius: 4,
        textAlign: 'center',
        padding: 8,
    },

    unlike:{
        backgroundColor: 'salmon',
        borderRadius: 4,
        textAlign: 'center',
        padding: 8,
    },

    previewView:{
        width: '50%',
    },
    
    preview: {
        width: '100%',
        height: 500,
        borderRadius: 10,
    },

    desc:{
        color: 'white',
        margin: 4,
    },

    descUser:{
        color: 'white',
        margin: 4,
        fontWeight: 'bold',
    },

    delete:{
        fontFamily: 'Arial',
        color: 'white',
        textAlign: 'center',
        backgroundColor: 'red',
        borderRadius: 8,
        margin: 8,
        padding: 4,
        width: '10%',
    },
})
