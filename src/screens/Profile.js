import { LinearGradient } from "expo-linear-gradient"
import { Button, Image, Text, TouchableOpacity, TextInput } from "react-native"
import { XPBar } from "../components/XPBar"
import { HistoryScroll } from "../components/HistoryScroll"
import { LoginContext } from "../context/AuthContext"
import {useContext, useState, useEffect} from 'react'
import { pickImage } from "../helpers/UploadImage"
import axios from "axios"
import { access_token } from "../helpers/AccessToken"



export const Profile = ({navigation}) => {
  const {LogoutAction} = useContext(LoginContext)
  const [name, setName] = useState(null)
  const [profileData, setProfileData] = useState([])
  useEffect(() => {
    const asyncFn = async() => {
      const token = await access_token()
      const {data} = await axios.get('https://3ff1-110-137-195-250.ngrok-free.app/profile', {
        headers : {
          Authorization : `Bearer ${token}`
        }
      })
      setProfileData(data.data.user)
    }
    asyncFn()
  }, [])
  
console.log(profileData);
  const logoutHandler = async() => {
    await LogoutAction('access_token')
    
  }
    return (
        <>
    <LinearGradient
      colors={['#003366', '#66CCFF']}
      style={{ flex: 1, justifyContent: 'center', padding: 16 }}
    >
      <TouchableOpacity onPress={pickImage}>
        <Image className={`rounded-full mx-auto bg-white w-28 h-28`} source={{uri: profileData.profilePictureUrl}} />
      </TouchableOpacity>
      <TextInput
        placeholder={profileData.name}
        onChangeText={(e) => setName(e) }
        value={name}
        placeholderTextColor="rgba(255, 255, 255, 0.7)"
        className="text-white text-center text-2xl mt-4"
      />
      <XPBar currentXP={profileData.exp} />
     <HistoryScroll/>
     <Button onPress={logoutHandler} title="Logout"/>
    </LinearGradient>
        </>
    )
}