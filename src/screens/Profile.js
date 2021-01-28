import React, { Component } from "react";
import { Text, View, StyleSheet, ImageBackground } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { auth, db } from "../firebase/config";
import Post from "../components/Post";

export default class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            posts: [],
        };
    }

    componentDidMount(){
        db.collection("posts")
        .where("owner", "==", auth.currentUser.displayName)
        .orderBy("createdAt", "desc")
        .onSnapshot(
            (docs)=>{
                let postsAux= [];
                docs.forEach((doc)=>{
                    postsAux.push({
                        id: doc.id,
                        data: doc.data(),
                    });
                });
                this.setState({
                    posts: postsAux,
                })
            }
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={require('../../assets/bg.png')} style={styles.bg}>
                <Text style={styles.text}>Usuario: {auth.currentUser.displayName}</Text>
                <Text style={styles.text}>E-mail: {auth.currentUser.email}</Text>
                <Text style={styles.text}>Último ingreso: {auth.currentUser.metadata.lastSignInTime}</Text>
                <Text style={styles.text}>Posts: {this.state.posts.length}</Text>{" "}
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.props.handleLogout()}
                >
                    <Text style={styles.text}> Logout </Text>
                </TouchableOpacity>
                <FlatList
                    data={this.state.posts}
                    keyExtractor={(post)=> post.id.toString()}
                    renderItem={({ item })=> <Post dataItem={item}></Post>}
                    style={styles.list}
                />
                </ImageBackground>
            </View>
        );
    }

}

const styles= StyleSheet.create({
    bg:{
        flex: 1,
        alignItems: 'center',
        width: '100%',
        height: '100%',      
    },
    container: {
        flex: 1,
    },
    list:{
        width: '50%',
        margin: 10
    },
    button: {
        width: "100%",
        borderRadius: 4,
        backgroundColor: "salmon",
        padding: 10,
    },
    text: {
        color: "white",
    },
})

