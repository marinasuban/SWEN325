import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
 
//Navigation
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./Tab";

//Import Screens
import OnBoardingScreen from "./app/screens/OnBoardingScreen";

//Stack
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    //Once user sign-in they have access to TabNavigator(app)
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="OnBoarding"
          component={OnBoardingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
