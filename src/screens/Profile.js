import { LinearGradient } from "expo-linear-gradient"
import { Image, Text } from "react-native"
import { XPBar } from "../components/XPBar"
import { HistoryScroll } from "../components/HistoryScroll"

export const Profile = () => {
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
    </LinearGradient>
        </>
    )
}