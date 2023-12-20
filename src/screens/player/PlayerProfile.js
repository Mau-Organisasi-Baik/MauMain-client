import { LinearGradient } from "expo-linear-gradient";
import { Button, Image, Text, TouchableOpacity, TextInput } from "react-native";
import { XPBar } from "../../components/XPBar";
import { HistoryScroll } from "../../components/HistoryScroll";
import { LoginContext } from "../../context/AuthContext";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Toast } from "toastify-react-native";

export const PlayerProfile = ({ route, navigation }) => {
  const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;
  const { id } = route.params;

  const { userInfo } = useContext(LoginContext);
  const token = userInfo.access_token;

  const [profileData, setProfileData] = useState({
    profilePictureUrl: "",
    name: "placeholder",
    history: [],
  });

  useEffect(() => {
    const asyncFn = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/profile/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfileData(data.data.user);
      } catch (error) {
        Toast.error(error.response?.data.message);
      }
    };
    asyncFn();
  }, []);
  return (
    <>
      <LinearGradient colors={["#003366", "#66CCFF"]} style={{ flex: 1, justifyContent: "center", padding: 16 }}>
        <TouchableOpacity onPress={() => {}}>
          <Image className={`rounded-full mx-auto bg-white w-28 h-28`} source={{ uri: profileData.profilePictureUrl }} />
        </TouchableOpacity>
        <Text placeholderTextColor="rgba(255, 255, 255, 0.7)" className="text-white text-center text-2xl mt-4">
          {profileData.name}
        </Text>

        <XPBar currentXP={profileData.exp} />
        <HistoryScroll histories={profileData.history} />
      </LinearGradient>
    </>
  );
};
