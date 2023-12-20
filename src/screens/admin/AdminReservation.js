import { useCallback, useContext, useEffect, useState } from "react";
import { AdminReservationCard } from "../../components/card/AdminReservationCard";
import { useFocusEffect } from "@react-navigation/native";
import { FlatList } from "react-native";
import axios from "axios";
const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

import { LoginContext } from "../../context/AuthContext";
import { Toast } from "toastify-react-native";

export const AdminReservation = () => {
  const [reservations, setReservations] = useState([]);

  const { userInfo } = useContext(LoginContext);

  let token = userInfo.access_token;

  const asyncFn = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/admin/reservations`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(data);

      setReservations(data.data.reservations);
    } catch (error) {
      Toast.error(error.response?.data.message);
    }
  };

  useEffect(() => {
    asyncFn();
  }, []);

  useFocusEffect(
    useCallback(() => {
      console.log(token);
      token = userInfo.access_token;
      asyncFn();
      return () => {};
    }, [])
  );
  return (
    <>
      <FlatList data={reservations} keyExtractor={(item) => item.id} renderItem={({ item }) => <AdminReservationCard reservation={item} />} />
    </>
  );
};
