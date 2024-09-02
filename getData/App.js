import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from "react-native";

export default function App() {
  const [pokemon, setpokemon] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch detailed information for a single Pokémon
  const fetchPokemonDetails = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();

      // Fetch abilities details (3rd level deep)
      const abilitiesWithDetails = await Promise.all(
        data.abilities.map(async (ability) => {
          const abilityDetails = await fetchAbilityDetails(ability.ability.url);
          return {
            name: ability.ability.name,
            details: abilityDetails,
          };
        })
      );

      return { ...data, abilitiesWithDetails };
    } catch (error) {
      console.error("Error fetching Pokémon details:", error);
      return null; // Return null in case of error
    }
  };

  // Function to fetch ability details (3rd level deep)
  const fetchAbilityDetails = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data; // Return the ability details
    } catch (error) {
      console.error("Error fetching ability details:", error);
      return null; // Return null in case of error
    }
  };

  // Function to fetch the list of Pokémon and then fetch their details
  const fetchData = async () => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon`);
      const data = await response.json();

      // Fetch details for each Pokémon using the URLs in the response
      const detailedList = await Promise.all(
        data.results.map(async (pokemon) => {
          const details = await fetchPokemonDetails(pokemon.url);
          if (details) {
            return {
              name: pokemon.name,
              height: details.height,
              weight: details.weight,
              base_experience: details.base_experience,
              abilities: details.abilitiesWithDetails,
              types: details.types.map((type) => type.type.name),
            };
          } else {
            return null; // Skip this Pokémon if details couldn't be fetched
          }
        })
      );

      setpokemon(detailedList.filter((pokemon) => pokemon !== null)); // Remove null entries
    } catch (error) {
      console.error("Error fetching Pokémon list:", error);
    } finally {
      setLoading(false);
    }
  };

  // Trigger the data fetch when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.listContainer}>
        <FlatList
          data={pokemon}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.title}>{item.name}</Text>
              <Text>Height: {item.height}</Text>
              <Text>Weight: {item.weight}</Text>
              <Text>Base Experience: {item.base_experience}</Text>
              <Text>Types:</Text>
              {item.types.map((type, index) => (
                <Text key={index}>- {type}</Text>
              ))}
              <Text>Abilities:</Text>
              {item.abilities.map((ability, index) => (
                <View key={index} style={styles.abilityContainer}>
                  <Text style={styles.abilityTitle}>- {ability.name}</Text>
                  {ability.details && (
                    <View style={styles.abilityDetails}>
                      <Text>
                        Effect: {ability.details.effect_entries[0]?.effect}
                      </Text>
                      <Text>Generation: {ability.details.generation.name}</Text>
                      {/* Add more details as needed */}
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  listContainer: {
    width: "100%",
    paddingHorizontal: 20,
  },
  itemContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#f9c2ff",
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  abilityContainer: {
    marginTop: 5,
  },
  abilityTitle: {
    fontWeight: "bold",
  },
  abilityDetails: {
    marginLeft: 10,
  },
});
