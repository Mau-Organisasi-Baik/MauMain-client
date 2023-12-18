import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'toastify-react-native'
import * as SecureStore from 'expo-secure-store';
import { access_token } from './AccessToken';
import { BASE_URL } from './BASE_URL';

const requestPermission = async() => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Toast.info('Sorry, we need camera roll permissions to make this work!');
      return false;
    }
    return true;
  }

  export const pickMultipleImage = async() => {
    try {
      const hasPermission = await requestPermission();
      if (!hasPermission) return;
    
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection : true,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    
      if (!result.canceled) {
        await uploadMultipleImages(result.assets[0].uri)
      }
      
    } catch (error) {
      Toast.error(error)
    }
  }

  export const pickImage = async() => {
    try {
      const hasPermission = await requestPermission();
      if (!hasPermission) return;
    
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    
      if (!result.canceled) {
        await uploadImage(result.assets[0].uri)
      }
      
    } catch (error) {
      console.log(error);
      Toast.error(error)
    }
  }

  const uploadImage = async(uri) => {
    const access_token = await SecureStore.getItemAsync('access_token')
    const formData = new FormData()
    formData.append('photo', {
      uri,
      type : 'image/jpeg',
      name : 'myphoto.jpg'
    })
    formData.append('name', 'agus123')
    try {
      const response = await axios.post(`${BASE_URL}/profile`, formData, {
        headers: {
          Authorization : `Bearer ${access_token}`,
          'Content-Type': 'multipart/form-data'
        },
      })
      console.log('ada');
      const result = await response.data;
      console.log(result, 'outpt');
    } catch (error) {
      console.log(error, 'eee');
      Toast.error(`An error occurred during the upload.`)
    }
  }

  const uploadMultipleImages = async (imageUris) => {
    const token = await access_token()
    const formData = new FormData();
  
    imageUris.forEach((uri, index) => {
      formData.append('photos', { // Gunakan 'photos' atau nama field lainnya
        uri,
        type: 'image/jpeg',
        name: `photo_${index}.jpg`,
      });
    });
  
    try {
      const response = await axios.post(`${BASE_URL}/fields/`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
      });
  
      console.log(response.data);
    } catch (error) {
      console.error(error);
      // ... penanganan error
    }
  };
  