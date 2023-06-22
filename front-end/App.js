import React, { createContext, useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider, extendTheme, useColorMode, Box, VStack, Heading, Switch } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HomeScreen } from "./src/screens/HomeScreen";

const ThemeContext = createContext({});

const theme = extendTheme({
  config: {
    initialColorMode: "light",
  },
});

export default function App() {
  const [colorMode, setColorMode] = useState(theme.config.initialColorMode);

  useEffect(() => {
    const getColorModeFromStorage = async () => {
      const storedColorMode = await AsyncStorage.getItem("darkMode");
      setColorMode(storedColorMode || theme.config.initialColorMode);
    };
    getColorModeFromStorage();
  }, []);

  const value = { colorMode, setColorMode };

  return (
    <ThemeContext.Provider value={value}>
      <NativeBaseProvider theme={{...theme, config: { ...theme.config, initialColorMode: colorMode }}}>
        <NavigationContainer>
          <HomeScreen/>
        </NavigationContainer>
      </NativeBaseProvider>
    </ThemeContext.Provider>
  );
}
