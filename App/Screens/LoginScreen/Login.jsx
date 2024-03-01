import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from '../../hooks/warmUpBrowser';
WebBrowser.maybeCompleteAuthSession();
export default function Login() {
    useWarmUpBrowser();
    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
    const onPress = React.useCallback(async () => {
        console.log("SCO")
        try {
          const { createdSessionId, signIn, signUp, setActive } =
            await startOAuthFlow();
     
          if (createdSessionId) {
            setActive({ session: createdSessionId });
          } else {
          }
        } catch (err) {
          console.error("OAuth error", err);
        }
      }, []);
  return (
    <View style={{alignItems:'center'}}>
        <Image source={require('./../../../assets/images/login.png')} 
            style={styles.loginImage}
        />
        <View style={styles.subContainer}>
            <Text style={{fontSize:27,color:Colors.WHITE,
                textAlign:'center'}}>
                Bienvenidos a 
                <Text style={{fontWeight:'bold'}}> SIGECA 
                </Text> UTEZ
            </Text>
            <Text style={{fontSize:17,color:Colors.WHITE,
            textAlign:'center',marginTop:20}}>La aplicacion para ver los cursos a los que te puedes inscribir en la UTEZ</Text>
        
            <TouchableOpacity style={styles.button} 
            onPress={onPress}>
                <Text style={{textAlign:'center',
                fontSize:17,
                color:Colors.PRIMARY}}>Iniciar Sesion</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    loginImage:{
        width:530,
        height:450,
        marginTop:70,

    },
    subContainer:{
        width:'100%',
        backgroundColor:Colors.PRIMARY,
        height:'70%',
        marginTop:-20,
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        padding:20
        
    },
    button:{
        padding:15,
        backgroundColor:Colors.WHITE,
        borderRadius:99,
        marginTop:40
    }
})