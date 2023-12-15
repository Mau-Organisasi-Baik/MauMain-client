import React, { useRef } from 'react';
import { Animated, TouchableOpacity, Text } from 'react-native';

const SlidingHeaderButton = () => {
  // Initialize the animated value
  const position = useRef(new Animated.Value(0)).current;

  // Function to slide the button
  const slideButton = () => {
    // Determine direction based on current position
    const toValue = position._value === 0 ? 100 : 0;

    // Start the animation
    Animated.spring(position, {
      toValue,
      useNativeDriver: true, // Use native driver for better performance
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ translateX: position }] }}>
      <TouchableOpacity onPress={slideButton}>
        <Text>Slide</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default SlidingHeaderButton;
