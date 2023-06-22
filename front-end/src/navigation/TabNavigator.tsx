import React from "react";
import { Icon } from "native-base";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";

import { QRCode } from "../screens/QRCode";
import { MapView } from "../screens/MapView";
import { Search } from "../screens/Search";
import { Introduction } from "../screens/Introduction";
import { DrawerNavigator } from "./DrawerNavigator";

const Tab = createBottomTabNavigator();

export const TabNavigator = ({ navigator }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { backgroundColor: "#00acf0" },
        tabBarInactiveTintColor: "#fff",
        tabBarActiveTintColor: "yellow",
      }}
    >
      <Tab.Screen
        name="Introduction"
        component={Introduction}
        options={({ route }) => ({
          tabBarStyle: {
            display: getTabBarVisibility(route),
            backgroundColor: "#AD40AF",
          },
          tabBarIcon: ({ color, size }) => (
            <Icon
              mb="1"
              as={<MaterialIcons name="home" />}
              color={color}
              size={size}
            />
          ),
        })}
      />

      <Tab.Screen
        name="QRCode"
        component={QRCode}
        options={({ route }) => ({
          tabBarIcon: ({ color, size }) => (
            <Icon
              mb="1"
              as={<AntDesign name="qrcode" />}
              color={color}
              size={size}
            />
          ),
        })}
      />

      <Tab.Screen
        name="MapView"
        component={MapView}
        options={{
          tabBarBadgeStyle: { backgroundColor: "yellow" },
          tabBarIcon: ({ color, size }) => (
            <Icon
              mb="1"
              as={<MaterialIcons name="map" />}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon
              mb="1"
              as={<MaterialIcons name="search" />}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={DrawerNavigator}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.openDrawer();
          },
        })}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon
              mb="1"
              as={<MaterialIcons name="settings" />}
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const getTabBarVisibility = (route) => {
  if (route.name == "Introduction") {
    return "none";
  }
  return "flex";
};
