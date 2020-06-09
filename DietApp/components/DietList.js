import React,{useState,useEffect, Component} from 'react';
import { FlatList,View, Text, Dimensions,StyleSheet, TextInput,Image, TouchableHighlight, Alert, AsyncStorage, TouchableOpacity } from 'react-native';
import { BaseRouter } from '@react-navigation/native';
export default function DietList(props)
{
    
    
    const renderSeparator = () => {  
        return (  
            <View  
                style={{  
                    height: 1,  
                    width: "100%",  
                    backgroundColor: "#000",  
                }}  
            />  
        );  
    };  
    const [foodItems,setFoodItems]=useState([]);
    const [Calories,setCalories]=useState(0);
    useEffect( ()=>{
        fetch("http://192.168.43.22:19000/app/Diet",{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token '+props.route.params.token
            }

        }).then(res=>res.json()).then(resp=>{
            var Items=new Array();
        resp.forEach(element => {
            if(element.Username==props.route.params.username)
                Items.push(element);
            });
            for (var i=0;i<Items.length-1;i++)
            {
                for(var j=i+1;j<Items.length;j++)
                {
                    if(Items[i].Time>Items[j].Time)
                    {
                        var temp=Items[j];
                        Items[j]=Items[i];
                        Items[i]=temp;
                    }
                }

            }
            setFoodItems(Items);
            setTask();
        }
        ).catch(error=>console.log(error));

    },[foodItems]);
    const setTask= async ()=>{
        await AsyncStorage.setItem('token',props.route.params.token);
        await AsyncStorage.setItem('username',props.route.params.username);
    };
    return(
        <View style={styles.container}>
            <FlatList style={{flex: 1.0}} data={foodItems} renderItem={({item})=>(
                <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={()=> props.navigation.navigate("Edit",{item: item,token: props.route.params.token})}>
                <View>
                <Text style={styles.itemName}>{item.Name}</Text>
                <Text style={styles.itemCalories}>{item.Calories +" Calories"+ "              Time: "+ item.Time}</Text>
                </View>
                </TouchableOpacity>
            )} ItemSeparatorComponent={renderSeparator}/>
            </View>
    
    );
}
const styles = StyleSheet.create({  
    container: {  
        flex: 1,  
    },  
    itemName: {  
        paddingTop: 5,
        paddingLeft: 5,  
        fontSize: 18,  
        height: 44,  
    }, 
    itemCalories: {  
        fontSize: 18,  
        paddingLeft:5, 
    },
    loginButton: {
        backgroundColor: "beige",
      },
      buttonContainer: {
        flexDirection: 'row',
      }
});