import { LinearGradient } from "expo-linear-gradient"
import { Button, Image, Text } from "react-native"
import { XPBar } from "../components/XPBar"
import { HistoryScroll } from "../components/HistoryScroll"
import { LoginContext } from "../context/AuthContext"
import {useContext} from 'react'
import * as SecureStore from 'expo-secure-store';

export const Profile = ({navigation}) => {
  const {LogoutAction, userRole} = useContext(LoginContext)
  console.log(userRole);

  const logoutHandler = async() => {
    await LogoutAction('access_token')
    console.log('logout!');
  }
    return (
        <>
    <LinearGradient
      colors={['#003366', '#66CCFF']}
      style={{ flex: 1, justifyContent: 'center', padding: 16 }}
    >
    <Image className={` rounded-full mx-auto bg-white w-24 h-24`} source={require('../assets/Sergeant1.webp')} />
      <Text className={`text-white text-center text-2xl mt-4`}>BOOM_ANAKBAIX</Text>
      <XPBar />
     <HistoryScroll/>
     <Button onPress={logoutHandler} title="Logout"/>
    </LinearGradient>
        </>
    )
}