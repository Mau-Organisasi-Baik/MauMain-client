
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Card = ({invitation}) => {
  const navigation = useNavigation()
    return (
      <TouchableOpacity onPress={() => navigation.navigate('Reservation Room', {reservationId : invitation.reservationId})}>
      <View className={`px-4 py-2 w-5/6 mx-auto mt-8 rounded-lg bg-white shadow-lg`}>
        <View className={`flex-row items-center`}>
          <Image className={`h-28 w-28 rounded-lg mr-4`} source={require('../../assets/MAUMAIN.png')} />
          <View className={`flex-1 justify-center`}>
            <Text className={`text-lg`}>{`${invitation.inviter.name} telah mengundangmu`}
            </Text>
            <Text className="text-blue-400">Click to your friend's field {">>>"}</Text>
          </View>
        </View>
      </View>
      </TouchableOpacity>
    );
  };
  
export default Card;
