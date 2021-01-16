import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import Post from '../components/Post';
import { db } from '../firebase/config';

export default class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            posts: []
        }
    }
    componentDidMount(){
        db.collection('posts').orderBy("createdAt", "desc").onSnapshot(
            docs=> {
                let postsAux= []
                docs.forEach(doc=> {
                    postsAux.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                this.setState({
                    posts: postsAux
                })
            }
        )
    }

    render(){
        console.log(this.state.posts);
        return(
            <View style= {styles.container}>
                <Text> Home </Text>
                <FlatList
                data= {this.state.posts}
                keyExtractor= {post=> post.id.toString()}
                renderItem= {({item})=> 
                    <Post dataItem= {item}></Post> }
                />
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
        color: 'black',
        padding: 10,
        marginVertical: 10
    }
})