import { useContext, useEffect, useState } from "react";
import { Button, Image, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AddTagsModal } from "../../components/modal/AddTagsModal";
import * as ImagePicker from "expo-image-picker";
import { Toast } from "toastify-react-native";
import { requestPermission } from "../../helpers/UploadImage";
import axios from "axios";
import { LoginContext } from "../../context/AuthContext";
const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

const DEFAULT_IMAGE = "https://via.placeholder.com/600x400";

export const CreateField = () => {
  const { userInfo } = useContext(LoginContext);
  const [inputValues, setInputValues] = useState({
    name: "",
    address: "",
    coordinates: [],
  });

  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedImage, setSelectedImage] = useState({ uri: DEFAULT_IMAGE });

  const inputHandler = (inputIdentifier, enteredValue) => {
    setInputValues((currValue) => {
      return {
        ...currValue,
        [inputIdentifier]: enteredValue,
      };
    });
  };

  const pickMultipleImage = async () => {
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
        const { uri } = result;
        setSelectedImage({ uri });
      } else {
        setSelectedImage({ uri: DEFAULT_IMAGE });
      }
    } catch (error) {
      console.log(error);
    }
  };

  async function fieldSubmitHandler() {
    try {
      const { address, name } = inputValues;

      const tagIds = selectedTags.map((tag) => tag._id);

      const url = `${BASE_URL}/admin/profile`;
      const { data: data } = await axios.post(
        url,
        {
          address,
          name,
          tagIds,
        },
        {
          headers: {
            Authorization: "Bearer " + userInfo.access_token,
          },
        }
      );
    } catch (error) {
      console.log(error.response.data);
      Toast.error(error.response.message);
    }
  }

  return (
    <>
      <ScrollView className={"bg-gray-100 flex"}>
        <View className={"p-4"}>
          <View horizontal className={"mb-4 w-full"} showsHorizontalScrollIndicator={false} contentContainerStyle={{ alignItems: "center" }}>
            <TouchableOpacity onPress={pickMultipleImage} style={{ flex: 1 }}>
              <Image className="h-40 w-full rounded-lg mr-2 flex flex-1" source={selectedImage} />
            </TouchableOpacity>
          </View>
          <View>
            <View className={"flex-1 my-4"}>
              <Text className={"text-xl font-bold"}>Field</Text>
              <TextInput
                value={inputValues.name}
                style={{ paddingVertical: 10, borderBottomColor: "grey", borderBottomWidth: 1 }}
                placeholder="Your Field Name"
                onChangeText={(text) => inputHandler("name", text)}
              />
            </View>

            <Text className={"text-xl font-bold my-2"}>Sport tags</Text>
            <AddTagsModal selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
          </View>
          {/* Address */}
          <View className={"my-12"}>
            <Text className={"text-lg font-semibold"}>Address</Text>
            <TextInput
              value={inputValues.address}
              style={{
                borderBottomColor: "grey",
                borderBottomWidth: 1,
              }}
              multiline={true}
              numberOfLines={4}
              placeholder="Your address"
              onChangeText={(text) => inputHandler("address", text)}
            />

            <TouchableOpacity className={"bg-purple-500 w-full my-2 px-4 py-2 rounded-lg"}>
              <Text className={"text-white text-center"}>Pin Lokasi</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Pressable
          style={{ padding: 15, width: "100%", backgroundColor: "rgb(27, 117, 208)", alignItems: "center" }}
          onPress={fieldSubmitHandler}
          title="Buat Profil"
        >
          <Text>Buat Profil</Text>
        </Pressable>
      </ScrollView>
    </>
  );
};
