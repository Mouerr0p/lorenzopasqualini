import React, { Component }  from "react";
import {View, StyleSheet, FlatList, TextInput, ImageBackground} from "react-native";
import Post from '../components/Post';
import { db } from '../firebase/config';

export default class Buscador extends Component{
    constructor (props){
        super(props);
        this.state = {
            posts: [],
        }
    }

    onSearch(text){
        db.collection("posts")
        .where("email", "==", text)
        .get()
            .then(docs=>{
                let postsAux= []
                docs.forEach(doc=>{
                    postsAux.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                this.setState({
                    posts: postsAux
                })
            })
    }

    render(){
        console.log(this.state.posts);
        return(
            <View style={styles.container}>
            <ImageBackground source={require('../../assets/bg.png')} style={styles.bg}>
                <TextInput style={styles.container}
                    style={styles.field}
                    keyboardType = 'default'
                    placeholder = 'Search by user'
                    onChangeText = {text => this.onSearch({ posts: text})}
                />
                <FlatList
                    data = {this.state.posts}
                    keyExtractor = {post=> post.id.toString()}
                    renderItem = {({item})=>
                        <Post dataItem={item}></Post>
                    }
                />
            </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    bg: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        height: '100%'        
    },

    field: {
        width: '80%',
        backgroundColor: 'white',
        padding: 8,
        margin: 8,
        borderRadius: 8,
    },
})