import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { getScheduleTime } from "../helpers/ScheduleTime";

function EmptyReservationItem({ reservation, navigateBook }) {
  const {
    schedule: { TimeStart, TimeEnd, _id: scheduleId },
    fieldId,
  } = reservation;

  const timeStart = getScheduleTime(TimeStart);
  const timeEnd = getScheduleTime(TimeEnd);

  return (
    <TouchableOpacity onPress={() => navigateBook(reservation.schedule)}>
      <View className={`px-4 w-5/6 py-4 mx-auto my-4 rounded-lg bg-green-300 shadow-lg`}>
        <View className={`flex-row items-center`}>
          <View className={`flex-1 justify-center items-center`}>
            <Text className={`font-bold text-lg py-2`}>
              <Ionicons name={"time-outline"} size={24} />
              {timeStart} - {timeEnd}
            </Text>
            <Text className={``}>Status : Available </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function UpcomingReservationItem({ reservation, navigateReservation }) {
  const {
    _id: reservationId,
    schedule: { TimeStart, TimeEnd },
    tag: { name, limit },
    players,
    type,
  } = reservation;

  const timeStart = getScheduleTime(TimeStart);
  const timeEnd = getScheduleTime(TimeEnd);

  let status;

  if (players.length >= limit) {
    status = "full";
  } else {
    status = `${players.length} / ${limit}`;
  }

  return (
    <TouchableOpacity onPress={() => navigateReservation(reservationId)}>
      <View className={`px-4 w-5/6 py-4 mx-auto my-4 rounded-lg bg-blue-300 shadow-lg`}>
        <View className={`flex-row items-center`}>
          <View className={`flex-1 justify-center items-center`}>
            <Text className={`font-bold text-lg py-2`}>
              <Ionicons name={"time-outline"} size={24} />
              {timeStart} - {timeEnd}
            </Text>
            <Text className={``}>Sport : {name} </Text>
            <Text className={``}>Mode : {type} </Text>
            <Text className={``}>Status : {status} </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function EndedReservationItem({ reservation, navigateReservation }) {
  const {
    _id: reservationId,
    schedule: { TimeStart, TimeEnd },
    tag: { name },
    type,
  } = reservation;

  const timeStart = getScheduleTime(TimeStart);
  const timeEnd = getScheduleTime(TimeEnd);

  return (
    <TouchableOpacity onPress={() => navigateReservation(reservationId)}>
      <View className={`px-4 w-5/6 py-4 mx-auto my-4 rounded-lg bg-gray-300 shadow-lg`}>
        <View className={`flex-row items-center`}>
          <View className={`flex-1 justify-center items-center`}>
            <Text className={`font-bold text-lg py-2`}>
              <Ionicons name={"time-outline"} size={24} />
              {timeStart} - {timeEnd}
            </Text>
            <Text className={``}>Sport : {name} </Text>
            <Text className={``}>Mode : {type} </Text>
            <Text className={``}>Status : Ended </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function ReservationItem({ reservation, navigateReservation, navigateBook }) {
  const { status } = reservation;

  if (status === "empty") {
    return <EmptyReservationItem reservation={reservation} navigateBook={navigateBook} />;
  }

  if (status === "upcoming") {
    return <UpcomingReservationItem reservation={reservation} navigateReservation={navigateReservation} />;
  }

  if (status === "ended") {
    return <EndedReservationItem reservation={reservation} navigateReservation={navigateReservation} />;
  }

  return <></>;
}
