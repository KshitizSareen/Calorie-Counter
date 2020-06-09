import React,{useState, useEffect} from 'react';
import {Picker, View, StyleSheet, Text, TextInput,Button ,TouchableHighlight,TouchableOpacity, FlatList, Alert} from 'react-native';
export default function Create(props)
{
    const [Name,setName]=useState("");
    const [Calories,setCaloreis]=useState(0);
    const [selectedValueHours, setSelectedValueHours] = useState("0");
    const [selectedValueMins, setSelectedValueMins] = useState("00");
    const [selectedValueFrame, setSelectedValueFrame] = useState("am");
    const [Quantity,setQuantity]=useState(0);
    const [Username,setUsername]=useState(props.route.params.username);
    const [Type,setType]=useState(true);
    const CreateItem=()=>{
        if(Name=="")
        {
            Alert.alert("Alert","Please enter a name");
            return;
        }
        setCaloreis(parseInt(Calories));
        if(isNaN(Calories))
        {
            Alert.alert("Alert","Please enter a number for calories");
            return;
        }
        setQuantity(parseInt(Quantity));
        if(isNaN(Quantity))
        {
            Alert.alert("Alert","Please enter a number for quantity");
            return;
        }
        var hours=0;
        if(selectedValueFrame=="pm")
        {
            hours=parseInt(selectedValueHours)+12;
        }
        else
        {
            hours=selectedValueHours;
        }
        var Time=hours+":"+selectedValueMins;
        fetch("http://192.168.43.22:19000/app/Diet/",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token '+props.route.params.token
            },
            body:JSON.stringify({
                Name : Name,
                Calories: Calories* parseInt(Quantity),
                Time: Time,
                Quantity: Quantity,
                Username: Username,
                Type: Type

            })

        }).then(res=>res.json()).then(resp=>{
            var currdate=new Date();
            var minutes=parseInt(selectedValueMins);
            var notTime=((parseInt(hours)-currdate.getHours())*60*60*1000)+((minutes*60*1000)-(currdate.getMinutes()*60*1000));
            if(notTime<=0)
            {
                notTime=notTime+(24*60*60*1000);
            }
            props.route.params.PushNotification.localNotificationSchedule({
                id: resp.id,
                title: "New Notification",
                message: "Notification Message",
                data: {item: resp,token: props.route.params.token},
                date: new Date(Date.now()+notTime),
                repeatType: "day"
            });
            props.navigation.goBack();
        });
    };
    return(
        <View style={styles.body}>
            <Text style={styles.Name}>Name</Text>
            <TextInput style={styles.input} value={Name} onChangeText={text=> setName(text)}/>
            <Text style={styles.Calories}>Calories</Text>
            <TextInput style={styles.input} value={Calories} onChangeText={text=> setCaloreis(text)}/>
            {Type==true ? 
                    <View><Text style={styles.Calories}>Quantity</Text>
            <TextInput style={styles.input} value={Quantity} onChangeText={text=> setQuantity(text)}/>
            </View>
                : null}
            <Text style={styles.Calories}>Type</Text>
        <Picker
        selectedValue={Type}
        style={{ height: 50, width: 130,right: 5}}
        onValueChange={(itemValue, itemIndex) => {setType(itemValue); itemValue==false ? setQuantity(1) : setQuantity(Quantity)}}
      >
        <Picker.Item  label="Meal" value={true} />
        <Picker.Item  label="Exercise" value={false} />
        </Picker>
        <View style={{borderBottomColor: '#eee',
        borderBottomWidth: 1,padding: 1,marginBottom: 25}}/>
            <Text style={styles.Calories}>Time</Text>
            
            <View>
            <Picker
        selectedValue={selectedValueHours}
        style={{ height: 50, width: 85}}
        onValueChange={(itemValue, itemIndex) => setSelectedValueHours(itemValue)}
      >
        <Picker.Item  label="01" value="1" />
        <Picker.Item  label="02" value="2" />
        <Picker.Item  label="03" value="3" />
        <Picker.Item  label="04" value="4" />
        <Picker.Item  label="05" value="5" />
        <Picker.Item  label="06" value="6" />
        <Picker.Item  label="07" value="7" />
        <Picker.Item  label="08" value="8" />
        <Picker.Item  label="09" value="9" />
        <Picker.Item  label="10" value="10" />
        <Picker.Item  label="11" value="11" />
        <Picker.Item  label="12" value="0" />
      </Picker>
      <Picker
        selectedValue={selectedValueMins}
        style={{ height: 50, width: 85,bottom: 50,left: 150}}
        onValueChange={(itemValue, itemIndex) => setSelectedValueMins(itemValue)}
      >
        <Picker.Item  label="00" value="00" />
        <Picker.Item  label="01" value="01" />
        <Picker.Item  label="02" value="02" />
        <Picker.Item  label="03" value="03" />
        <Picker.Item  label="04" value="04" />
        <Picker.Item  label="05" value="05" />
        <Picker.Item  label="06" value="06" />
        <Picker.Item  label="07" value="07" />
        <Picker.Item  label="08" value="08" />
        <Picker.Item  label="09" value="09" />
        <Picker.Item  label="10" value="10" />
        <Picker.Item  label="11" value="11" />
        <Picker.Item  label="12" value="12" />
        <Picker.Item  label="13" value="13" />
        <Picker.Item  label="14" value="14" />
        <Picker.Item  label="15" value="15" />
        <Picker.Item  label="16" value="16" />
        <Picker.Item  label="17" value="17" />
        <Picker.Item  label="18" value="18" />
        <Picker.Item  label="19" value="19" />
        <Picker.Item  label="20" value="20" />
        <Picker.Item  label="21" value="21" />
        <Picker.Item  label="22" value="22" />
        <Picker.Item  label="23" value="23" />
        <Picker.Item  label="24" value="24" />
        <Picker.Item  label="25" value="25" />
        <Picker.Item  label="26" value="26" />
        <Picker.Item  label="27" value="27" />
        <Picker.Item  label="28" value="28" />
        <Picker.Item  label="29" value="29" />
        <Picker.Item  label="30" value="30" />
        <Picker.Item  label="31" value="31" />
        <Picker.Item  label="32" value="32" />
        <Picker.Item  label="33" value="33" />
        <Picker.Item  label="34" value="34" />
        <Picker.Item  label="35" value="35" />
        <Picker.Item  label="36" value="36" />
        <Picker.Item  label="37" value="37" />
        <Picker.Item  label="38" value="38" />
        <Picker.Item  label="39" value="39" />
        <Picker.Item  label="40" value="40" />
        <Picker.Item  label="41" value="41" />
        <Picker.Item  label="42" value="42" />
        <Picker.Item  label="43" value="43" />
        <Picker.Item  label="44" value="44" />
        <Picker.Item  label="45" value="45" />
        <Picker.Item  label="46" value="46" />
        <Picker.Item  label="47" value="47" />
        <Picker.Item  label="48" value="48" />
        <Picker.Item  label="49" value="49" />
        <Picker.Item  label="50" value="50" />
        <Picker.Item  label="51" value="51" />
        <Picker.Item  label="52" value="52" />
        <Picker.Item  label="53" value="53" />
        <Picker.Item  label="54" value="54" />
        <Picker.Item  label="55" value="55" />
        <Picker.Item  label="56" value="56" />
        <Picker.Item  label="57" value="57" />
        <Picker.Item  label="58" value="58" />
        <Picker.Item  label="59" value="59" />

        </Picker>
        <Picker
        selectedValue={selectedValueFrame}
        style={{ height: 50, width: 90,bottom: 100,left: 290}}
        onValueChange={(itemValue, itemIndex) => setSelectedValueFrame(itemValue)}
      >
        <Picker.Item  label="AM" value="am" />
        <Picker.Item  label="PM" value="pm" />
        </Picker>
        </View>
            <TouchableOpacity style={styles.button} onPress={()=>CreateItem()}>
                <Text style={styles.loginText}>Create</Text>
      </TouchableOpacity>


        </View>
    );
}
const styles=StyleSheet.create({
    body:{
        fontFamily: 'Roboto, Arial, sans-serif',
        fontSize: 16,
        flexDirection: 'column',
        padding: 25,
        backgroundColor: '#DCDCDC',
        flex: 1
        
    },
    Name:{
        display: 'flex',
        alignItems: 'center',
        marginBottom: 10,
        fontSize: 20,
        color: 'green'
    },
    Calories:{
        display: 'flex',
        alignItems: 'center',
        marginBottom: 10,
        fontSize: 20,
        color: 'green'
    },
    button:{
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#26a9e0',
        fontSize: 15,
        fontWeight: "100",
        color: '#fff',
        alignItems: 'center',
        width: 100,
        alignSelf: 'center',
        bottom: 70
    },
    input:{
        padding: 5,
        marginBottom: 30,
        backgroundColor: 'transparent',
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        fontSize: 20,
        color: 'green'
    },
    heading: {
        textTransform: 'uppercase',
        fontWeight : '400',
        display: 'flex',
        alignItems: 'center',
        marginBottom: 10,
        color: 'grey',
        fontSize: 16
    }
})