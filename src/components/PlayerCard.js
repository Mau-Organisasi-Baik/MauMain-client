import { Image, Text, TouchableOpacity } from "react-native";

export const PlayerCard = ({ style, playerName, playerStatus, onPress }) => {
    return (
      <TouchableOpacity onPress={onPress}  className={`flex-row items-center bg-blue-800 p-2 rounded-lg my-1`}>
        <Image style={style} source={require('../assets/Sergeant1.webp')} className={`h-12 w-12 rounded-full mr-2`} />
        <Text className={`flex-1 text-white text-lg`}>{playerName}</Text>
        <Text className={`text-white`}>{playerStatus}</Text>
        <TouchableOpacity className={`ml-2`}>
          <Text className={`text-white text-xl`}>+</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };