import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WellcomeScreen from "../screens/Wellcome";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Wellcome" component={WellcomeScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
