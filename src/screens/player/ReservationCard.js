import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import ReservationItem from "../../components/PlayerReservationItem";
import BookModal from "../../components/modal/BookModal";
import { useFocusEffect } from "@react-navigation/native";
import { LoginContext } from "../../context/AuthContext";
const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

export const ReservationCard = ({ navigation, route }) => {
  
  const { fieldId } = route.params;

  useFocusEffect(
    useCallback(() => {
      fetchReservations();
      return () => {};
    }, [])
  );
  
  const [reservations, setReservations] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [indicator, setIndicator] = useState(false);
  const [bookInformation, setBookInformation] = useState({
    fieldId,
    schedule: null,
  });
  const { userInfo } = useContext(LoginContext);
  const token = userInfo.access_token;

  function toggleIndicator() {
    setIndicator(!indicator);
  }

 

  async function fetchReservations() {
    try {
      const url = `${BASE_URL}/fields/${fieldId}/reservations`;

      const {
        data: { data },
      } = await axios.get(url, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      // console.log(data);
      setReservations(data.reservations);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    fetchReservations();
  }, [indicator]);

  // todo: skeletons

  if (reservations.length == 0) return <></>;

  function navigateToReservation(reservationId) {
    navigation.navigate("Reservation Room", { reservationId });
  }

  function navigateToBook(schedule) {
    setModalVisible(true);
    setBookInformation({
      fieldId,
      schedule,
    });
  }

  return (
    <>
      {reservations.map((reservation, idx) => {
        return <ReservationItem key={idx} reservation={reservation} navigateReservation={navigateToReservation} navigateBook={navigateToBook} />;
      })}

      {modalVisible && (
        <BookModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          bookInformation={bookInformation}
          toggleIndicator={toggleIndicator}
        />
      )}
    </>
  );
};
