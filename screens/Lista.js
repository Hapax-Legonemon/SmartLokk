import * as React from "react";
import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import ListaRonda from '../components/ListaRonda';
import { useRoute } from '@react-navigation/native';




const ListaScreen = ({ navigation }) => {

  const route = useRoute();
  const dados = route.params.dados;
  const total = route.params.total;
  console.log("Lista :" +total);
  
  return (
    <View style={styles.container}>
      <ListaRonda dados={dados} total={total}>  </ListaRonda>
      {/* <ListaRonda dados={dados} >  </ListaRonda> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    backgroundColor: '#333333',
    //  alignItems: 'flex-start',
  },
  
});

export default ListaScreen;
