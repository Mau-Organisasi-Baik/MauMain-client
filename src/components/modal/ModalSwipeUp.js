import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ScrollView, Animated, Image, View, Text, TouchableOpacity } from "react-native";
import axios from "axios";
import { LoginContext } from "../../context/AuthContext";
import { Toast } from "toastify-react-native";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

function SkeletonDrawer() {
  const { userInfo } = useContext(LoginContext);
  const token = userInfo.access_token;

  return (
    <View className={`p-4`}>
      <ScrollView>
        <Image className=" mx-auto rounded-xl w-full h-64 object-cover" source={require("../../assets/lapangan.jpg")} />

        <Text className=" text-xl font-bold">Lapangan</Text>
        <View className={"flex flex-row"}></View>
        <View className=" my-4">
          {/* <TouchableOpacity onPress={() => navigation.navigate("Reservation Card")} className="bg-blue-500 px-14 py-2  rounded-lg">
            <Text className="text-lg text-center tracking-wider">Book Now</Text>
          </TouchableOpacity> */}
        </View>
      </ScrollView>
    </View>
  );
}

const BottomDrawer = ({ isDrawerOpen, setIsDrawerOpen, fieldId }) => {
  const { userInfo } = useContext(LoginContext);
  const token = userInfo.access_token;

  const drawerHeight = useRef(new Animated.Value(0)).current; // Initial height for the drawer
  const navigation = useNavigation();

  useEffect(() => {
    if (isDrawerOpen) {
      Animated.spring(drawerHeight, { toValue: 500, useNativeDriver: false }).start();
    } else {
      Animated.spring(drawerHeight, { toValue: 0, useNativeDriver: false }).start();
    }
  }, [isDrawerOpen]);

  const [fieldDetail, setFieldDetail] = useState(null);

  async function fetchFieldDetail() {
    try {
      const url = `${BASE_URL}/fields/${fieldId}`;

      const {
        data: { data },
      } = await axios.get(url, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const fieldData = data.field;
      setFieldDetail(fieldData);
    } catch (error) {
      Toast.error(error.response?.data.message);
    }
  }

  useEffect(() => {
    fetchFieldDetail();
  }, []);

  let content;

  if (!fieldDetail) {
    content = <SkeletonDrawer />;
  } else {
    const { name, tags, photoUrls, _id: fieldId } = fieldDetail;

    let image = require("../../assets/lapangan.jpg");
    if (photoUrls[0]) {
      image = { uri: photoUrls[0] };
    }

    content = (
      <View className={`p-4`}>
        <ScrollView>
          <Image className=" mx-auto shadow-xl rounded-xl w-full h-64 object-cover" source={image} />

          <Text className=" text-xl font-bold">{name}</Text>
          <View className={"flex flex-row"}>
            {tags.map((tag, idx) => {
              return (
                <Text key={idx} className=" bg-red-200 w-3/12 text-center my-2 mx-2 rounded-lg">
                  {tag.name}
                </Text>
              );
            })}
          </View>
          <View className=" my-4">
            <TouchableOpacity onPress={() => navigation.navigate("Reservation Card", { fieldId })} className="bg-blue-500 px-14 py-2  rounded-lg">
              <Text className="text-lg text-center tracking-wider">See Reservations</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <Animated.View
      className={`absolute bottom-0 w-full bg-white rounded-t-xl`}
      style={{
        height: drawerHeight, // Bind the animated value
      }}
    >
      {/* Your drawer content */}
      <TouchableOpacity onPress={() => setIsDrawerOpen(!isDrawerOpen)}>
        <Text className={`text-center p-4`}>{isDrawerOpen ? "Swipe or tap to close" : "Swipe or tap to open"}</Text>
      </TouchableOpacity>
      {content}
    </Animated.View>
  );
};

export default BottomDrawer;
