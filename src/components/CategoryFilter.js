import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from 'react-native';

const categories = ['Football', 'Basketball', 'Tennis', 'Badminton', 'Volley'];

const CategoryFilter = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollViewContainer}>
        {categories.map((category, index) => (
          <TouchableOpacity key={index} style={styles.button}>
            <Text style={styles.buttonText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    alignItems: 'center',
    paddingVertical: 10
  },
  button: {

    marginRight: 10, // Space between buttons
    backgroundColor: '#fff', // Background color for the buttons
    paddingHorizontal: 20, // Horizontal padding
    paddingVertical: 5, // Vertical padding
    borderRadius: 20, // Adjust the border radius to match your design
    justifyContent: 'center', // Center the text inside the button
    elevation: 2, // Optional, for shadow on Android
    // Add iOS shadow styles as needed
  },
  buttonText: {
    color: '#000', // Text color
    fontSize: 16, // Adjust your font size as needed
  },
});

export default CategoryFilter;
