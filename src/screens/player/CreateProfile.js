import { LinearGradient } from "expo-linear-gradient";
import { Button, Image, Text, TouchableOpacity, TextInput } from "react-native";
import { LoginContext } from "../../context/AuthContext";
import { useContext, useState, useEffect } from "react";
import { requestPermission } from "../../helpers/UploadImage";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { Toast } from "toastify-react-native";
const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

const DEFAULT_IMAGE_URI = "../../assets/avatar.webp";

export const CreateProfile = ({ navigation }) => {
  const { checkProfileValid, userInfo } = useContext(LoginContext);

  const [name, setName] = useState(null);
  const [selectedImage, setSelectedImage] = useState({
    uri: DEFAULT_IMAGE_URI,
  });

  const pickImage = async () => {
    try {
      const hasPermission = await requestPermission();
      if (!hasPermission) return;

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (result.uri) {
        const { uri, type } = result;
        setSelectedImage({ uri, type });
      } else {
        setSelectedImage({ uri: DEFAULT_IMAGE_URI });
      }
    } catch (error) {
      console.log(error);
    }
  };

  async function submitHandler() {
    try {
      if (selectedImage.uri === DEFAULT_IMAGE_URI) return Toast.error("Please insert profile photo");
      if (!name) return Toast.error("Please insert profile name");

      const formData = new FormData();
      formData.append("name", name);
      formData.append("photo", {
        name: "profileImage.png",
        type: "image/" + /(?:\.([^.]+))?$/.exec(selectedImage.uri)[1],
        uri: selectedImage.uri,
      });

      const url = `${BASE_URL}/profile`;
      await axios.post(url, formData, {
        headers: {
          Authorization: "Bearer " + userInfo.access_token,
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      });

      checkProfileValid();
      Toast.success("Profile created successfully");
    } catch (error) {
      Toast.error(error.response?.data.message);
    }
  }

  return (
    <>
      <LinearGradient colors={["#003366", "#66CCFF"]} style={{ flex: 1, justifyContent: "center", padding: 16 }}>
        <TouchableOpacity onPress={pickImage}>
          <Image className={`rounded-full mx-auto bg-white w-28 h-28`} source={{ uri: selectedImage.uri }} />
        </TouchableOpacity>
        <TextInput
          placeholder={"insert your name here"}
          onChangeText={(e) => setName(e)}
          value={name}
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          style={{
            borderBottomColor: "grey",
            borderBottomWidth: 2,
          }}
          className="text-white text-center text-2xl mt-4 my-4"
        />
      </LinearGradient>
      <Button title="Create Profile" onPress={submitHandler} />
    </>
  );
};
