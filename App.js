import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/Home";
import DetailsScreen from "./screens/Details";
import ModalScreen from "./screens/Modal";

const Stack = createStackNavigator();
const RootStack = createStackNavigator();

function MainStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator mode="modal" headerMode="none">
        <RootStack.Screen name="Main" component={MainStackScreen} />
        <RootStack.Screen name="MyModal" component={ModalScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
