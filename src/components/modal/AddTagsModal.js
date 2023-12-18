import React, { useState } from 'react';
import { View, Modal, Text, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker'

export const AddTagsModal = ({modalVisible, setModalVisible}) => {
    const [selectedSport, setSelectedSport] = useState();
    const [selectedMode, setSelectedMode] = useState();
  return (
    <View className={`justify-center items-center`}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View className={`m-4 bg-white border-2 border-black mt-48 rounded-lg p-4 shadow-xl`}>
          <Text className="text-lg">Add Tags : </Text>
        <Picker
            style={{ backgroundColor: '#f0f0f0' }}
            className="bg-yellow-500"
            selectedValue={selectedSport}
            >
            <Picker.Item label='Football' value={'Football'}/>
            <Picker.Item label='Basketball' value={'Basketball'}/>
            <Picker.Item label='Tennis' value={'Tennis'}/>
            <Picker.Item label='Futsal' value={'Futsal'}/>
            <Picker.Item label='Badminton' value={'Badminton'}/>
        </Picker>
        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} className="bg-blue-500 w-3/12 py-1 rounded-lg my-2">
            <Text className="text-center text-white ">Enter</Text>
        </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};


