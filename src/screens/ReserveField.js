import { ScrollView, Text, TouchableOpacity, View } from "react-native"
import { PlayerCard } from "../components/PlayerCard"
import { FieldInfo } from "../components/FieldInfo"
import BookModal from "../components/BookModal";
import { useState } from "react";

export const ReserveField = () => {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <>
    <View className={`flex-1 bg-blue-900 p-4`}>
        <FieldInfo/>
      <ScrollView className={`mb-4`}>
        <Text className={`text-white text-xl mb-2`}>TEAM A</Text>
        <PlayerCard style={{borderColor:"orange", borderWidth:2}} playerName="Jinx Pro Amanda" playerStatus="Chat" onPress={() => {}} />
        {/* ... other cards */}
        <PlayerCard playerName="Jinx Pro Baix" playerStatus="Chat" onPress={() => {}} />
        <PlayerCard playerName="Boom_AnakBaix" playerStatus="Chat" onPress={() => {}} />
        <PlayerCard playerName="InYourDream" playerStatus="Chat" onPress={() => {}} />
        <PlayerCard playerName="MauBaix" playerStatus="Chat" onPress={() => {}} />
        <Text className={`text-white text-xl my-2 mb-2`}>TEAM B</Text>
        <PlayerCard playerName="Budi543" playerStatus="Chat" onPress={() => {}} />
        <PlayerCard playerName="EVOS_baixPro" playerStatus="Chat" onPress={() => {}} />
        <PlayerCard playerName="EVOS_DEWA" playerStatus="Chat" onPress={() => {}} />
        <PlayerCard playerName="MauJahat546" playerStatus="Chat" onPress={() => {}} />
      </ScrollView>
      <TouchableOpacity onPress={() => setModalVisible(true)} className={`bg-blue-700 p-4 rounded-full`}>
        <Text className={`text-white text-center text-lg`}>BOOK</Text>
      </TouchableOpacity>
    </View>
    {modalVisible && <BookModal modalVisible={modalVisible} setModalVisible={setModalVisible}/>}
        </>
    )
}