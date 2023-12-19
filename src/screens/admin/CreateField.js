import { useState } from "react";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"
import { AddTagsModal } from "../../components/modal/AddTagsModal";
import * as ImagePicker from 'expo-image-picker';
import { Toast } from "toastify-react-native";
import { requestPermission } from "../../helpers/UploadImage";
import { access_token } from "../../helpers/AccessToken";
import axios from "axios";
import { BASE_URL } from "../../helpers/BASE_URL";

export const CreateField = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [inputValues, setInputValues] = useState({
      name : '',
      address : '',
      tagIds : [],
      photos : [],
      coordinates : []
    })
    const inputHandler = (inputIdentifier, enteredValue) => {
      setInputValues(currValue => {
        return {
          ...currValue,
          [inputIdentifier] : enteredValue
        }
        
      })
    }

    const pickMultipleImage = async() => {
        try {
          const hasPermission = await requestPermission();
          if (!hasPermission) return;
        
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection : true,
            aspect: [4, 3],
            quality: 1,
          });
        
          if (!result.canceled) {
            await uploadMultipleImages(result.assets[0].uri)
          }
          
        } catch (error) {
        //   Toast.error(error)
        console.log(error);
        }
      }
    const uploadMultipleImages = async (imageUris) => {
        const token = await access_token()
        const formData = new FormData();
        
        formData.append('name', inputValues.name);
        formData.append('address', inputValues.address);
      
        formData.append('coordinates', JSON.stringify([3132,313123]));

        inputValues.tagIds.forEach(tagId => {
          console.log(tagId);
          formData.append('tagIds', 'dasdsda');
        });
  
        if (Array.isArray(imageUris) && imageUris.length) {
          imageUris.forEach((uri, index) => {
            formData.append('photos', { 
              uri,
              type: 'image/jpeg',
              name: `photo_${index}.jpg`,
            });
          })
        }
      
        try {
        console.log(inputValues);
          const response = await axios.post(`${BASE_URL}/admin/profile`, formData, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            },
          });
          console.log(response.data);
        } catch (error) {
         console.log(error.response.data);
        }
      };
    return (
        <>
    <ScrollView className={('bg-gray-100')}>
      <View className={('p-4')}>
        
        <ScrollView
         horizontal
         className={('mb-4')}
         showsHorizontalScrollIndicator={false}
         contentContainerStyle={{ alignItems: 'center' }}>
          {/* {adminField?.photoUrls.map((e) => {
            return <Image
            className="h-40 w-40 rounded-lg mr-2" // Set a width and add margin-right for spacing
            source={{uri : e}}
            />
          })} */}
          {inputValues.photos.map(photo => {
            return (
              <>
              <TouchableOpacity onPress={pickMultipleImage}>
              <Image
              className="h-40 w-40 rounded-lg mr-2"
              source={{ uri: photo }}
              />
              </TouchableOpacity>
              </>
            )
          })}
        <TouchableOpacity onPress={pickMultipleImage}>
        <Image
        className="h-40 w-40 rounded-lg mr-2"
        source={{ uri: 'https://via.placeholder.com/150' }}
        />
        </TouchableOpacity>
  
        </ScrollView>
        <View className={('')}>
          <View className={('flex-1')}>
            <Text className={('text-xl font-bold')}>Field</Text>
            <TextInput 
              placeholder="Your Field"
              onChangeText={inputHandler.bind(this, 'name')}
            />
          </View>
          {/* Tags */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className={('')}>
          {/* {adminField?.tags.map((tag, idx) => {
            return (
              <View className={('bg-blue-200 rounded-full px-3 py-1 m-1')}>
                <Text className={('text-blue-800')}>{tag}</Text>
              </View>
            )
            
          })} */}
            <TouchableOpacity onPress={() =>setModalVisible(true)} className={('bg-gray-400 rounded-full px-3 py-1 m-1')}>
              <Text className={('text-white')}>+</Text>
            </TouchableOpacity>
       
          </ScrollView>
        </View>
        {/* Address */}
        <View className={('my-14')}>
          <Text className={('text-lg font-semibold')}>Address</Text>
          <TextInput 
              placeholder="Your address"
              onChangeText={inputHandler.bind(this, 'address')}
            />
          <Text className={('text-gray-600 py-2')}></Text>
          <TouchableOpacity className={('bg-purple-500 w-1/2 my-2 px-4 py-2 rounded-lg')}>
            <Text className={('text-white text-center')}>UPDATE LOKASI</Text>
          </TouchableOpacity>
        </View>
        {/* Buttons */}
        <View className={('my-2')}>
      
        </View>
      </View>
    </ScrollView>
    {modalVisible && <AddTagsModal modalVisible={modalVisible} setModalVisible={setModalVisible} />}
        </>
    )

}