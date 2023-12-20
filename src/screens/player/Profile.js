import { LinearGradient } from "expo-linear-gradient";
import { Button, Image, Text, TouchableOpacity, TextInput } from "react-native";
import { XPBar } from "../../components/XPBar";
import { HistoryScroll } from "../../components/HistoryScroll";
import { LoginContext } from "../../context/AuthContext";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Toast } from "toastify-react-native";

export const Profile = ({ navigation }) => {
  const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

  const { LogoutAction, userInfo } = useContext(LoginContext);

  const [name, setName] = useState(null);
  const [profileData, setProfileData] = useState({
    profilePictureUrl: "",
    name: "placeholder",
    history: [],
  });

  useEffect(() => {
    const asyncFn = async () => {
      const token = userInfo.access_token;

      try {
        const {
          data: { data },
        } = await axios.get(`${BASE_URL}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfileData(data.user);
      } catch (error) {
        Toast.error(error.response?.data.message);
      }
    };
    asyncFn();
  }, []);

  const logoutHandler = async () => {
    await LogoutAction("access_token");
  };
  return (
    <>
      <LinearGradient colors={["#003366", "#66CCFF"]} style={{ flex: 1, justifyContent: "center", padding: 16 }}>
        <TouchableOpacity onPress={() => {}}>
          <Image className={`rounded-full mx-auto bg-white w-28 h-28`} source={{ uri: profileData.profilePictureUrl }} />
        </TouchableOpacity>
        <TextInput
          editable={false}
          placeholder={profileData.name}
          onChangeText={(e) => setName(e)}
          value={name}
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          className="text-white text-center text-2xl mt-4"
        />

        <XPBar currentXP={profileData.exp} />
        <HistoryScroll histories={profileData.history} />
      </LinearGradient>
      <Button onPress={logoutHandler} title="Logout" />
    </>
  );
};
