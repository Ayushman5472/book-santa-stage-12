import React, { Component} from 'react';
import {StyleSheet, View, Text,TouchableOpacity, Image} from 'react-native';
import { DrawerItems} from 'react-navigation-drawer';
import {Avatar} from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker'
import firebase from 'firebase';

export default class CustomSideBarMenu extends Component{
  constructor(){
    super()
    this.state={
      Image:'#',
      Name: '',
      docID:'',
      userID:firebase.auth().currentUser.email
    }
  }
  SelectPic=async()=>{
    const {cancelled,uri} = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect:[4,3], 
      quality:1,
    })
    if (!cancelled)
    {
      this.setState({
        Image: uri
      })
      this.uploadImage(uri, this.state.userID)
    }
  }
  uploadImage=async(uri, imageName)=>{
    var response = await fetch (uri)
    var blob = await response.blob()
    var ref = firebase.storage().ref().child('userProfiles/'+ imageName)
    return ref.put(blob).then({response}=()=>{
    this.fetchImage(imageName)
    })
    }
    fetchImage=(imageName)=>{
    var storageRef = firebase.storage().ref().child('userProfiles/'+ imageName)
    storageRef.getDownloadURL().then(URL=>{
      this.setState({
        Image: URL
      })
    }).catch(error=>{
      this.setState({
        Image:'#'
      })
    })
    }
    componentDidMount(){
    this.fetchImage(this.state.userID)
    }
  render(){
    return(
      <View style={{flex:1}}>
        <View style={{flex: 0.5, alignItems: 'center', backgroundColor: 'orange'}}>
          <Avatar rounded
          source={{uri:this.state.Image}}
          size='medium'
          onPress={
          ()=>{
          this.SelectPic()
          }  
          }
          containerStyle={{flex:0.75, width: '40%', height:'20%', marginLeft: 1, marginTop: 1, borderRadius: 10}}
          showEditButton
          />
        
 </View>
        <View style={styles.drawerItemsContainer}>
          <DrawerItems {...this.props}/>
        </View>
        <View style={styles.logOutContainer}>
          <TouchableOpacity style={styles.logOutButton}
          onPress = {() => {
              this.props.navigation.navigate('WelcomeScreen')
              firebase.auth().signOut()
          }}>
            <Text>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container : {
    flex:1
  },
  drawerItemsContainer:{
    flex:0.8
  },
  logOutContainer : {
    flex:0.2,
    justifyContent:'flex-end',
    paddingBottom:30
  },
  logOutButton : {
    height:30,
    width:'100%',
    justifyContent:'center',
    padding:10
  },
  logOutText:{
    fontSize: 30,
    fontWeight:'bold'
  }
})
