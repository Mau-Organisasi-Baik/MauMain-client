import { FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { PlayerCard } from "../../components/card/PlayerCard";
import { useCallback, useContext, useEffect, useState } from "react";
import { FieldInfo } from "../../components/FieldInfo";
import { InputScoreModal } from "../../components/modal/InputScoreModal";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { BASE_URL } from "../../helpers/BASE_URL";
import { useFocusEffect } from "@react-navigation/native";

import { LoginContext } from "../../context/AuthContext";
import { Toast } from "toastify-react-native";

export const AdminDetailReservation = ({ route, navigation }) => {
  const { id } = route.params;
  const [detailField, setDetailField] = useState({});
  const [players, setPlayers] = useState([]);
  const { userInfo } = useContext(LoginContext);
  const token = userInfo.access_token;
  const gameStatus = detailField.status;
  const gameType = detailField.type;

  const [indicator, setIndicator] = useState(false);

  function changeIndicator() {
    setIndicator(!indicator);
  }

  const endGame = async () => {
    try {
      const { data } = await axios.put(
        `${BASE_URL}/admin/reservations/${id}/end`,
        { id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      Toast.error(error.response?.data.message);
    }

    setDetailField((previousValue) => ({
      ...previousValue,
      status: data.data.status,
    }));
  };
  const cancelReservation = async () => {
    try {
      const { data } = await axios.delete(`${BASE_URL}/admin/reservations/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data.data);
      navigation.goBack();
    } catch (error) {
      Toast.error(error.response?.data.message);
    }
  };

  const asyncFn = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/admin/reservations/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDetailField(data.data.reservation);
      setPlayers(data.data.reservation.players);
    } catch (error) {
      Toast.error(error.response?.data.message);
    }
  };
  useEffect(() => {
    asyncFn();
    navigation.setOptions({
      headerRight: () => <Ionicons name={"trash-outline"} size={24} onPress={() => cancelReservation()} />,
    });
  }, [indicator]);

  useFocusEffect(
    useCallback(() => {
      asyncFn();
      return () => {};
    }, [])
  );

  const [modalVisible, setModalVisible] = useState(false);
  const inputScoreHandler = () => {
    setModalVisible(true);
  };

  return (
    <>
      <View className={`flex-1 bg-blue-900 p-4`}>
        <FieldInfo detailField={detailField} admin />
        <FlatList
          data={players}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => {
            const borderColor = index % 2 === 0 ? "red" : "blue";
            return (
              <PlayerCard
                gameStatus={detailField.status}
                setPlayers={setPlayers}
                player={item}
                admin
                style={{ borderColor, borderWidth: 2 }}
                fieldId={id}
              />
            );
          }}
        />
        {gameStatus === "upcoming" ? (
          <TouchableOpacity onPress={gameType === "competitive" ? inputScoreHandler : endGame} className={`bg-blue-700 p-4 rounded-full`}>
            <Text className={`text-white text-center text-lg`}>{gameType === "competitive" ? "Input Score" : "Done"}</Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}
        {/* <TouchableOpacity onPress={() => setModalVisible(true)} className={`bg-blue-700 p-4 rounded-full`}>
        <Text className={`text-white text-center text-lg`}>Input Score</Text>
      </TouchableOpacity> */}
      </View>
      {modalVisible && (
        <InputScoreModal modalVisible={modalVisible} setModalVisible={setModalVisible} reservationId={id} changeIndicator={changeIndicator} />
      )}
    </>
  );
};
