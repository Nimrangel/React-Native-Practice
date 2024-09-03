import {
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  FlatList,
  ActivityIndicator,
  View,
} from "react-native";

import { useState, useEffect } from "react";

export default function HomeScreen({navigation}) {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=20"
        );
        const data = await response.json();
        setPokemon(data.results);
      } catch (error) {
        console.error("Error fetching Pokemon details", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemonData();
  }, []);

  const renderItem = ({ item }) => (
    <SafeAreaView style={homeStyle.homeItemContainer}>
      <Pressable onPress={()=> navigation.navigate('Detail', {pokemonName:item.name, pokemonURL:item.url})}>
        <Text style={homeStyle.homeText}>{item.name}</Text>
      </Pressable>
    </SafeAreaView>
  );

  return (
    <View style={homeStyle.homeContainer}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={pokemon}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
        />
      )}
    </View>
  );
}

const homeStyle = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  homeText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  homeItemContainer: {
    borderWidth: 2,
  },
});
