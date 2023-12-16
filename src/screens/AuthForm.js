import React from 'react';
import { Text, TextInput, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute } from '@react-navigation/native';

const AuthForm = ({navigation}) => {
    const {name} = useRoute()
    const loginScreen = (name === 'Login')
    const registerScreen = (name === 'Register')
  return (
    <LinearGradient
      colors={['#003366', '#66CCFF']}
      style={{ flex: 1, justifyContent: 'center', padding: 16 }}
    >
      <Text className="text-3xl text-white font-bold text-center mb-8">{registerScreen ? 'SIGN UP' : 'LOG IN'}</Text>
      
      <TextInput
        placeholder="Email"
        placeholderTextColor="rgba(255, 255, 255, 0.7)"
        className="text-white text-base mb-4 px-2 py-2 border-b border-white rounded-md"
      />
      { registerScreen &&
      <TextInput
        placeholder="Username"
        placeholderTextColor="rgba(255, 255, 255, 0.7)"
        className="text-white text-base mb-4 px-2 py-2 border-b border-white rounded-md"
      /> }
      
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        placeholderTextColor="rgba(255, 255, 255, 0.7)"
        className="text-white text-base mb-4 px-2 py-2 border-b border-white rounded-md"
      />
      
      <TouchableOpacity onPress={()=>navigation.navigate('Main Screen')} className="border border-white py-2 rounded-full mt-4">
        <Text className="text-white text-center py-2 text-xl tracking-wider font-semibold">{registerScreen ? 'SIGN UP' : 'LOG IN'}</Text>
      </TouchableOpacity>
      
      <TouchableOpacity className="mt-8" onPress={() => navigation.navigate(registerScreen ? 'Login' : 'Register')}>
        <Text className="text-white text-center">{loginScreen ? "Don't have an account?" : "Have an account?"}</Text>
        <Text className="text-white text-center">{registerScreen ? 'LOG IN HERE' : 'SIGN UP HERE'}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default AuthForm;
