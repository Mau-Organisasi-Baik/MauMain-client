import React, { useState } from 'react';
import { View, Modal, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker'

export const BookModal = ({modalVisible, setModalVisible}) => {
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
        <View className={`m-4 bg-white border-2 border-black mt-20 rounded-lg p-4 shadow-xl`}>
          <Text className="text-lg">Tipe Olahraga : </Text>
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

          <Text className="text-lg">Jam : </Text>
          <TextInput
          style={{ backgroundColor: '#f0f0f0' }}
          className="bg-grey-800 pl-2 py-3"
          value='15:00 - 16:00'
          />
          <Text className="text-lg">Mode : </Text>

        <Picker
            style={{ backgroundColor: '#f0f0f0' }}
            selectedValue={selectedMode}
            >
            <Picker.Item label='Casual' value={'casual'}/>
            <Picker.Item label='Competition' value={'competition'}/>
        </Picker>

          <TouchableOpacity className={`bg-blue-500 px-4 py-2 rounded-lg mt-4`} onPress={() => setModalVisible(!modalVisible)}>
            <Text className={`text-white text-center`}>OK!</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default BookModal;