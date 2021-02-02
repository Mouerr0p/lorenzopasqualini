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
        db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(
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

    deletePost(param){
        db.collection('posts')
          .where('createdAt', '==', param)
          .get()
          .then(data=> {
            data.forEach(doc=> doc.ref.delete());
            const postsFiltered= this.state.posts.filter(
              post=> post.createdAt != param
            );
            this.setState({ posts: postsFiltered });
          });
      }

    render(){
        console.log(this.props.dataItem);
        return(
            <View style= {styles.container}>
                <ImageBackground source={require('../../assets/bg.png')} style={styles.bg}>
                <FlatList
                    data= {this.state.posts}
                    keyExtractor= {post=> post.id.toString()}
                    renderItem= {({item})=> 
                        <Post
                        dataItem={item}
                        deletePost={createdAt=> this.deletePost(createdAt)}
                        ></Post>
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
        width: '100%',
    },

    bg:{
        width: '100%',
        height: '100%',      
    },
})
