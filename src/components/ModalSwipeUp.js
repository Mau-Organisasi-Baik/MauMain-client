import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { ScrollView, Animated,Image, View, Text, TouchableOpacity } from 'react-native';

const BottomDrawer = ({ isDrawerOpen, setIsDrawerOpen }) => {
  const drawerHeight = useRef(new Animated.Value(0)).current; // Initial height for the drawer
  const navigation = useNavigation()
  useEffect(() => {
    if (isDrawerOpen) {
      Animated.spring(drawerHeight, { toValue: 500, useNativeDriver: false }).start();
    } else {
      Animated.spring(drawerHeight, { toValue: 0, useNativeDriver: false }).start();
    }
  }, [isDrawerOpen]);


  return (
    <Animated.View
      className={`absolute bottom-0 w-full bg-white rounded-t-xl`}
      style={{
        height: drawerHeight, // Bind the animated value
      }}
    >
      {/* Your drawer content */}
      <TouchableOpacity onPress={() => setIsDrawerOpen(!isDrawerOpen)}>
        <Text className={`text-center p-4`}>{isDrawerOpen ? 'Swipe or tap to close' : 'Swipe or tap to open'}</Text>
      </TouchableOpacity>
      <View className={`p-4`}>
        <ScrollView>
        <Image className=" mx-auto shadow-xl rounded-xl w-full h-64 object-cover" source={require('../assets/lapangan.jpg')} />
        <Text className=" text-xl font-bold">Lapangan Pomad, Pancoran, DKI JAKARTA</Text>
        <Text className=" bg-red-200 w-3/12 text-center my-2 rounded-lg">Sepak Bola</Text>
        <View className=" my-4">
            <TouchableOpacity onPress={()=> navigation.navigate('Reservation Card')} className="bg-blue-500 px-14 py-2  rounded-lg">
                <Text className="text-lg text-center tracking-wider">Book Now</Text>
            </TouchableOpacity>
          
        </View>
        </ScrollView>
      </View>
    </Animated.View>
  );
};

export default BottomDrawer;
