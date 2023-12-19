import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, Button } from "react-native";

import { AddTagsModal } from "../../components/modal/AddTagsModal";
import { LoginContext } from "../../context/AuthContext";
import { access_token } from "../../helpers/AccessToken";
import { BASE_URL } from "../../helpers/BASE_URL";
import axios from "axios";

export const AdminField = () => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [adminField, setAdminField] = useState();
  const { LogoutAction } = React.useContext(LoginContext);
  const logoutHandler = async () => {
    await LogoutAction("access_token");
  };
  useEffect(() => {
    const asyncFn = async () => {
      try {
        const token = await access_token();
        const { data } = await axios.get(`${BASE_URL}/admin/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAdminField(data.data.field);
      } catch (error) {
        throw error;
      }
    };
    asyncFn();
  }, []);
  console.log(adminField);
  return (
    <>
      <ScrollView className={"bg-gray-100"}>
        <View className={"p-4"}>
          <ScrollView horizontal className={"mb-4"} showsHorizontalScrollIndicator={false} contentContainerStyle={{ alignItems: "center" }}>
            {adminField?.photoUrls.map((e) => {
              return (
                <Image
                  className="h-40 w-40 rounded-lg mr-2" // Set a width and add margin-right for spacing
                  source={{ uri: e }}
                />
              );
            })}

            <Image
              className="h-40 w-40 rounded-lg mr-2" // Repeat for each image
              source={{ uri: "https://via.placeholder.com/150" }}
            />
          </ScrollView>
          <View className={""}>
            <View className={"flex-1"}>
              <Text className={"text-xl font-bold"}>{adminField?.name}</Text>
            </View>
            {/* Tags */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className={""}>
              {adminField?.tags.map((tag, idx) => {
                return (
                  <View className={"bg-blue-200 rounded-full px-3 py-1 m-1"}>
                    <Text className={"text-blue-800"}>{tag}</Text>
                  </View>
                );
              })}
              <TouchableOpacity onPress={() => setModalVisible(true)} className={"bg-gray-400 rounded-full px-3 py-1 m-1"}>
                <Text className={"text-white"}>+</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
          {/* Address */}
          <View className={"my-14"}>
            <Text className={"text-lg font-semibold"}>Address</Text>
            <Text className={"text-gray-600 py-2"}>{adminField?.address}</Text>
            <Text className={"text-blue-600"}>Edit</Text>
            <TouchableOpacity className={"bg-purple-500 w-1/2 my-2 px-4 py-2 rounded-lg"}>
              <Text className={"text-white text-center"}>UPDATE LOKASI</Text>
            </TouchableOpacity>
          </View>
          {/* Buttons */}
          <View className={"my-2"}>
            {/* <TouchableOpacity className={('bg-blue-500 my-8 w-5/6 mx-auto px-4 py-3 rounded-lg')}>
            <Text className={('text-white text-center')}>EDIT</Text>
          </TouchableOpacity> */}
          </View>
        </View>
      </ScrollView>
      <Button onPress={logoutHandler} title="Logout" />
      {modalVisible && <AddTagsModal modalVisible={modalVisible} setModalVisible={setModalVisible} />}
    </>
  );
};
