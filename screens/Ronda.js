import * as React from "react";
import { useState, useEffect, state } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, FlatList, Text, Image, TextInput, View, Pressable, ScrollView, Alert } from 'react-native';

import { useRoute, useFocusEffect } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Button from "../components/Button";


const RondaScreen = ({ navigation }) => {

  var sites = ["Sidia Amazon Innovation", "Sidia Amazon Tower", "Sidia Amazon Lab"];
  const route = useRoute();
  const [barCode, setBarcode] = useState('');
  const [site, setSite] = useState(sites[1]);
  const [dataRonda, setDataRonda] = useState([]);
  const user = auth().currentUser;



  useFocusEffect(
    React.useCallback(() => {
      if (route?.params) {
        setBarcode(route?.params);

      }
    }, [route?.params])
  );

  useEffect(() => {
    if (dataRonda) {
      console.log(dataRonda);
      const total = dataRonda.length;
      console.log('Total registers: ', total);
      if (total > 0)
        navigation.navigate('Lista', { dados: dataRonda, total: total })
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






  const Salvar = () => {
    data = makeTwoDigits(new Date().getDate()) + "/" + makeTwoDigits(new Date().getMonth() + 1) + "/" + new Date().getFullYear();
    hora = makeTwoDigits(new Date().getHours()) + ":" + makeTwoDigits(new Date().getMinutes()) + ":" + makeTwoDigits(new Date().getSeconds());
    
    if (site && barCode) {

      firestore()
        .collection('ronda')
        .where("data", "==", data)
        .where("idRonda", "==", new Date().getHours().toString().trim() + " h")
        .where("uid", "==", auth().currentUser.uid)
        .where("site", "==", site)
        .get()
        .then(collectionSnapshot => {
          console.log('Qtd.: '+collectionSnapshot.size);
          const res = firestore().collection('ronda')
            .add({
              seq: collectionSnapshot.size+1,
              usuario: user.email,
              local: barCode,
              data: data,
              hora: hora,
              site: site,
              idRonda: makeTwoDigits(new Date().getHours()) + " h",
              uid: auth().currentUser.uid,
            })
            .then(() => {
              console.log('User added!');
              alerta("Resultado", "Dados salvos com suceso. ")
              setBarcode('');
            });


        })


    }
    else {
      alerta("Atenção", "Verifique o valor do QRCODE ou o site escolhido.")
    }
  }

  function update(id_site) {

    setSite(id_site);
    console.log(id_site);

    firestore()
      .collection('ronda')
      .where("idRonda", "==", new Date().getHours().toString().trim() + " h")
      .where("uid", "==", auth().currentUser.uid)
      .where("site", "==", id_site)
      .get()
      .then(collectionSnapshot => {
        setDataRonda(collectionSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      })
  }



  return (

    <SafeAreaView style={styles.container}>

      <Text style={styles.text}> Usuário: {user?.email}</Text>


      <Text style={styles.regularText} > Escolha o site: </Text>
      <View style={styles.viewH} >

        <TouchableOpacity onPress={() => { setSite(sites[1]) }} >

          <Image
            style={styles.imgsite}
            source={require("../assets/sat_round.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { setSite(sites[0]) }} >
          <Image
            style={styles.imgsite}
            source={require("../assets/sai_round.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { setSite(sites[2]) }} >
          <Image
            style={styles.imgsite}
            source={require("../assets/sal_round.png")}
          />
        </TouchableOpacity>


      </View>

      <Text style={styles.title}> {site}</Text>

      <View style={styles.view}>

        <TextInput editable={false} style={styles.barcode} value={barCode} placeholder={'Click no QRCODE para a câmera.'}></TextInput>

        <TouchableOpacity onPress={() => { navigation.navigate('Barcodescanner') }} style={alignSelf = 'center'} >

          <Image
            style={styles.imgsite}
            source={require('../assets/qrcode.png')}

          />
        </TouchableOpacity>


        <Button onPress={Salvar} children="Registrar local "></Button>

      </View>
    </SafeAreaView>




  );
};

const styles = StyleSheet.create({


  container: {
    flex: 1,
    backgroundColor: '#666666',
    paddingTop: 20,
    paddingHorizontal: 5,
    alignItems: 'center'

  },
  viewH: {
    flexDirection: "row",
    height: 100,
    padding: 10,


  },
  view: {

    // height: 100,
    padding: 20,
    backgroundColor: '#666666',

    alignItems: 'center'

  },
  scanBtn: {
    backgroundColor: '#5F9DF7',

    // paddingVertical: 
    marginLeft: 10,
    marginRight: 10,
    alignContent: 'space-around',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    height: 110,

  },


  barcode: {
    color: '#ffffff',
    fontSize: 16,
    // flex: 1,
    textAlign: 'center',
    // alignSelf: 'center',
    backgroundColor: 'rgba(255, 255,255,0.3)',
    borderRadius: 10,
    marginTop: 10,
    minHeight: 60,
    marginLeft: 10,
    marginRight: 10,
    width: 250
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 15,
    marginBottom: 10
  },
  regularText: {
    fontSize: 24,
    padding: 5,
    marginVertical: 4,
    color: '#EDEFEE',
    textAlign: 'center',
  },


  imgsite: {
    height: 100,
    width: 100,
    resizeMode: "stretch",
    // borderRadius: 12,
    marginRight: 5,
    marginLeft: 5,
    alignSelf: 'center'

  },
  title: {
    marginTop: 10,
    color: '#00ff00',
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
  },

  item: {
    marginTop: 20,
    padding: 30,
    backgroundColor: '#ffc600',
    fontSize: 24
  }
});




export default RondaScreen;
