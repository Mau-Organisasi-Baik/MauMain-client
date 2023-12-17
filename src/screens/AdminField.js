import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Button } from 'react-native';

import { AddTagsModal } from '../components/AddTagsModal';
import { LoginContext } from '../context/AuthContext';


export const AdminField = () => {
    const [modalVisible, setModalVisible] = React.useState(false);
    const {LogoutAction} = React.useContext(LoginContext)
    const logoutHandler = async() => {
      await LogoutAction('access_token')
      console.log('logout!');
    }
  return (<>
    <ScrollView className={('bg-gray-100')}>
      <View className={('p-4')}>
        
        <ScrollView
         horizontal
         className={('mb-4')}
         showsHorizontalScrollIndicator={false}
         contentContainerStyle={{ alignItems: 'center' }}>
        <Image
        className="h-40 w-40 rounded-lg mr-2" // Set a width and add margin-right for spacing
        source={require('../assets/lapangan.jpg')}
        />
        <Image
        className="h-40 w-40 rounded-lg mr-2" // Repeat for each image
        source={{ uri: 'https://via.placeholder.com/150' }}
        />
        <Image
        className="h-40 w-40 rounded-lg mr-2" // Repeat for each image
        source={{ uri: 'https://via.placeholder.com/150' }}
        />
        </ScrollView>
        <View className={('')}>
          <View className={('flex-1')}>
            <Text className={('text-xl font-bold')}>Lapangan Pomad, Pancoran</Text>
            
          </View>
          {/* Tags */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className={('')}>
            <View className={('bg-blue-200 rounded-full px-3 py-1 m-1')}>
              <Text className={('text-blue-800')}>Sepakbola</Text>
            </View>
            <View className={('bg-green-200 rounded-full px-3 py-1 m-1')}>
              <Text className={('text-green-800')}>Futsal</Text>
            </View>
            <TouchableOpacity onPress={() =>setModalVisible(true)} className={('bg-gray-400 rounded-full px-3 py-1 m-1')}>
              <Text className={('text-white')}>+</Text>
            </TouchableOpacity>
       
          </ScrollView>
        </View>
        {/* Address */}
        <View className={('my-14')}>
          <Text className={('text-lg font-semibold')}>Address</Text>
          <Text className={('text-gray-600 py-2')}>gg.mangga rt 03 rw 01 no 44 kecamatan pasar minggu</Text>
          <Text className={('text-blue-600')}>Edit</Text>
          <TouchableOpacity className={('bg-purple-500 w-1/2 my-2 px-4 py-2 rounded-lg')}>
            <Text className={('text-white text-center')}>UPDATE LOKASI</Text>
          </TouchableOpacity>
        </View>
        {/* Buttons */}
        <View className={('my-2')}>
      
          <TouchableOpacity className={('bg-blue-500 my-8 w-5/6 mx-auto px-4 py-3 rounded-lg')}>
            <Text className={('text-white text-center')}>EDIT</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
    <Button onPress={logoutHandler} title='Logout'/>
    {modalVisible && <AddTagsModal modalVisible={modalVisible} setModalVisible={setModalVisible} />}
    </>
  );
};

