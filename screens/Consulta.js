import { transform } from '@babel/core';
import auth from '@react-native-firebase/auth';
import { useState, useEffect, state } from 'react';
import firestore from '@react-native-firebase/firestore';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import Button from '../components/Button';
import { Alert, Image, TextInput } from 'react-native';


import {

    Text,
    StyleSheet,
    View,
    TouchableOpacity,

} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DatePicker from 'react-native-date-picker'
import Icon from 'react-native-vector-icons/FontAwesome';


export default function ConsultaScreen({ navigation }) {


    const values = [
        "Sidia Amazon Innovation",
        "Sidia Amazon Tower",
        "Sidia Amazon Lab"
    ];


    const [site, setSite] = useState(values[1]);
    const [dataRonda, setDataRonda] = useState([]);
    const [data, setData] = useState(new Date());
    const [horario, setHorario] = useState('');


    useEffect(() => {
        if (dataRonda) {
            console.log(dataRonda);
            var total = dataRonda.length;
            console.log('Total registers: ', total);
            if (total > 0) {
                navigation.navigate('Lista', { dados: dataRonda, total: total })

            }
        }
    }, [dataRonda])

    function alerta(titulo, mensagen) {
        Alert.alert(
            titulo,
            mensagen,
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        );
    }

    function makeTwoDigits(time) {
        const timeString = `${time}`;
        if (timeString.length === 2) return time
        return `0${time}`
    }

    function update(id_site, data, hora) {
        if (id_site) {
            firestore()
                .collection('ronda')
                .where("data", "==", data)
                .where("site", "==", id_site)
                .where("idRonda", "==", hora)
                // .orderBy('idRonda')
                .get()
                .then(collectionSnapshot => {
                    setDataRonda(collectionSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
                    data = '';
                })
        }
        else {
            alerta("Atenção", "Verifique o site escolhido.");
        }
    }


    function checaHora() {
        if (horario) {
            update(site, makeTwoDigits(data.getDate()) + "/" + makeTwoDigits(data.getMonth() + 1) + "/" + data.getFullYear(), horario + ' h')
            setHorario('');
        }
        else {
            alerta("Atenção", "Verifique o horário escolhido.");
        }

    }

    return (


        <SafeAreaView style={styles.container}>
            <Text style={styles.regularText} > Escolha o site: </Text>
            <View style={styles.view} >

                <TouchableOpacity onPress={() => { setSite(values[1]) }} >

                    <Image
                        style={styles.imgsite}
                        source={require("../assets/sat_round.png")}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { setSite(values[0]) }} >

                    <Image
                        style={styles.imgsite}
                        source={require("../assets/sai_round.png")}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { setSite(values[2]) }} >

                    <Image
                        style={styles.imgsite}
                        source={require("../assets/sal_round.png")}
                    />
                </TouchableOpacity>


            </View>

            <Text style={styles.title} > {site} </Text>

            <Text style={styles.regularText}> Escolha a data: </Text>

            <DatePicker date={data} onDateChange={setData} mode={'date'} androidVariant='nativeAndroid' textColor='#ffff00'

            />
            <TextInput
                style={styles.inputBox}
                value={horario}
                onChangeText={setHorario}
                placeholder={'horário ex: 01'}
                keyboardType={'numeric'}
            />
            <Button onPress={() => checaHora()} children="Consultar "></Button>

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
        flexDirection: "row",
        height: 100,
        padding: 10,

    },

    regularText: {
        fontSize: 20,
        padding: 5,
        // marginVertical: 4,
        color: '#EDEFEE',
        textAlign: 'left',
    },
    imgsite: {
        height: 100,
        width: 100,
        resizeMode: "stretch",

        marginRight: 5,
        marginLeft: 5,
        alignSelf: 'center'

    },
    scanBtn: {
        // backgroundColor: '#5F9DF7',
        backgroundColor: 'rgba(255, 255,255,0.1)',
        // paddingVertical: 
        marginLeft: 10,
        marginRight: 10,
        alignContent: 'stretch',

        marginBottom: 10,
        borderRadius: 10,
        height: 50,

    },
    title: {
        marginTop: 10,
        color: '#00ff00',
        textAlign: "center",
        fontSize: 25,
        fontWeight: "bold",
        marginBottom: 20
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
        width: 250,
        borderRadius: 10

    },

});

