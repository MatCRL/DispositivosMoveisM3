import React from "react";
import "react-native-gesture-handler";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";

import { HomeScreen } from "./src/screens/HomeScreen";

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <HomeScreen />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
