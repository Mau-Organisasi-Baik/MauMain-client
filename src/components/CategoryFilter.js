import React, { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, Text, StyleSheet, View, SafeAreaView, StatusBar } from "react-native";
import axios from "axios";
import { Toast } from "toastify-react-native";
const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

const categories = ["Football", "Basketball", "Tennis", "Badminton", "Volley"];

const CategoryFilter = ({ selectedTag, changeTag }) => {
  const [tags, setTags] = useState([]);

  async function fetchTags() {
    try {
      const {
        data: { data },
      } = await axios.get(`${BASE_URL}/tags`);

      setTags(data.tags);
    } catch (error) {
      Toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchTags();
  }, []);

  if (tags.length === 0) return <></>;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollViewContainer}>
        {tags.map((tag, index) => {
          let style = styles.button;

          if (selectedTag) {
            if (tag.name === selectedTag.name) {
              style = styles.buttonSelected;
            }
          }

          return (
            <TouchableOpacity key={index} style={style} onPress={() => changeTag(tag)}>
              <Text style={styles.buttonText}>{tag.name}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    top: StatusBar.currentHeight + 20,
    width: "100%",
    height: 50,
    position: "absolute",
    zIndex: 2,
  },
  scrollViewContainer: {
    alignItems: "center",
    paddingVertical: 5,
  },
  button: {
    marginHorizontal: 10, // Space between buttons
    backgroundColor: "#f0f0f0", // Background color for the buttons
    paddingHorizontal: 20, // Horizontal padding
    paddingVertical: 5, // Vertical padding
    borderRadius: 20, // Adjust the border radius to match your design
    justifyContent: "center", // Center the text inside the button
    elevation: 2, // Optional, for shadow on Android
    // Add iOS shadow styles as needed
  },
  buttonSelected: {
    marginHorizontal: 10, // Space between buttons
    backgroundColor: "#aaaaaa", // Background color for the buttons
    paddingHorizontal: 20, // Horizontal padding
    paddingVertical: 5, // Vertical padding
    borderRadius: 20, // Adjust the border radius to match your design
    justifyContent: "center", // Center the text inside the button
    elevation: 2,
  },
  buttonText: {
    color: "#000", // Text color
    fontSize: 16, // Adjust your font size as needed
  },
});

export default CategoryFilter;
