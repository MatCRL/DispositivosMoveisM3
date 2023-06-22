import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { MaterialIcons } from "@expo/vector-icons";

import { TabNavigator } from "./TabNavigator";
import { Icon } from "native-base";
import { SignIn } from "../screens/SignIn";
import { SignUp } from "../screens/SignUp";
import { Profile } from "../screens/Profile";
import { Settings } from "../screens/Settings";
import { Maps } from "../screens/Maps";
import { Areas } from "../screens/Areas";

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: "#aa18ea",
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#333",
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
        component={Profile}
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
        component={SignIn}
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
        component={SignUp}
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
        component={Maps}
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
        component={Areas}
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
        component={Settings}
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
