import { FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { PlayerCard } from "../../components/card/PlayerCard"
import {useEffect, useState} from 'react'
import { FieldInfo } from "../../components/FieldInfo";
import { InputScoreModal } from "../../components/modal/InputScoreModal";
import axios from "axios";
import { BASE_URL } from "../../helpers/BASE_URL";
import { access_token } from "../../helpers/AccessToken";

export const AdminDetailReservation = ({route}) => {
  const {id} = route.params
  const [detailField, setDetailField] = useState({})
  const [players, setPlayers] = useState([])

  const endGame = async() => {
    const token = await access_token()
    const {data} = await axios.put(`${BASE_URL}/admin/reservations/${id}/end`, {id}, {
      headers : {
        'Authorization' : `Bearer ${token}`
    }
  })
  console.log(data);
  setDetailField(previousValue => ({
    ...previousValue,
    status: data.data.status 
  }))
  }
  
  useEffect(() => {
    const asyncFn = async() => {
      try {
        const token = await access_token()
        const {data} = await axios.get(`${BASE_URL}/admin/reservations/${id}`, {
          headers : {
            'Authorization' : `Bearer ${token}`
        }
        })
        setDetailField(data.data.reservation)
        setPlayers(data.data.reservation.players)
      } catch (error) {
        throw error
      }
    }
    asyncFn()
  }, [])
  const [modalVisible, setModalVisible] = useState(false);
  
    return (
        <>
    <View className={`flex-1 bg-blue-900 p-4`}>
        <FieldInfo detailField={detailField} admin/>
      <FlatList 
        data={players}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => {
          const borderColor = index % 2 === 0 ? 'red' : "blue"
          return <PlayerCard gameStatus={detailField.status} setPlayers={setPlayers} player={item} admin style={{borderColor, borderWidth:2}} fieldId={id} />} 
        }
      />
      
      <TouchableOpacity onPress={endGame}  className={`bg-blue-700 p-4 rounded-full`}>
        <Text className={`text-white text-center text-lg`}>Done</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={() => setModalVisible(true)} className={`bg-blue-700 p-4 rounded-full`}>
        <Text className={`text-white text-center text-lg`}>Input Score</Text>
      </TouchableOpacity> */}
    </View>
    {modalVisible && <InputScoreModal modalVisible={modalVisible} setModalVisible={setModalVisible}/>}
        </>
    )
}