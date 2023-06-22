import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, FlatList, Image } from "react-native";
import { useGet } from "../api/axios";
import base64 from "react-native-base64";
import { SvgXml } from "react-native-svg";

const MapListScreen = () => {
  const { data: maps, loading, error } = useGet("/maps");

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={maps}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* <Image
              style={styles.thumbnail}
              source={{ uri: base64.decode(item.imagemSvg) }}
            /> */}
            <SvgXml
              style={styles.thumbnail}
              xml={base64.decode(item.imagemSvg.split("base64,")[1])}
              width={100}
              height={100}
            />
            <View style={styles.infoContainer}>
              <Text style={styles.name}>{item.nome}</Text>
              <Text style={styles.description}>{item.descricao}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    padding: 8,
  },
  thumbnail: {
    width: 80,
    height: 80,
    marginRight: 8,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "gray",
  },
});

export const Search = () => {
  return <MapListScreen />;
};
