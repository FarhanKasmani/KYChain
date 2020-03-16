import React from 'react';
import { View, Text, StyleSheet, BackHandler, TouchableOpacity, Image} from 'react-native';
import List from '../../components/List/List';
export default class DetailsScreen extends React.Component{
    
    static navigationOptions = {
    headerTitle: 'Details',
    headerTitleStyle:{
        width:"30%",
        color:'white',
    },
    headerStyle:{
        backgroundColor: '#3498db',
    },
    headerLeft:null,
    headerRight:(
        <TouchableOpacity onPress={() => alert("Are you sure?")}>
            <Text style={
                {color:"white",fontSize:20,fontWeight:'bold'}
            }>Sign Out </Text>
        </TouchableOpacity>  
    ),
    headerRightContainerStyle:{
        paddingRight:20,
    },
    };
    
    handleBackButton = () => {
        //BackHandler.exitApp()
        return true;
       } 

    // componentDidMount() {
    //     BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    //   }
      
    //   componentWillUnmount() {
    //     BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    //   }



    render()
    {
        const { navigation } = this.props;
        const uid = navigation.getParam('uid');
        const data = navigation.getParam('data');
        if(data.length!==0)
        {
            return(
                <List data={data}/>
            );
        }
        else
        {
            return(
                <View style={styles.deniedcontainer}>
                    <Image
                    style={{width:"100%",height:"40%"}}
                    source={require('../../img/access-denied-stamp.jpg')}
                    />
                    <Text style={{color:"black",fontSize:20,textAlign:"center",margin:5}}>We require access to your name, address and date of birth. Please use KYChain to grant access.</Text>
                </View>
            )
        }
    }
}

const styles=StyleSheet.create({
    container:{
    flex:1,
    alignItems: 'center',
    backgroundColor: 'white',
    padding:22,
    },
    deniedcontainer:{
    flex:1,
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: 'white',
    },
    textdisplay: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },   
    signout: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color:'red'
  },   
})

