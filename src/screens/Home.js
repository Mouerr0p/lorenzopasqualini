import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList, ImageBackground} from 'react-native';
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
        console.log(this.props.dataItem);
        return(
            <View style= {styles.container}>
                <ImageBackground source={require('../../assets/bg.png')} style={styles.bg}>
                <Text> Home </Text>
                <FlatList
                    data= {this.state.posts}
                    keyExtractor= {post=> post.id.toString()}
                    renderItem= {({item})=> 
                        <Post dataItem={item}></Post>
                    }
                    style={styles.list}
                />
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },

    list:{
        width: '50%',
    },

    bg:{
        flex: 1,
        alignItems: 'center',
        width: '100%',
        height: '100%',      
    },
})