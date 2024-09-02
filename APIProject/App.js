import { StyleSheet, Text, View, SafeAreaView, FlatList } from "react-native";
import { useEffect, useState } from "react";

export default function App() {
  const [postList, setPostList] = useState([]);

  const fetchData = async () => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon`);
    const data = await response.json();
    setPostList(data.results);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.listContainer}>
        <FlatList
          data={postList}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => {
            return (
              <View>
                <Text>{item.name}</Text>
                <Text>{item.url}</Text>
              </View>
            );
          }}
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
});
