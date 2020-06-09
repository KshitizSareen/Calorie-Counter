import React,{useState,useEffect} from 'react';
import { View, Text, Dimensions,StyleSheet, TextInput,Image, TouchableHighlight, Alert, AsyncStorage, Switch} from 'react-native';
import { SceneMap, TabView } from 'react-native-tab-view';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const FirstRoute=(props)=>{
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [rememberMe,toggleRememberMe]=useState(false);
    const auth=()=>{
        fetch('http://192.168.43.22:19000/auth/',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username.toLowerCase(),
                password: password
            })}).then(res=>res.json()).then(resp=>{if(resp.token==null)
                {
                    Alert.alert("Invalid Credentials");
                }
                else
                {props.navigation.navigate("List",{username: username.toLowerCase(),token: resp.token})}}).catch(error=>console.log(error));
    };
    rememberUser=async()=>
    {
      try{
        await AsyncStorage.setItem('username',username);
        await AsyncStorage.setItem('password',password);
      }catch(error)
      {

      }

    };
    
    forgetUser=async()=>{
      try{
        await AsyncStorage.removeItem('username');
        await AsyncStorage.removeItem('password');
      }catch(error){

      }
    };
    useEffect(async ()=>{
      const username= await AsyncStorage.getItem('username');
      const password= await  AsyncStorage.getItem('password');
      setUsername(username);
      setPassword(password);
    },[]);

    return (
        <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Username"
              keyboardType="Username"
              underlineColorAndroid='transparent'
              value={username}
              onChangeText={text => setUsername(text) }/>
        </View>
        
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              value={password}
              onChangeText={text => setPassword(text) }/>
        </View>
        <View>
        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => auth()}>
        <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>
        </View>
        <View>
        <Switch value={rememberMe} onValueChange={(value)=> {toggleRememberMe(value); if(value===true)
        {
          rememberUser();
        }
      else{
        forgetUser();
      }}}/>
        <Text>Remeber Me</Text>
        </View>
        </View> );
};
const SecondRoute=()=>{
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    useEffect(()=>{
    },[username,password]);
    const auth=()=>{
        fetch('http://192.168.43.22:19000/app/users/',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username.toLowerCase(),
                password: password
            })}).then(res=>{if(!res.ok){
                Alert.alert("This username already exists");
            }
        else
    {
        Alert.alert("Account Created");
    }}).catch(error=>console.log("error"));
    };
    return (<View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Username"
              keyboardType="Username"
              underlineColorAndroid='transparent'
              value={username}
              onChangeText={text => setUsername(text) }
              />
        </View>
        
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              value={password}
              onChangeText={text => setPassword(text) }
              />
        </View>
        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => auth()}>
        <Text style={styles.loginText}>Signup</Text>
      </TouchableHighlight>
      </View>);
};
const initialLayout={ width: Dimensions.get('window').width };

export default function Auth(props){
    const [index,setIndex]=React.useState(0)
    const[routes]=React.useState([
        {
            key: 'first',
            title: 'Login'
        },
        {
            key: 'second',
            title: 'Signup'
        }
    ]);
    const renderScene = ({ route }) => {
        switch (route.key) {
          case 'first':
            return <FirstRoute navigation={props.navigation}/>;
          case 'second':
            return <SecondRoute />;
          default:
            return null;
        }
      };
    return(
        <TabView navigationState={{index,routes}} renderScene={renderScene} onIndexChange={setIndex} initialLayout={initialLayout}/>

    );


}
const styles=StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DCDCDC',
      },
      inputContainer: {
          borderBottomColor: '#F5FCFF',
          backgroundColor: '#FFFFFF',
          borderRadius:30,
          borderBottomWidth: 1,
          width:250,
          height:45,
          marginTop: 20,
          flexDirection: 'row',
          alignItems:'center',
          bottom: 130
      },
      inputs:{
          height:45,
          marginLeft:16,
          borderBottomColor: '#FFFFFF',
          flex:1,
      },
      inputIcon:{
        width:30,
        height:30,
        marginLeft:15,
        justifyContent: 'center'
      },
      buttonContainer: {
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:250,
        borderRadius:30,
        bottom: 110
      },
      loginButton: {
        backgroundColor: "#00b5ec",
      },
      loginText: {
        color: 'white',
      }
    });