import React from 'react';
import { Alert, View, Text, StyleSheet, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';




const Item = ({ id, local, data, hora, usuario, idRonda, site }) => (
    <View style={menuStyles.innerContainer}>
        <Text style={menuStyles.itemText} onPress={() => getItem(id, local, data,hora)}>Hora da ronda: {idRonda}</Text>
        <Text style={menuStyles.itemText} onPress={() => getItem(id, local, data,hora)}>Local: {local}</Text>
        {/* <Text style={menuStyles.itemText} onPress={() => getItem(id, local, data,hora)}>Local: {local}</Text> */}
        {/* <Text style={menuStyles.itemText} onPress={() => getItem(id, local, data,hora)}>Site: {site}</Text> */}
        <Text style={menuStyles.itemText} onPress={() => getItem(id, local, data,hora)} >Data: {data} - {hora}</Text>
        <Text style={menuStyles.itemText} onPress={() => getItem(id, local, data,hora)}>Usuário: {usuario}</Text>
        {/* <Text style={menuStyles.itemText} onPress={() => getItem(id, local, data,hora)}>Hora: {hora}</Text> */}
        

    </View>
);


const getItem = (id, local, data,hora) => {
    Alert.alert(
        "Deseja apagar o registro?",
        local + '\n' + data+ '\n' + hora,
        [
            {
                text: "Cancelar",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
            },
            { text: "Confirmar", onPress: () => deleteItem(id)}
        ]
    );
}

const deleteItem = (id) => {

    firestore()
        .collection('ronda')
        .doc(id)
        .delete()
        .then(() => {
            console.log("Doc deletado." + id);
            
        });
}

const Lista = (props) => {

    const renderItem = ({ item }) => <Item id={item.id} local={item.local} data={item.data} 
    idRonda={item.idRonda} site = {item.site} hora = {item.hora} usuario = {item.usuario} />;
    const Header = () => <Text style={menuStyles.headerText}> {props.total} Locais Verificados </Text>; 
    const Footer = () => <Text style={menuStyles.footerText}> All rights reserved by Hermix Co, 2022{' '}</Text>;

    return (
         <View style={menuStyles.container}>

            <FlatList
                data={props.dados}
                keyExtractor={item => Math.random().toString(12).substring(0)}
                renderItem={renderItem}
                ListHeaderComponent={Header}
                // ListFooterComponent={Footer}
     
            ></FlatList>

         </View>
    );
};
const menuStyles = StyleSheet.create({
    container: {
        backgroundColor: '#666666',
        // borderRadius: 10,
        // marginTop: 5,
        // marginBottom: 20,
        flex: 1,
    },
    innerContainer: {
        marginLeft:10,
        marginTop:10,
        borderRadius:10,
        paddingHorizontal: 10,
        marginRight :10,
        backgroundColor: 'rgba(255, 255,255,0.2)',
        paddingVertical: 10,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    itemText: {
        color: '#F4CE14',
        fontSize: 14,
        // backgroundColor: 'rgba(255, 255,255,0.2)',
        

    },
    headerText: {
        padding: 10,
        fontSize: 20,
        color: '#00ff00',
        textAlign: 'center',
    },
    footerText: {
        fontSize: 10,
        color: 'white',
        textAlign: 'center',
        fontStyle: 'italic',
    },
});

export default Lista;
