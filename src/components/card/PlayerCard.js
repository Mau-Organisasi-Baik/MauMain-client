import { Image, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { BASE_URL } from "../../helpers/BASE_URL";
import { Toast } from "toastify-react-native";
import { useContext } from "react";
import { LoginContext } from "../../context/AuthContext";

export const PlayerCard = ({ gameStatus, style, fieldId, setPlayers, player, onPress, admin }) => {
  const { userInfo } = useContext(LoginContext);
  const token = userInfo.access_token;

  const kickUser = async (selectedPlayerId) => {
    try {
      if (gameStatus === "ended") return Toast.error("Game already ended!");

      await axios.put(
        `${BASE_URL}/admin/reservations/${fieldId}/kick`,
        { selectedPlayerId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Toast.success(`${player.name} kicked!`);
      setPlayers((currentPlayer) => currentPlayer.filter((cp) => cp._id !== selectedPlayerId));
    } catch (error) {
      Toast.error(error.response?.data.message);
    }
  };

  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={onPress} className={`flex-row items-center bg-blue-800 p-2 rounded-lg my-1`}>
      <Image style={style} source={{ uri: player.profilePictureUrl }} className={`h-12 w-12 rounded-full mr-2`} />
      <Text className={`flex-1 text-white text-lg`}>{player.name}</Text>
      {!admin && (
        <Text onPress={() => navigation.navigate("Chat")} className={`text-white`}>
          Chat
        </Text>
      )}
      {admin && (
        <TouchableOpacity onPress={() => kickUser(player._id)} className={`ml-2`}>
          <Text className={`text-white text-xl`}>Kick</Text>
        </TouchableOpacity>
      )}
      {!admin && (
        <TouchableOpacity className={`ml-2`}>
          <Text className={`text-white text-xl`}>+</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export const PlayerNormalCard = ({ player }) => {
  const { userInfo } = useContext(LoginContext);
  const token = userInfo.access_token;
  const addFriend = async (targetPlayerId) => {
    try {
      await axios.post(
        `${BASE_URL}/friends`,
        { targetPlayerId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Toast.success("Friend Request Sent!");
    } catch (error) {
      Toast.error(error.response?.data.message);
    }
  };

  const { name, exp, _id, profilePictureUrl } = player;

  const navigation = useNavigation();

  const isHimself = _id === userInfo.playerId;

  return (
    <TouchableOpacity
      onPress={() => {
        // todo other profile
        navigation.navigate("PlayerProfile", { id: _id })
      }}
      className={`flex-row items-center bg-blue-800 p-2 rounded-lg my-1`}
    >
      <Image source={{ uri: profilePictureUrl }} className={`h-12 w-12 rounded-full mr-2`} />
      <View className={"flex"}>
        <Text className={`flex-1 text-white text-lg`}>{name}</Text>
        <Text className={`flex-1 text-white text-sm`}>Level: {Math.floor(exp / 1000)}</Text>
      </View>

      {!isHimself && (
        <View className="flex-1 flex-row-reverse">
          <Text
            onPress={() => {
              // todo: add friend
              addFriend(player._id);
            }}
            className={`text-white mx-1 bg-slate-300 p-2 rounded-md`}
          >
            Add Friend +
          </Text>
          <Text
            // todo: chat
            onPress={() => {
              navigation.navigate("Chat", { playerId: player._id });
            }}
            className={`text-white mx-1 bg-slate-300 p-2 rounded-md`}
          >
            Chat
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
