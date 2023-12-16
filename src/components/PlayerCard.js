import { Image, Text, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
export const PlayerCard = ({ style, playerName, playerStatus, onPress, admin }) => {
    const navigation = useNavigation()
    return (
      <TouchableOpacity onPress={onPress}  className={`flex-row items-center bg-blue-800 p-2 rounded-lg my-1`}>
        <Image style={style} source={require('../assets/Sergeant1.webp')} className={`h-12 w-12 rounded-full mr-2`} />
        <Text className={`flex-1 text-white text-lg`}>{playerName}</Text>
        {!admin && <Text onPress={()=> navigation.navigate('Chat')} className={`text-white`}>Chat</Text>}
        <TouchableOpacity className={`ml-2`}>
          <Text className={`text-white text-xl`}>{admin ? 'Kick' : "+"}</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };