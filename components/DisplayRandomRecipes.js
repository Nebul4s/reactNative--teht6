import { StyleSheet, Text, View, Button, ScrollView } from "react-native";

import useFetch from "../hooks/useFetch";
import React from "react";
import { API_KEY } from "@env";
import { useState } from "react";

const DisplayRandomRecipes = () => {
  const [timestamp, setTimestamp] = useState(Date.now());
  const { data, isLoading, error } = useFetch(
    `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&t=${timestamp}`
  );

  return (
    <View>
      {error && <Text>{error}</Text>}
      {data &&
        data.recipes &&
        data.recipes.map((recipe, i) => (
          <View key={i}>
            <Text style={styles.title}>{recipe.title}</Text>
            <ScrollView style={styles.scroll}>
              <Text style={styles.subtitle}>Instructions: </Text>
              <Text style={styles.instructions}>
                {recipe.instructions
                  ? recipe.instructions.replace(/<\/?(ol|li|p)>/g, "")
                  : "No instructions for this recipe"}
              </Text>
            </ScrollView>
          </View>
        ))}
      <Button title="Randomize" onPress={() => setTimestamp(Date.now())} />
    </View>
  );
};

export default DisplayRandomRecipes;

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 24,
    marginBottom: 8,
  },
  instructions: {
    fontSize: 16,
  },
  scroll: {
    flex: 1,
    maxHeight: 400,
    marginBottom: 12,
  },
});
