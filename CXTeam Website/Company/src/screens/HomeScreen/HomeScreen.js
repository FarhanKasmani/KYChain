import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Linking} from 'react-native';
import Button from 'apsl-react-native-button';
import Entypo from 'react-native-vector-icons/Entypo';
import Dialog, { DialogContent, DialogButton,DialogTitle, ScaleAnimation } from 'react-native-popup-dialog';

import {
    SCLAlert,
    SCLAlertButton
  } from 'react-native-scl-alert'

export default class HomeScreen extends React.Component{
    
    state = {
        input:"",
        validuid:true,
        loading:false,
        visible:false,
    }

    static navigationOptions = {
    title: 'Spyder Infotech Pvt Ltd',
    headerStyle:{
        backgroundColor: '#3498db',
    },
    headerTitleStyle:{
        width:"70%",
        color:'white',
    },
    };
    
    onInputHandler = (text) => {
        this.setState({
            ...this.state,
            input:text
        })
    }

    navigatetoDetails = async () => {
        this.setState({
            ...this.state,
            loading:true,
        })
        try{
            let response = await fetch('http://172.16.1.181:8000/api/grantrevoke/request/',{
                method:'POST',
                body:JSON.stringify({
                    uid:this.state.input,
                    key:"SPY123", //Company's API Key obtained registration
                    data:['name','address','dob'] //Details that company ask for
                }),
                headers:{
                    "Content-Type":"application/json"
                }
            })
              let responseJson = await response.json();
              console.log(responseJson);
              if(responseJson.success)
        {
            console.log(responseJson.success)
            this.setState({
                ...this.state,
                validuid:true,
                loading:false,
                }
            )
            this.props.navigation.push('Details',
            {
                uid:this.state.input,
                data:responseJson.data
            })
        }
        else{
            this.setState({
                ...this.state,
                validuid:false,
                loading:false,
                })
        }
         }
        catch(error){
            console.error(error)
        }

        
        //Testing
        // this.props.navigation.navigate('Details',
        //     {
        //         uid:this.state.input,
        //         data:[{key:"Name",value:"Harsh Jain"},{key:"Address",value:"538, Arihant Krupa, 4th floor, Gokul Nagar, Bhiwandi, Pincode:421308"},{key:"Contact",value:"9168823888"}]
        //     })
        
    }

    displayingError = () => {
        this.setState({
            ...this.state,
            input:"",validuid:true})
    }

    render()
    {
        if(this.state.validuid)
        {
        return(
            <View style={styles.container}>
                <SCLAlert
                theme="info"
                show={this.state.visible}
                slideAnimationDuration={1}
                title="Info...."
                subtitle="sPYder Infotech has partnered with KYChain"
                onRequestClose={()=>console.log("Closed")}
                >
                <SCLAlertButton theme="info" 
                onPress={()=>this.setState({...this.state,visible:false})}>Close </SCLAlertButton>
                </SCLAlert>
                <TextInput placeholder="Enter your UNI-KYC ID"
                style={styles.input}
                value={this.state.input}
                onChangeText={this.onInputHandler}
                >
                </TextInput>
                <View style={styles.button}>
                <Button
                style={styles.buttonStyle} textStyle={styles.textStyle}
                isLoading={this.state.loading}
                onPress={this.navigatetoDetails}>
                Check KYC
                </Button>
                
                </View>
                <Text style={{color:"black",fontSize:20}}>Don't have the UNI-KYC ID?</Text>
                
                <View style={{flexDirection:"row",marginTop:10}}>
                <Text style={{color:"black",fontSize:20}}>Go to KYChain</Text>
                <TouchableOpacity onPress={()=>this.setState({...this.state,visible:true})}>
                <Entypo name={'info-with-circle'} style={{color:"black",fontSize:15}}/>
                </TouchableOpacity>
                </View>
                <Entypo name={'google-play'} style={{color:"black",fontSize:50}}/>
                <Text style={{color:"black",fontSize:15}}>OR</Text>
                <TouchableOpacity onPress={()=>{Linking.openURL('http://172.16.1.129:8000/login_test.html')}}>
                <Text style={{color:"#3498db",fontSize:20,textDecorationLine: 'underline'}}>KYChain</Text>
                </TouchableOpacity>
            </View>
        );
        }
        else{
            return(
            <View style={styles.container}>
            <SCLAlert
                theme="danger"
                show={true}
                slideAnimationDuration={1}
                title="Oops   "
                subtitle="Invalid UNI-KYC ID   "
                onRequestClose={()=>console.log("Closed")}
            >
                <SCLAlertButton theme="danger" 
                onPress={this.displayingError}>Close </SCLAlertButton>
            </SCLAlert>
            </View>
            );
        }
    }
}

const styles=StyleSheet.create({
    container:{
    flex:1,
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: 'white',
    },
    textinput: {
    width:"75%",
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color:'black',
    },
    textStyle: {
    color: 'white'
    },
    buttonStyle: {
    borderColor: '#2980b9',
    backgroundColor: '#3498db',
    },   
    button:{
    width:"80%",
    },
    input: {
    width: '80%',
    borderWidth: 1,
    borderColor: 'black',
    padding: 5,
    marginTop: 7,
    marginBottom: 7,
    borderRadius: 10,
    paddingLeft: 15,
    height: 55,
    fontSize:18,
},
})


