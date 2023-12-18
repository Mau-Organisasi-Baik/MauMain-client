import { ScrollView, Text, TouchableOpacity, View } from "react-native"
import { PlayerCard } from "../../components/card/PlayerCard"
import {useState} from 'react'
import { FieldInfo } from "../../components/FieldInfo";
import { InputScoreModal } from "../../components/modal/InputScoreModal";

export const AdminDetailReservation = () => {
  const [modalVisible, setModalVisible] = useState(false);
  
    return (
        <>
    <View className={`flex-1 bg-blue-900 p-4`}>
        <FieldInfo admin/>
      <ScrollView className={`mb-4`}>
        <Text className={`text-white text-xl mb-2`}>TEAM A</Text>
        <PlayerCard admin style={{borderColor:"orange", borderWidth:2}} playerName="Jinx Pro Amanda"  onPress={() => {}} />
        {/* ... other cards */}
        <PlayerCard admin playerName="Jinx Pro Baix"  onPress={() => {}} />
        <PlayerCard admin playerName="Boom_AnakBaix"  onPress={() => {}} />
        <PlayerCard admin playerName="InYourDream"  onPress={() => {}} />
        <PlayerCard admin playerName="MauBaix"  onPress={() => {}} />
        <Text className={`text-white text-xl my-2 mb-2`}>TEAM B</Text>
        <PlayerCard admin playerName="Budi543"  onPress={() => {}} />
        <PlayerCard admin playerName="EVOS_baixPro"  onPress={() => {}} />
        <PlayerCard admin playerName="EVOS_DEWA"  onPress={() => {}} />
        <PlayerCard admin playerName="MauJahat546"  onPress={() => {}} />
      </ScrollView>
      <TouchableOpacity onPress={() => setModalVisible(true)} className={`bg-blue-700 p-4 rounded-full`}>
        <Text className={`text-white text-center text-lg`}>Input Score</Text>
      </TouchableOpacity>
    </View>
    {modalVisible && <InputScoreModal modalVisible={modalVisible} setModalVisible={setModalVisible}/>}
        </>
    )
}