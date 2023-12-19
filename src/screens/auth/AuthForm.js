import React, { useState, useContext } from "react";
import { Text, TextInput, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRoute } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import Toast from "toastify-react-native";
import axios from "axios";
import { LoginContext } from "../../context/AuthContext";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;


const AuthForm = ({ navigation }) => {
  const { name } = useRoute();
  const { LoginAction, UserInfo } = useContext(LoginContext);
  const loginScreen = name === "Login";

  const registerScreen = name === "Register";
  const uri = registerScreen ? "register" : "login";
  const [inputValues, setInputValues] = useState({
    name: "",
    username: "",
    phoneNumber: "",
    email: "",
    password: "",
    role: "",
  });
  const inputHandler = (inputIdentifier, enteredValue) => {
    setInputValues((currValue) => {
      return {
        ...currValue,
        [inputIdentifier]: enteredValue,
      };
    });
  };

  const submitForm = async () => {
    try {
      const { data } = await axios.post(`${BASE_URL}/${uri}`, inputValues);

      if (!registerScreen) {
        await LoginAction("access_token", data.data.access_token);
        await UserInfo("user_info", data.data.role);
      } else {
        navigation.navigate("Login");
      }
    } catch (error) {
      console.log(error.response.data);
      if (error.response) {
        Toast.error(error.response.data.message);
      } else if (error.request) {
        Toast.error(error.request);
      } else {
        Toast.error("Error", error.message);

      }
    }
  };

  return (
    <LinearGradient colors={["#003366", "#66CCFF"]} style={{ flex: 1, justifyContent: "center", padding: 16 }}>
      <Text className="text-3xl text-white font-bold text-center mb-8">{registerScreen ? "SIGN UP" : "LOG IN"}</Text>

      <TextInput
        placeholder="Email"
        onChangeText={inputHandler.bind(this, !registerScreen ? "usernameOrMail" : "email")}
        placeholderTextColor="rgba(255, 255, 255, 0.7)"
        className="text-white text-base mb-4 px-2 py-2 border-b border-white rounded-md"
      />
      {registerScreen && (
        <TextInput
          placeholder="Username"
          onChangeText={inputHandler.bind(this, "username")}
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          className="text-white text-base mb-4 px-2 py-2 border-b border-white rounded-md"
        />
      )}
      {registerScreen && (
        <TextInput
          placeholder="Phone Number"
          onChangeText={inputHandler.bind(this, "phoneNumber")}
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          className="text-white text-base mb-4 px-2 py-2 border-b border-white rounded-md"
        />
      )}

      <TextInput
        placeholder="Password"
        onChangeText={inputHandler.bind(this, "password")}
        secureTextEntry={true}
        placeholderTextColor="rgba(255, 255, 255, 0.7)"
        className="text-white text-base mb-4 px-2 py-2 border-b border-white rounded-md"
      />
      {registerScreen && (
        <Picker
          style={{
            color: "rgba(255, 255, 255, 0.7)",
            marginBottom: 16,
            paddingHorizontal: 8,
            paddingVertical: 8,
            borderBottomWidth: 1,
            borderBottomColor: "white",
            borderRadius: 4,
            backgroundColor: "transparent",
          }}
          onValueChange={inputHandler.bind(this, "role")}
          selectedValue={inputValues.role}
        >
          <Picker.Item label="Register as" value={0} />
          <Picker.Item label="Player" value={"player"} />
          <Picker.Item label="Admin" value={"field"} />
        </Picker>
      )}

      <TouchableOpacity onPress={submitForm} className="border border-white py-2 rounded-full mt-4">
        <Text className="text-white text-center py-2 text-xl tracking-wider font-semibold">{registerScreen ? "SIGN UP" : "LOG IN"}</Text>
      </TouchableOpacity>

      <TouchableOpacity className="mt-8" onPress={() => navigation.navigate(registerScreen ? "Login" : "Register")}>
        <Text className="text-white text-center">{loginScreen ? "Don't have an account?" : "Have an account?"}</Text>
        <Text className="text-white text-center">{registerScreen ? "LOG IN HERE" : "SIGN UP HERE"}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default AuthForm;
