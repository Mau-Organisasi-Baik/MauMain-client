import { Image, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { BASE_URL } from "../../helpers/BASE_URL";
import { access_token } from "../../helpers/AccessToken";
import { Toast } from "toastify-react-native";
import { Image, Text, TouchableOpacity, View } from "react-native";

export const PlayerCard = ({ gameStatus, style, fieldId, setPlayers, player, onPress, admin }) => {
  const kickUser = async (selectedPlayerId) => {
    try {
      const token = await access_token();
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
      Toast.error(error.message);
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
  const { name, exp } = player;
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        // todo other profile
      }}
      className={`flex-row items-center bg-blue-800 p-2 rounded-lg my-1`}
    >
      <Image source={require("../../assets/Sergeant1.webp")} className={`h-12 w-12 rounded-full mr-2`} />
      <View className={"flex"}>
        <Text className={`flex-1 text-white text-lg`}>{name}</Text>
        <Text className={`flex-1 text-white text-sm`}>Level: {Math.floor(exp / 1000)}</Text>
      </View>

      <View className="flex-1 flex-row-reverse">
        <Text
          onPress={() => {
            // todo: add friend
          }}
          className={`text-white mx-1 bg-slate-300 p-2 rounded-md`}
        >
          Add Friend +
        </Text>
        <Text
          // todo: chat
          onPress={() => {}}
          className={`text-white mx-1 bg-slate-300 p-2 rounded-md`}
        >
          Chat
        </Text>
      </View>
    </TouchableOpacity>
  );
};
