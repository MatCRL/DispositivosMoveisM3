import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList, Image } from 'react-native';
import { useGet } from '../api/axios';

const MapListScreen = () => {
  // const [maps, setMaps] = useState([]);
  const { data: maps, loading, error } = useGet('/maps');

  useEffect(() => {
    // const fetchMaps = async () => {
    //   try {
    //     const response = await data();
    //     console.log('response.data:', response.data);
    //     setMaps(response.data);
    //   } catch (error) {
    //     console.log("Error fetching maps:", error);
    //   }
    // };
    // fetchMaps();
  }, []);

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
            <Image
              style={styles.thumbnail}
              source={{ uri: item.thumbnailUrl }}
            />
            <View style={styles.infoContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.description}>{item.description}</Text>
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
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'gray',
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
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: 'gray',
  },
});

export const Search = () => {
  return <MapListScreen />;
};
