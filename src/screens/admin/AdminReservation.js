import { useCallback, useContext, useEffect, useState } from "react";
import { AdminReservationCard } from "../../components/card/AdminReservationCard";
import { useFocusEffect } from "@react-navigation/native";
import { FlatList } from "react-native";
import axios from "axios";
const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

import { LoginContext } from "../../context/AuthContext";

export const AdminReservation = () => {
  const [reservations, setReservations] = useState([]);

  const { userInfo } = useContext(LoginContext);

  const token = userInfo.access_token;

  const asyncFn = async () => {
    const { data } = await axios.get(`${BASE_URL}/admin/reservations`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(data, token);

    setReservations(data.data.reservations);
  };

  useEffect(() => {
    asyncFn();
  }, []);

  useFocusEffect(
    useCallback(() => {
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
