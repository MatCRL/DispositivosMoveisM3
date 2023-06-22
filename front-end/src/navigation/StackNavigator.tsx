import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Icon, useColorModeValue } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

import { TabNavigator } from "./TabNavigator";
import { SignIn } from "../screens/SignIn";
import { SignUp } from "../screens/SignUp";
import { Profile } from "../screens/Profile";
import { Settings } from "../screens/Settings";
import { Maps } from "../screens/Maps";
import { Areas } from "../screens/Areas";

const Stack = createStackNavigator();

const screenOptionStyle = (navigation) => {
  const backgroundColor = useColorModeValue("#00acf0", "#1a202c");
  const color = useColorModeValue("black", "white");

  return {
    headerStyle: {
      backgroundColor,
    },
    headerTitleAlign: "center" as "center",
    headerTintColor: color,
    headerBackTitle: "Back",
    headerLeft: () => (
      <Icon
        ml="5"
        as={<MaterialIcons name="menu" />}
        color={color}
        size={22}
        onPress={() => navigation.openDrawer()}
      />
    ),
  };
};

// Home Stack
export const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Início">
      <Stack.Screen
        name="Início"
        component={TabNavigator}
        options={({ navigation }) => screenOptionStyle(navigation)}
      />
    </Stack.Navigator>
  );
};

// Profile Stack
export const ProfileStack = () => {
  return (
    <Stack.Navigator initialRouteName="Perfil">
      <Stack.Screen
        name="Perfil"
        component={Profile}
        options={({ navigation }) => screenOptionStyle(navigation)}
      />
    </Stack.Navigator>
  );
};

// SignIn Stack
export const SignInStack = () => {
  return (
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={({ navigation }) => screenOptionStyle(navigation)}
      />
    </Stack.Navigator>
  );
};

// SignUp Stack
export const SignUpStack = () => {
  return (
    <Stack.Navigator initialRouteName="SignUp">
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={({ navigation }) => screenOptionStyle(navigation)}
      />
    </Stack.Navigator>
  );
};

// Maps Stack
export const MapsStack = () => {
  return (
    <Stack.Navigator initialRouteName="Maps">
      <Stack.Screen
        name="Maps"
        component={Maps}
        options={({ navigation }) => screenOptionStyle(navigation)}
      />
    </Stack.Navigator>
  );
};

// Areas Stack
export const AreasStack = () => {
  return (
    <Stack.Navigator initialRouteName="Areas">
      <Stack.Screen
        name="Areas"
        component={Areas}
        options={({ navigation }) => screenOptionStyle(navigation)}
      />
    </Stack.Navigator>
  );
};

// Settings Stack
export const SettingsStack = () => {
  return (
    <Stack.Navigator initialRouteName="Settings">
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={({ navigation }) => screenOptionStyle(navigation)}
      />
    </Stack.Navigator>
  );
};
