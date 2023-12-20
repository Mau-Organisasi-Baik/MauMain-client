import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, TextInput, Pressable } from "react-native";

import { AddTagsModal } from "../../components/modal/AddTagsModal";
import { LoginContext } from "../../context/AuthContext";
import axios from "axios";
import { Toast } from "toastify-react-native";
const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;
import { useFocusEffect } from "@react-navigation/native";

export const AdminField = ({ route, navigation }) => {
  const { userInfo, checkProfileValid, LogoutAction } = useContext(LoginContext);
  const logoutHandler = async () => {
    await LogoutAction();
  };

  const [inputValues, setInputValues] = useState({
    name: "",
    address: "",
  });

  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedImage, setSelectedImage] = useState({});

  const [coordinates, setCoordinates] = useState([]);
  if (route.params?.coordinates) {
    setCoordinates(route.params.coordinates);
  }

  let coordinateText;

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

  async function fetchFieldProfile() {
    try {
      const url = `${BASE_URL}/admin/profile`;
      const token = userInfo.access_token;
      if (!token) return;

      const {
        data: { data },
      } = await axios.get(url, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const { name, address, coordinates: fieldCoordinates, tags, photoUrls } = data.field;

      setInputValues({
        address,
        name,
      });

      setCoordinates(fieldCoordinates);
      setSelectedImage({
        uri: photoUrls[0],
      });
      setSelectedTags(tags.map((tag) => ({ name: tag })));
    } catch (error) {
      Toast(error.response?.data.message);
    }
  }

  useEffect(() => {
    fetchFieldProfile();
  }, []);

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
        const { uri, type } = result;
        setSelectedImage({ uri, type });
      } else {
        setSelectedImage({ uri: DEFAULT_IMAGE });
      }
    } catch (error) {
      console.log(error);
    }
  };

  async function handleUpdate() {
    try {
      const { address, name } = inputValues;
      const tagIds = selectedTags.map((tag) => tag._id).join(", ");

      let parsedCoordinates = "";

      if (coordinates.length === 2) {
        parsedCoordinates = coordinates.join(", ");
      }

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

      formData.append("photos", {
        name: "fieldImage.png",
        type: "image/" + /(?:\.([^.]+))?$/.exec(selectedImage.uri)[1],
        uri: selectedImage.uri,
      });

      const url = `${BASE_URL}/admin/profile`;
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
      console.log(error);

      Toast.error(error.response?.data.message);
    }
  }

  return (
    <>
      <ScrollView className={"bg-gray-100 flex"}>
        <View className={"p-4"}>
          <View horizontal className={"mb-4 w-full"} showsHorizontalScrollIndicator={false} contentContainerStyle={{ alignItems: "center" }}>
            <TouchableOpacity onPress={() => {}} style={{ flex: 1 }}>
              <Image className="h-40 w-full rounded-lg mr-2 flex flex-1" source={{ uri: selectedImage.uri }} />
            </TouchableOpacity>
          </View>
          <View>
            <View className={"flex-1 my-4"}>
              <Text className={"text-xl font-bold"}>Field</Text>
              <TextInput
                editable={false}
                value={inputValues.name}
                style={{ paddingVertical: 10, borderBottomColor: "grey", borderBottomWidth: 1 }}
                placeholder="Your Field Name"
                onChangeText={(text) => inputHandler("name", text)}
              />
            </View>

            <Text className={"text-xl font-bold my-2"}>Sport tags</Text>
            <AddTagsModal disabled={true} selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
          </View>
          {/* Address */}
          <View className={"my-12"}>
            <Text className={"text-lg font-semibold"}>Address</Text>
            <TextInput
            editable={false}
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

            <TouchableOpacity className={"bg-purple-500 w-full my-2 px-4 py-2 rounded-lg"} onPress={() => {}}>
              <Text className={"text-white text-center"}>Pin Location ({coordinateText})</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Pressable style={{ padding: 15, width: "100%", backgroundColor: "rgb(27, 117, 208)", alignItems: "center" }} onPress={logoutHandler}>
          <Text>Log out</Text>
        </Pressable>
      </ScrollView>
    </>
  );
};
