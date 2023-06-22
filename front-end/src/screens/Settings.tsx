import React, { useEffect, useState } from "react";
import { VStack, Heading, Switch, useColorMode, Box } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Settings() {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";

  useEffect(() => {
    getModeFromStorage();
  }, []);

  const getModeFromStorage = async () => {
    try {
      const value = await AsyncStorage.getItem("darkMode");
      if (value !== null && value !== colorMode) {
        toggleColorMode();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleSwitch = async () => {
    try {
      await AsyncStorage.setItem("darkMode", isDarkMode ? "light" : "dark");
      toggleColorMode();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <VStack flex={1}>
      <Box>
        <VStack mt={10} space={4} alignItems="center">
          <Heading size="md" color={"black"}>
            Modo Escuro
          </Heading>
          <Switch isChecked={isDarkMode} onToggle={toggleSwitch} />
        </VStack>
      </Box>
    </VStack>
  );
}
