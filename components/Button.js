import * as React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const Button = ({ onPress, children }) => {
  return (
    <TouchableOpacity style={styles.buttonWrapper} onPress={onPress}  >
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>

  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255,255,0.1)',
    // flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    marginBottom: 30,
    height: 50,
    width: 250
    
  },
  text: {
    fontSize: 18,
    color: '#00ff00',
    

  }
});

export default Button;
