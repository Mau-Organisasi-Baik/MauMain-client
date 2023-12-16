import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

export const ScheduleCard = ({navigation}) => {
  return (
    <View className="flex-1 bg-pink-100">
      <ScrollView className="p-4">
        <Text className="text-xl font-bold text-center mb-4">10 Des 2023</Text>
        
        <View className="mb-4 p-4 rounded-lg justify-between flex-row bg-blue-100">
          <Text className="text-lg">15:00 - 16:00</Text>
          <Text className="text-lg text-blue-800 border border-blue-500 rounded-lg px-2">x</Text>
        </View>
        <View className="mb-4 p-4 rounded-lg justify-between flex-row bg-blue-100">
          <Text className="text-lg">16:00 - 17:00</Text>
          <Text className="text-lg text-blue-800 border border-blue-500 rounded-lg px-2">x</Text>
        </View>
        <View className="mb-4 p-4 rounded-lg justify-between flex-row bg-blue-100">
          <Text className="text-lg">17:00 - 18:00</Text>
          <Text className="text-lg text-blue-800 border border-blue-500 rounded-lg px-2">x</Text>
        </View>
        
        <Text className="text-xl font-bold text-center mb-4">11 Des 2023</Text>
        
        <TouchableOpacity onPress={() => navigation.navigate('ScheduleForm')} className="bg-gray-400 p-3 rounded-lg">
          <Text className="text-center text-white">Tambah Schedule</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};


