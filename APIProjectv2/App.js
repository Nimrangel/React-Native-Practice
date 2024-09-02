import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  StatusBar,
} from "react-native";
import { useState, useEffect } from "react";

export default function App() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [offset, setOffset] = useState(0);

  const fetchPokemonDetails = async (url) => {
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      console.error("Error", error);
    }
  };

  const fetchData = async () => {
    if (loadingMore) return;

    setLoadingMore(true);
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`);
      const data = await response.json();

      const detailedList = await Promise.all(
        data.results.map(async (pokemon) => {
          const details = await fetchPokemonDetails(pokemon.url);
          return { ...pokemon, details };
        })
      );

      setPokemon((prevPokemon) => [...prevPokemon, ...detailedList]);
      setOffset(offset + 20); // Increase offset for the next batch
    } catch (error) {
      console.error("Error", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLoadMore = () => {
    fetchData();
  };

  if (loading && offset === 0) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
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
              <Text style={styles.itemText}>{item.name}</Text>
              {item.details && (
                <View style={styles.detailsContainer}>
                  <Text style={styles.itemText}>
                    Base Experience: {item.details.base_experience}
                  </Text>
                  <Text style={styles.itemText}>
                    Height: {item.details.height}
                  </Text>
                  <Text style={styles.itemText}>
                    Weight: {item.details.weight}
                  </Text>
                </View>
              )}
            </View>
          )}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loadingMore && <ActivityIndicator size="small" />}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: StatusBar.currentHeight,
  },
  listContainer: {
    width: "100%",
    paddingHorizontal: 20,
  },
  itemContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#0B0C10",
    borderRadius: 10,
  },
  itemText: {
    color: "white",
    textTransform: "capitalize",
    fontWeight: "bold",
  },
  detailsContainer: {
    marginTop: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
