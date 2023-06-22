import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { MaterialIcons } from "@expo/vector-icons";

import { TabNavigator } from "./TabNavigator";
import { Icon, useColorModeValue } from "native-base";
import { SignIn } from "../screens/SignIn";
import { SignUp } from "../screens/SignUp";
import { Profile } from "../screens/Profile";
import { Settings } from "../screens/Settings";
import { Maps } from "../screens/Maps";
import { Areas } from "../screens/Areas";
import {
  ProfileStack,
  SignInStack,
  SignUpStack,
  MapsStack,
  AreasStack,
  SettingsStack,
} from "./StackNavigator";

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  const backgroundColorLabel = useColorModeValue("#00acf0", "#1a202c");
  const backgroundColor = useColorModeValue("white", "#100");
  const colorInactive = useColorModeValue("black", "grey");
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: backgroundColor,
        },
        drawerActiveBackgroundColor: backgroundColorLabel,
        drawerActiveTintColor: "white",
        drawerInactiveTintColor: colorInactive,
        drawerLabelStyle: {
          marginLeft: -25,
          fontSize: 15,
        },
      }}
    >
      <Drawer.Screen
        name="Início"
        component={TabNavigator}
        options={{
          drawerIcon: ({ color }) => (
            <Icon
              mb="1"
              as={<MaterialIcons name="home" />}
              color={color}
              size={22}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Perfil"
        component={ProfileStack}
        options={{
          drawerIcon: ({ color }) => (
            <Icon
              mb="1"
              as={<MaterialIcons name="person" />}
              color={color}
              size={22}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="SignIn"
        component={SignInStack}
        options={{
          drawerIcon: ({ color }) => (
            <Icon
              mb="1"
              as={<MaterialIcons name="login" />}
              color={color}
              size={22}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="SignUp"
        component={SignUpStack}
        options={{
          drawerIcon: ({ color }) => (
            <Icon
              mb="1"
              as={<MaterialIcons name="assignment" />}
              color={color}
              size={22}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Maps"
        component={MapsStack}
        options={{
          drawerIcon: ({ color }) => (
            <Icon
              mb="1"
              as={<MaterialIcons name="map" />}
              color={color}
              size={22}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Areas"
        component={AreasStack}
        options={{
          drawerIcon: ({ color }) => (
            <Icon
              mb="1"
              as={<MaterialIcons name="place" />}
              color={color}
              size={22}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsStack}
        options={{
          drawerIcon: ({ color }) => (
            <Icon
              mb="1"
              as={<MaterialIcons name="settings" />}
              color={color}
              size={22}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};
