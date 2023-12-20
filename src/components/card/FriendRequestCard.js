import { View, Text, Image, TouchableOpacity } from "react-native";
import { useContext, useState, useEffect } from "react";
import { LoginContext } from "../../context/AuthContext";
import { BASE_URL } from "../../helpers/BASE_URL";
import axios from "axios";
import TOAST from "toastify-react-native";

export const FriendRequestCard = ({ friendRequest, toggleIndicator }) => {
  const { userInfo } = useContext(LoginContext);
  const token = userInfo.access_token;

  const acceptRequest = async () => {
    try {
      console.log(`${BASE_URL}/friends/${friendRequest._id}/accept`);
      await axios.put(
        `${BASE_URL}/friends/${friendRequest._id}/accept`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toggleIndicator();
      TOAST.success(`Accepted!!`);
    } catch (error) {
      console.log(error.response.data);
      TOAST.error(error.response.data.message);
    }
  };

  const rejectRequest = async () => {
    try {
      await axios.delete(`${BASE_URL}/friends/${friendRequest._id}/reject`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toggleIndicator();
      TOAST.success(`Rejected!!`);
    } catch (error) {
      TOAST.error(error.response.data.message);
    }
  };
  return (
    <>
      <View className={`px-4 py-2 w-5/6 mx-auto mt-8 rounded-lg bg-white shadow-lg`}>
        <View className={`flex-row items-center`}>
          <Image className={`h-28 w-28 rounded-lg mr-4`} source={require("../../assets/MAUMAIN.png")} />
          <View className={`flex-1 justify-center`}>
            <Text className={`text-lg`}>{`${friendRequest.name} mengirim permintaan pertemanan `}</Text>
            <View className="flex-row gap-2 my-1">
              <TouchableOpacity onPress={rejectRequest} className="bg-red-300 rounded-full px-2 py-1">
                <Text className="text-white">Reject</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={acceptRequest} className="bg-blue-300 rounded-full px-2 py-1">
                <Text className="text-white">Accept</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};
