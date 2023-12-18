import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import axios from "axios";
import { access_token } from "../../helpers/AccessToken";
import { useEffect, useState } from "react";
import ReservationItem from "../../components/PlayerReservationItem";
import BookModal from "../../components/modal/BookModal";
const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

export const ReservationCard = ({ navigation, route }) => {
  const { fieldId } = route.params;

  const [reservations, setReservations] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [indicator, setIndicator] = useState(false);
  const [bookInformation, setBookInformation] = useState({
    fieldId,
    schedule: null,
  });

  async function fetchReservations() {
    try {
      const token = await access_token();

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

      {modalVisible && <BookModal modalVisible={modalVisible} setModalVisible={setModalVisible} bookInformation={bookInformation} />}
    </>
  );

  // return (
  //   <>
  //     <TouchableOpacity onPress={() => navigation.navigate("Reservation Room")}>
  //       <View className={`px-4 w-5/6 py-4 mx-auto my-4 rounded-lg bg-green-300 shadow-lg`}>
  //         <View className={`flex-row items-center`}>
  //           <View className={`flex-1 justify-center items-center`}>
  //             <Text className={`font-bold text-lg py-2`}>
  //               <Ionicons name={"time-outline"} size={24} />
  //               15:00 - 16:00
  //             </Text>
  //             <Text className={``}>Sport : - </Text>
  //             <Text className={``}>Mode : - </Text>
  //             <Text className={``}>Status : Available </Text>
  //           </View>
  //         </View>
  //       </View>
  //     </TouchableOpacity>
  //     <View className={`px-4 w-5/6 py-4 mx-auto my-4 rounded-lg bg-gray-300 shadow-lg`}>
  //       <View className={`flex-row items-center`}>
  //         <View className={`flex-1 justify-center items-center`}>
  //           <Text className={`font-bold text-lg py-2`}>
  //             <Ionicons name={"time-outline"} size={24} />
  //             16:00 - 17:00
  //           </Text>
  //           <Text className={``}>Sport : Football </Text>
  //           <Text className={``}>Mode : Competitive </Text>
  //           <Text className={``}>Status : Booked </Text>
  //         </View>
  //       </View>
  //     </View>
  //     <View className={`px-4 w-5/6 py-4 mx-auto my-4 rounded-lg bg-gray-300 shadow-lg`}>
  //       <View className={`flex-row items-center`}>
  //         <View className={`flex-1 justify-center items-center`}>
  //           <Text className={`font-bold text-lg py-2`}>
  //             <Ionicons name={"time-outline"} size={24} />
  //             17:00 - 18:00
  //           </Text>
  //           <Text className={``}>Sport : Basketball </Text>
  //           <Text className={``}>Mode : Casual </Text>
  //           <Text className={``}>Status : Booked </Text>
  //         </View>
  //       </View>
  //     </View>
  //   </>
  // );
};
