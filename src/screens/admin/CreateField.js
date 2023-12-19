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

export const CreateField = ({ navigation, route }) => {
  const { userInfo } = useContext(LoginContext);
  const [inputValues, setInputValues] = useState({
    name: "",
    address: "",
  });

  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedImage, setSelectedImage] = useState({
    name: "",
    uri: DEFAULT_IMAGE,
  });

  let coordinates = [];
  if (route.params?.coordinates) {
    coordinates = route.params.coordinates;
  }

  if (coordinates.length === 2) {
    coordinateText = `${coordinates[0]}, ${coordinates[1]}`;
  } else {
    coordinateText = "not set";
  }

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
        console.log(result);

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
      const tagIds = selectedTags.map((tag) => tag._id).join(", ");

      let parsedCoordinates = "";

      if (coordinates.length === 2) {
        parsedCoordinates = coordinates.join(", ");
      }

      console.log("abcdef");
      const url = `${BASE_URL}/admin/profile`;
      const formData = new FormData();

      if (selectedImage.uri === DEFAULT_IMAGE) {
        return Toast.error("Please insert field photo");
      }

      if (!name) {
        return Toast.error("Please insert field name");
      }

      if (!tagIds) {
        return Toast.error("Please insert any sport tag");
      }

      if (!address) {
        return Toast.error("Please insert field address");
      }

      if (!parsedCoordinates) {
        return Toast.error("Please pin field location");
      }

      formData.append("address", address);
      formData.append("name", name);
      formData.append("tagIds", tagIds);
      formData.append("coordinates", parsedCoordinates);
      formData.append("photos", [
        {
          type: photo.type,
          uri: Platform.OS === "ios" ? photo.uri.replace("file://", "") : photo.uri,
        },
      ]);

      await axios({
        url,
        method: "post",
        headers: {
          Authorization: "Bearer " + userInfo.access_token,
        },
        data: formData,
      });

      Toast.success("OKEEEE");
    } catch (error) {
      console.log(error);

      Toast.error(error.response.data.message);
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

            <TouchableOpacity className={"bg-purple-500 w-full my-2 px-4 py-2 rounded-lg"} onPress={() => navigation.navigate("pinpointField")}>
              <Text className={"text-white text-center"}>Pin Location ({coordinateText})</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Pressable style={{ padding: 15, width: "100%", backgroundColor: "rgb(27, 117, 208)", alignItems: "center" }} onPress={fieldSubmitHandler}>
          <Text>Create Profile</Text>
        </Pressable>
      </ScrollView>
    </>
  );
};
