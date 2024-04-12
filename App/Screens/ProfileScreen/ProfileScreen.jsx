import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import Colors from './../../Utils/Colors';
import { useClerk, useUser } from "@clerk/clerk-react";

export default function ProfileScreen() {
  const { signOut } = useClerk();
  const navigation = useNavigation();
  const { user } = useUser();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigation.navigate('Login'); // Reemplaza 'Login' con el nombre de tu pantalla de inicio de sesión
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const sendEmail = () => {
    const emailAddress = 'sigeca.utez@gmail.com'; // Reemplaza con tu dirección de correo electrónico
    Linking.openURL(`mailto:${emailAddress}`);
  };

  const profileMenu = [
    {
      id: 1,
      name: 'Menu',
      icon: 'home',
      screen: 'home'
    },
    {
      id: 2,
      name: 'Mis cursos',
      icon: 'bookmark-sharp',
      screen: 'booking'
    },
    {
      id: 3,
      name: 'Contacto',
      icon: 'mail',
      action: sendEmail // Utilizamos una función de acción personalizada en lugar de una pantalla
    },
    {
      id: 4,
      name: 'Cerrar sesión',
      icon: 'log-out',
      action: handleSignOut // Acción para cerrar sesión
    }
  ];

  const handleMenuItemPress = (item) => {
    if (item.action) {
      item.action(); // Ejecutamos la acción personalizada si está definida
    } else {
      navigation.navigate(item.screen);
    }
  };

  return (
    <View>
      {/* Contenido del perfil */}
      <View style={{padding:20,paddingTop:60, backgroundColor:Colors.PRIMARY}}>
        <Text style={{fontSize:30,fontFamily:'outfit-bold',color:Colors.WHITE}}>Perfil</Text>
        <View style={{
          display:'flex',
          justifyContent:'center',
          alignItems:'center',
          padding:20,
        }}>
          <Image source={{uri:user?.imageUrl}}
            style={{width:90,height:90, borderRadius:99}}
          />
          <Text style={{fontSize:26,marginTop:8,fontFamily:'outfit-medium',
            color:Colors.WHITE}}>{user?.fullName}</Text>
          <Text style={{fontSize:18,marginTop:8,fontFamily:'outfit-medium',
            color:Colors.WHITE}}>{user?.primaryEmailAddress.emailAddress}</Text>
        </View>
      </View>

      {/* Menú de perfil */}
      <FlatList
        data={profileMenu}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              marginBottom: 40,
              paddingHorizontal: 80,
              marginTop: 30
            }}
            onPress={() => handleMenuItemPress(item)} // Utilizamos una función de manejo de eventos para manejar el clic del elemento de menú
          >
            <Ionicons name={item.icon} size={35} color={Colors.BLUE_UTEZ} />
            <Text style={{ fontFamily: 'outfit', fontSize: 20 }}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
