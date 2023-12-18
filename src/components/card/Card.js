import React from 'react';
import { View, Text, Image } from 'react-native';

const Card = () => {
    return (
      <View className={`px-4 w-5/6 mx-auto mt-8 rounded-lg bg-white shadow-lg`}>
        <View className={`flex-row items-center`}>
          <Image className={`h-32 w-32 rounded-lg mr-4`} source={require('../../assets/MAUMAIN.png')} />
          <View className={`flex-1 justify-center`}>
            <Text className={`text-lg`}>AkunBaik123 telah mengundangmu 
            </Text>
          </View>
        </View>
      </View>
    );
  };
  
export default Card;
