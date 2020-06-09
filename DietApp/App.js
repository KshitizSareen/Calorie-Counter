/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  Text,
  Alert,
} from 'react-native';

import Auth from './components/userentry';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DietList from './components/DietList';
import Edit from './components/Edit';
import { TouchableHighlight } from 'react-native-gesture-handler';
import Create from './components/Create';
import PushNotification from 'react-native-push-notification';

const Stack=createStackNavigator();


const App: () => React$Node = () => {
  PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    console.log("TOKEN:", token);
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);
    Alert.alert("DietApp","Have you eaten your meal?",[{
      text: "Yes",
    onPress: ()=> {fetch("http://192.168.43.22:19000/app/Diet/"+notification.data.item.id+"/",{
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token '+notification.data.token
      },
      body:JSON.stringify({
          Status: true

      })

  }).then(res=>res.json());}
    },
  {
    text: "No",
      onPress: ()=> {
    },
      style: "cancel"
  }],{
    cancelable: true
  });
  },

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: true,
});

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Auth" component={Auth} options={{title: 'Welcome'}}
        />
        <Stack.Screen name="List" component={DietList} options={({route,navigation})=>({title: "Items",headerTitleStyle:{fontWeight: '100'},headerRight: ()=>(<TouchableHighlight style={{backgroundColor: '#00cc00',marginRight: 10,width: 75,height: 40,padding:10}} onPress={()=>{
          navigation.navigate("Create",{token: route.params.token,username: route.params.username});
        }}><Text style={{alignSelf: 'center',fontSize: 16,color: 'white'}}>ADD</Text></TouchableHighlight>)})}/>
        <Stack.Screen name="Edit" component={Edit} initialParams={{'PushNotification': PushNotification}} options={({route,navigation})=>({title: route.params.item.Name,headerTitleStyle:{fontWeight: '100'},headerRight: ()=>(<TouchableHighlight style={{backgroundColor: "#00cc00",marginRight: 10,width: 75,height: 40,padding: 10}} onPress={()=>{
fetch("http://192.168.43.22:19000/app/Diet/"+route.params.item.id+"/",{
  method: 'DELETE',
  headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Token '+route.params.token
  }
  

}).then(()=>{navigation.goBack();
  PushNotification.cancelLocalNotifications({
    id: route.params.item.id,
  });
});


        }}><Text style={{alignSelf: 'center',fontSize: 16,color: 'white'}}>Delete</Text></TouchableHighlight>)})}/>
        <Stack.Screen name="Create" component={Create} options={{title: 'Create new item'}} initialParams={{'PushNotification': PushNotification}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
