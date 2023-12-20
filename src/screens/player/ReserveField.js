import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { PlayerNormalCard } from "../../components/card/PlayerCard";
import { PlayerFieldInfo } from "../../components/FieldInfo";

import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { LoginContext } from "../../context/AuthContext";
import { Toast } from "toastify-react-native";
import { InviteFriendModal } from "../../components/modal/InviteFriendModal";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

function CasualReservation({ reservation }) {
  const { players } = reservation;
  return (
    <>
      {players.map((player, idx) => {
        return <PlayerNormalCard key={idx} player={player} onPress={() => {}} />;
      })}
    </>
  );
}

function CompetitiveReservation({ reservation }) {
  const { players } = reservation;

  // todo: backend-teaming

  const teamAPlayers = players.filter((player) => player.team === "A");
  const teamBPlayers = players.filter((player) => player.team === "B");

  return (
    <>
      <Text className={`text-white text-xl mb-2`}>TEAM A</Text>
      {teamAPlayers.map((player, idx) => {
        return <PlayerNormalCard key={idx} player={player} onPress={() => {}} />;
      })}

      <Text className={`text-white text-xl my-2 mb-2`}>TEAM B</Text>
      {teamBPlayers.map((player, idx) => {
        return <PlayerNormalCard key={idx} player={player} onPress={() => {}} />;
      })}
    </>
  );
}

function UpcomingReservation({ reservation, field, toggleindicator, leftReservation }) {
  const { userInfo } = useContext(LoginContext);
  const token = userInfo.access_token;

  const { _id: reservationId, type, players, schedule, tag } = reservation;

  let content;

  if (type === "competitive") content = <CompetitiveReservation reservation={reservation} />;
  if (type === "casual") content = <CasualReservation reservation={reservation} />;

  async function joinReservation() {
    try {
      const url = `${BASE_URL}/reservations/${reservationId}/join`;
      await axios.put(
        url,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
    } catch (error) {
      Toast.error(error.response.data);
    } finally {
      toggleindicator();
    }
  }

  async function leaveReservation() {
    try {
      const url = `${BASE_URL}/reservations/${reservationId}/leave`;
      await axios.put(
        url,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      Toast.info("Left the Reservation");
      leftReservation();
    } catch (error) {
      Toast.error(error.response);
    } finally {
      toggleindicator();
    }
  }

  // todo: check already joined
  const playerId = userInfo.playerId;

  const isJoined =
    players.filter((player) => {
      // todo: get player id
      return player._id === playerId;
    }).length > 0;

  let buttonContent;

  if (players.length < tag.limit) {
    buttonContent = (
      <TouchableOpacity className={`bg-blue-700 p-4 rounded-full`} onPress={() => joinReservation()}>
        <Text className={`text-white text-center text-lg`}>JOIN</Text>
      </TouchableOpacity>
    );
  }

  if (isJoined) {
    buttonContent = (
      <TouchableOpacity className={`bg-red-700 p-4 rounded-full`} onPress={() => leaveReservation()}>
        <Text className={`text-white text-center text-lg`}>LEAVE</Text>
      </TouchableOpacity>
    );
  }

  return (
    <>
      <View className={`flex-1 bg-blue-900 p-4`}>
        <PlayerFieldInfo field={field} schedule={schedule} tag={tag} />
        <ScrollView className={`mb-4`}>{content}</ScrollView>
        {buttonContent}
      </View>
    </>
  );
}

function EndedReservation({ reservation, field }) {
  const { type, schedule, tag } = reservation;

  let content;

  if (type === "competitive") content = <CompetitiveReservation reservation={reservation} />;
  if (type === "casual") content = <CasualReservation reservation={reservation} />;

  return (
    <>
      <View className={`flex-1 bg-blue-900 p-4`}>
        <PlayerFieldInfo field={field} schedule={schedule} tag={tag} />
        <ScrollView className={`mb-4`}>{content}</ScrollView>
      </View>
    </>
  );
}

export const ReserveField = ({ route, navigation }) => {
  const { reservationId } = route.params;
  const [reservationDetail, setReservationDetail] = useState(null);
  const [fieldDetail, setFieldDetail] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [changeIndicator, setChangeIndicator] = useState(false);
  const { userInfo } = useContext(LoginContext);

  const token = userInfo.access_token;
  function toggleindicator() {
    setChangeIndicator(!changeIndicator);
  }

  function leftReservation() {
    navigation.goBack();
  }

  async function fetchReservationDetail() {
    try {
      const url = `${BASE_URL}/reservations/${reservationId}`;
      const {
        data: { data },
      } = await axios.get(url, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      setReservationDetail(data.reservation);

      const { fieldId } = data.reservation;

      const urlField = `${BASE_URL}/fields/${fieldId}`;
      const {
        data: { data: dataField },
      } = await axios.get(urlField, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      setFieldDetail(dataField.field);
    } catch (error) {
      Toast.error(error.response?.data.message);
    }
  }

  useEffect(() => {
    fetchReservationDetail();

    navigation.setOptions({
      headerRight: () => <Ionicons name={"person-add"} size={24} onPress={() => setModalVisible(true)} />,
    });
  }, [changeIndicator]);

  if (!reservationDetail) return <></>;

  const { status, fieldId } = reservationDetail;

  if (status === "ended") return <EndedReservation reservation={reservationDetail} field={fieldDetail} />;
  if (status === "upcoming")
    return (
      <>
        <UpcomingReservation
          reservation={reservationDetail}
          field={fieldDetail}
          toggleindicator={toggleindicator}
          leftReservation={leftReservation}
        />
        {modalVisible && <InviteFriendModal fieldId={fieldId} setModalVisible={setModalVisible} modalVisible={modalVisible} />}
      </>
    );
};
