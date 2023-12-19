import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { PlayerCard, PlayerNormalCard } from "../../components/card/PlayerCard";
import { FieldInfo, PlayerFieldInfo } from "../../components/FieldInfo";
import BookModal from "../../components/modal/BookModal";
import { useEffect, useState } from "react";
import axios from "axios";
import { access_token } from "../../helpers/AccessToken";
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

  return (
    <>
      <Text className={`text-white text-xl mb-2`}>TEAM A</Text>
      {/* <PlayerCard style={{ borderColor: "orange", borderWidth: 2 }} playerName="Jinx Pro Amanda" playerStatus="Chat" onPress={() => {}} />

      <PlayerCard playerName="Jinx Pro Baix" playerStatus="Chat" onPress={() => {}} />
      <PlayerCard playerName="Boom_AnakBaix" playerStatus="Chat" onPress={() => {}} />
      <PlayerCard playerName="InYourDream" playerStatus="Chat" onPress={() => {}} />
      <PlayerCard playerName="MauBaix" playerStatus="Chat" onPress={() => {}} />
      <Text className={`text-white text-xl my-2 mb-2`}>TEAM B</Text>
      <PlayerCard playerName="Budi543" playerStatus="Chat" onPress={() => {}} />
      <PlayerCard playerName="EVOS_baixPro" playerStatus="Chat" onPress={() => {}} />
      <PlayerCard playerName="EVOS_DEWA" playerStatus="Chat" onPress={() => {}} />
      <PlayerCard playerName="MauJahat546" playerStatus="Chat" onPress={() => {}} /> */}
    </>
  );
}

function UpcomingReservation({ reservation, field, toggleindicator }) {
  const { _id: reservationId, type, players, schedule, tag } = reservation;

  let content;

  if (type === "competitive") content = <CompetitiveReservation reservation={reservation} />;
  if (type === "casual") content = <CasualReservation reservation={reservation} />;

  async function joinReservation() {
    const token = await access_token();

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

    console.log("joined");

    toggleindicator();
  }

  async function leaveReservation() {
    const token = await access_token();

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

    toggleindicator();
  }

  // todo: check already joined
  const isJoined =
    players.filter((player) => {
      // todo: get player id
      return true
      return player._id === "playerID";
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

export const ReserveField = ({ route }) => {
  const { reservationId } = route.params;
  const [reservationDetail, setReservationDetail] = useState(null);
  const [fieldDetail, setFieldDetail] = useState(null);
  const [changeIndicator, setChangeIndicator] = useState(false);

  function toggleindicator() {
    setChangeIndicator(!changeIndicator);
  }

  async function fetchReservationDetail() {
    const token = await access_token();

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
  }

  useEffect(() => {
    fetchReservationDetail();
  }, []);

  if (!reservationDetail) return <></>;

  const { status } = reservationDetail;

  if (status === "ended") return <EndedReservation reservation={reservationDetail} field={fieldDetail} />;
  if (status === "upcoming") return <UpcomingReservation reservation={reservationDetail} field={fieldDetail} toggleindicator={toggleindicator} />;

  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <View className={`flex-1 bg-blue-900 p-4`}>
        <FieldInfo />
        <ScrollView className={`mb-4`}>
          <Text className={`text-white text-xl mb-2`}>TEAM A</Text>
          <PlayerCard style={{ borderColor: "orange", borderWidth: 2 }} playerName="Jinx Pro Amanda" playerStatus="Chat" onPress={() => {}} />

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
      {modalVisible && <BookModal modalVisible={modalVisible} setModalVisible={setModalVisible} />}
    </>
  );
};
