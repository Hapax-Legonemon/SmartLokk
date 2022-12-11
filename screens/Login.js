import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';

import Button from '../components/Button';

import {
    Text,
    StyleSheet,
    TextInput,
    Alert,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';



export default function LoginScreen({ navigation }) {
   
    const [email, onChangeEmail] = useState('');
    const [password, onChangePassword] = useState('');
    const [msg, setMsg] = useState('');
    const myIcon = <Icon name="user" size={70} color="#0f0" />;

    function CheckUser() {

        //setMsg('...');

        (!email && password) && setMsg("Usuário em Branco");
        (email && !password) && setMsg("Senha em Branco");
        (!email && !password) && setMsg("Usuário e Senha em Branco");

        (email && password) &&
            auth().signInWithEmailAndPassword(email.trim().toLowerCase() + "@sidia.com", password)
                .then((log) => {
                    console.log("Login Successful!");
                    navigation.navigate('Wellcome');
                    onChangeEmail('');
                    onChangePassword('');
                    setMsg('');

                }).catch((error) => {
                    onChangeEmail('');
                    onChangePassword('');
                    console.log(error.Error);
                    alerta("Falha no login", "Verifique o usuário e senha");

                });

    }

    function init() {
        if (auth().currentUser)
            navigation.navigate('Wellcome')
    }


    function alerta(titulo, mensagen) {
        Alert.alert(
          titulo,
          mensagen,
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        );
      }
    
    return (
    
        <View style={styles.view}>
            
            
            {init()}
            
            <Text style={styles.headerText}>Bem vindo ao SmartRonda </Text>
            {myIcon}
    

            <Text style={styles.regularText}>Faça o seu login </Text>
            
            <TextInput
                style={styles.inputBox}
                value={email}
                onChangeText={onChangeEmail}
                placeholder={'usuário'}
                keyboardType={'default'}
            />
            <TextInput
                style={styles.inputBox}
                value={password}
                onChangeText={onChangePassword}
                placeholder={'senha'}
                keyboardType={'numeric'}
                secureTextEntry={true}
            />
          

            
            <Button onPress={ CheckUser} children = "Login "></Button>


            <Text style={styles.message}> {msg} </Text>

            </View>
    
    );
}

const styles = StyleSheet.create({
   
    headerText: {
        padding: 10,
        fontSize: 30,
        color: '#EDEFEE',
        textAlign: 'center',
    },
    view: {
      
        height: 100,
        padding: 20,
        backgroundColor: '#666666',
        flex: 1,
        alignItems: 'center'

    },
    inputBox: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        fontSize: 16,
        marginLeft: 40,
        color: '#333333',
        marginRight: 40,
        borderColor: 'EDEFEE',
        backgroundColor: '#EDEFEE',
        width:250,
        borderRadius:10

    },
 
   
    message: {
        color: 'red',
        textAlign: 'center',
        fontSize: 25,
        // backgroundColor:'#555555',
        // marginLeft: 40,
        // marginRight: 40,
        // borderWidth: 2,
        // borderRadius: 50,

    },
    regularText: {
        fontSize: 24,
        marginVertical: 8,
        color: '#FFFFFF',
        textAlign: 'center',
        width:250
    },
});

