import React, { useState, useContext } from "react";
import { Text, TextInput, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRoute } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import Toast from "toastify-react-native";
import axios from "axios";
import { LoginContext } from "../../context/AuthContext";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

export function LoginForm({ navigation }) {
  const [inputValues, setInputValues] = useState({
    usernameOrMail: "",
    password: "",
  });
  const { LoginAction, loginInfo } = useContext(LoginContext);

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
      const url = `${BASE_URL}/login`;
      console.log(inputValues);
      const {
        data: { data },
      } = await axios.post(url, inputValues);

      await LoginAction();
      await loginInfo(data);
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
      <Text className="text-3xl text-white font-bold text-center mb-8">LOG IN</Text>

      <TextInput
        placeholder="Email or username"
        value={inputValues.usernameOrMail}
        onChangeText={(text) => inputHandler("usernameOrMail", text)}
        placeholderTextColor="rgba(255, 255, 255, 0.7)"
        className="text-white text-base mb-4 px-2 py-2 border-b border-white rounded-md"
      />

      <TextInput
        placeholder="Password"
        value={inputValues.password}
        onChangeText={(text) => inputHandler("password", text)}
        secureTextEntry={true}
        placeholderTextColor="rgba(255, 255, 255, 0.7)"
        className="text-white text-base mb-4 px-2 py-2 border-b border-white rounded-md"
      />

      <TouchableOpacity onPress={submitForm} className="border border-white py-2 rounded-full mt-4">
        <Text className="text-white text-center py-2 text-xl tracking-wider font-semibold">Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="mt-8"
        onPress={() => {
          navigation.navigate("Register");
          console.log("anc");
        }}
      >
        <Text className="text-white text-center">Don't have an account?</Text>
        <Text className="text-white text-center">SIGN UP HERE</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

export function RegisterForm({ navigation }) {
  const { LoginAction, loginInfo } = useContext(LoginContext);


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
      const url = `${BASE_URL}/register`;
      const {
        data: { data },
      } = await axios.post(url, inputValues);

      await LoginAction();
      await loginInfo(data);
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
      <Text className="text-3xl text-white font-bold text-center mb-8">SIGN UP</Text>

      <TextInput
        placeholder="Email"
        onChangeText={(text) => inputHandler("email", text)}
        placeholderTextColor="rgba(255, 255, 255, 0.7)"
        className="text-white text-base mb-4 px-2 py-2 border-b border-white rounded-md"
      />
      <TextInput
        placeholder="Username"
        onChangeText={(text) => inputHandler("username", text)}
        placeholderTextColor="rgba(255, 255, 255, 0.7)"
        className="text-white text-base mb-4 px-2 py-2 border-b border-white rounded-md"
      />
      <TextInput
        placeholder="Phone Number"
        onChangeText={(text) => inputHandler("phoneNumber", text)}
        placeholderTextColor="rgba(255, 255, 255, 0.7)"
        className="text-white text-base mb-4 px-2 py-2 border-b border-white rounded-md"
      />

      <TextInput
        placeholder="Password"
        onChangeText={(text) => inputHandler("password", text)}
        secureTextEntry={true}
        placeholderTextColor="rgba(255, 255, 255, 0.7)"
        className="text-white text-base mb-4 px-2 py-2 border-b border-white rounded-md"
      />
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

      <TouchableOpacity onPress={submitForm} className="border border-white py-2 rounded-full mt-4">
        <Text className="text-white text-center py-2 text-xl tracking-wider font-semibold">SIGN UP</Text>
      </TouchableOpacity>

      <TouchableOpacity className="mt-8" onPress={() => navigation.navigate("Login")}>
        <Text className="text-white text-center">Have an account?</Text>
        <Text className="text-white text-center">LOG IN HERE</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}
