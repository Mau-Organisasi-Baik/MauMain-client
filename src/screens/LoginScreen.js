import React from 'react';
import { Text, TextInput, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const SignInScreen = ({navigation}) => {
  return (
    <LinearGradient
      colors={['#003366', '#66CCFF']}
      style={{ flex: 1, justifyContent: 'center', padding: 16 }}
    >
      <Text className="text-3xl text-white font-bold text-center mb-8">SIGN IN</Text>
      
      <TextInput
        placeholder="Email"
        placeholderTextColor="rgba(255, 255, 255, 0.7)"
        className="text-white text-base mb-4 px-2 py-2 border-b border-white rounded-md"
      />
      
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        placeholderTextColor="rgba(255, 255, 255, 0.7)"
        className="text-white text-base mb-4 px-2 py-2 border-b border-white rounded-md"
      />
      
      <TouchableOpacity className="border border-white py-2 rounded-full mt-4">
        <Text className="text-white text-center py-2 text-xl tracking-wider font-semibold">SIGN IN</Text>
      </TouchableOpacity>
      
      <TouchableOpacity className="mt-8">
        <Text className="text-white text-center">Don't have an account?</Text>
        <Text className="text-white text-center">SIGN UP HERE</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default SignInScreen;
