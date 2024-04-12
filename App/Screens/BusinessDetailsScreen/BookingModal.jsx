import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Alert} from 'react-native'
import React, { useEffect, useState } from 'react'
import PageHeading from '../../Components/PageHeading'
import { Ionicons } from '@expo/vector-icons';
import CalendarPicker from 'react-native-calendar-picker';
import Colors from '../../Utils/Colors';
import Heading from '../../Components/Heading';
import { FlatList } from 'react-native';
import { TextInput } from 'react-native';
import { ScrollView } from 'react-native';
import GlobalApi from '../../Utils/GlobalApi';
import { useUser } from '@clerk/clerk-expo';
import moment from 'moment';
export default function BookingModal({businessId,hideModal}) {

    const [timeList,setTimeList]=useState();
    const [selectedTime,setSelectedTime]=useState();
    const [selectedDate,setSelectedDate]=useState();
    const [note,setNote]=useState();
    const {user}=useUser();
    useEffect(()=>{
        getTime();
    },[])

    const getTime=()=>{
        const timeList=[];
        for(let i=8;i<=12;i++)
        {
            timeList.push({
                time:i+':00 AM'
            })
            timeList.push({
                time:i+':30 AM'
            })
        }
        for(let i=1;i<=7;i++)
        {
            timeList.push({
                time:i+':00 PM'
            })
            timeList.push({
                time:i+':30 PM'
            })
        }
        setTimeList(timeList);
    }

    // Create Booking Method 
    const createNewBooking = () => {
        if (!selectedTime || !selectedDate) {
            Alert.alert('Por favor seleccione la fecha y la hora para reservar el curso');
            return;
        }
    
        const data = {
            userName: user?.fullName,
            userEmail: user?.primaryEmailAddress.emailAddress,
            time: selectedTime,
            date: moment(selectedDate).format('DD-MMM-yyyy'),
            businessId: businessId,

            
        }
    
        GlobalApi.createBooking(data)
            .then(resp => {
                console.log("Resp", resp);
                Alert.alert('Te has inscrito a este curso exitosamente');
                hideModal();
            })
            .catch(error => {
                console.error("Error al crear la reserva:", error);
                // Aquí puedes manejar el error de alguna manera, como mostrando un mensaje al usuario
                Alert.alert('Ocurrió un error al intentar crear la reserva. Por favor, inténtalo de nuevo más tarde.');
            });
    }
    
  return (
    <ScrollView>
    <KeyboardAvoidingView style={{padding:20,paddingTop:60}}>
       <TouchableOpacity style={{display:'flex',flexDirection:'row',gap:10,
    alignItems:'center',marginBottom:20}}
      onPress={()=>hideModal()}
    >
        <Ionicons name="arrow-back-outline" size={30} color="black" />
        <Text style={{fontSize:25,fontFamily:'outfit-medium'}}>
            Inscribete</Text>
      </TouchableOpacity>
      
      {/* Calender Section  */}
      <Heading text={'Seleccionar fecha'} />
      <View style={styles.calenderContainer}>
      <CalendarPicker
          onDateChange={setSelectedDate}
          width={340}
          minDate={Date.now()}
          todayBackgroundColor={Colors.BLACK}
          todayTextStyle={{color:Colors.WHITE}}
          selectedDayColor={Colors.PRIMARY}
          selectedDayTextColor={Colors.WHITE}
        />
      </View>

      {/* Time Select Section  */}
      <View style={{marginTop:20}}>
        <Heading text={'Seleccionar horario'} />
        <FlatList
        data={timeList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item,index})=>(
            <TouchableOpacity style={{marginRight:5}}
            onPress={()=>setSelectedTime(item.time)}>
                <Text style={[selectedTime==item.time?
                 styles.selectedTime:styles.unSelectedTime]}>
                    {item.time}</Text>
            </TouchableOpacity>
        )}
        />
      </View>

      {/* Note Section  */}
      <View style={{paddingTop:20}}>
        <Heading text={'Alguna duda?'} />
        <TextInput placeholder='Notas adicionales' 
        numberOfLines={4} multiline={true}
        style={styles.noteTextArea} 
        onChange={(e)=>setNote(e.target.value)}
        />
      </View>

      {/* confirmation Button  */}
      <TouchableOpacity style={{marginTop:15}}
      onPress={()=>createNewBooking()}>
        <Text style={styles.confirmBtn}
        
        >Inscribirme</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    calenderContainer:{
        backgroundColor:Colors.PRIMARY_LIGHT,
        padding:20,
        borderRadius:15,
    },
    selectedTime:{
        padding:10,
        borderColor:Colors.PRIMARY,
        borderRadius:99,
        paddingHorizontal:18,
        backgroundColor:Colors.PRIMARY,
        color:Colors.WHITE
    },
    unSelectedTime:{
        padding:10,
        borderColor:Colors.PRIMARY,
        borderRadius:99,
        paddingHorizontal:18,
        color:Colors.PRIMARY

    },
    noteTextArea:{
        borderWidth:1,
        borderRadius:15,
        textAlignVertical:'top',
        padding:20,
        fontSize:16,
        fontFamily:'outfit',
        borderColor:Colors.PRIMARY
    },
    confirmBtn:{
        textAlign:'center',
        fontFamily:'outfit-medium',
        fontSize:17,
        backgroundColor:Colors.PRIMARY,
        color:Colors.WHITE,
        padding:13,
        borderRadius:99,
        elevation:2,
        
    }
})