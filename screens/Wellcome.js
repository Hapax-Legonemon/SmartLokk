import auth from '@react-native-firebase/auth';
import React, { useState } from 'react';
import Button from '../components/Button';
import { PermissionsAndroid } from 'react-native';
import {
    Image,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert,
    View,
    SafeAreaView,
} from 'react-native';


async function requestCameraPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Ronda Segura - Câmera',
          message:
            'Ronda Segura precisa acessar a sua câmera ' +
            'para ler os QRCODES.',
          buttonNeutral: 'Pergunte mais tarde',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK'
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');

      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }
  
  {requestCameraPermission()}

export default function WellcomeScreen({ navigation }) {
    // const user = auth().currentUser;
    

    // function out() {
    //     auth().signOut().then(navigation.navigate('Login')) 
    // }


    return (
        <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Opções</Text>
        <View style={styles.view}>
           
           <Button onPress={ ()=>{}} children = "Camera "></Button>
           <Button onPress={ ()=>{}} children = "Salvar imagem "></Button>

        </View>
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#666666',
        alignItems: 'center',

    },
   
    view: {
      
        height: 100,
        padding: 20,
        alignItems: 'center',
        marginTop:30

    },
    text: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 15,
        marginBottom: 10
      },

  
});

