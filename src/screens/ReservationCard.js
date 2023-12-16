import { Ionicons } from '@expo/vector-icons'
import { Text, TouchableOpacity, View } from 'react-native'

export const ReservationCard = ({navigation}) => {
    return (
        <>
    <TouchableOpacity onPress={()=> navigation.navigate('Reservation Room')}>
        <View  className={`px-4 w-5/6 py-4 mx-auto my-4 rounded-lg bg-green-300 shadow-lg`}>
            <View className={`flex-row items-center`}>
                <View className={`flex-1 justify-center items-center`}>
                
                  <Text className={`font-bold text-lg py-2`}>
                    <Ionicons name={'time-outline'} size={24}/>15:00 - 16:00
                  </Text>
                  <Text className={``}>Sport : - </Text>
                  <Text className={``}>Mode : - </Text>
                  <Text className={``}>Status : Available </Text>
                  
                </View>
            </View>
        </View>
    </TouchableOpacity>
    <View className={`px-4 w-5/6 py-4 mx-auto my-4 rounded-lg bg-gray-300 shadow-lg`}>
        <View className={`flex-row items-center`}>
          <View className={`flex-1 justify-center items-center`}>
          
            <Text className={`font-bold text-lg py-2`}>
              <Ionicons name={'time-outline'} size={24}/>16:00 - 17:00
            </Text>
            <Text className={``}>Sport : Football </Text>
            <Text className={``}>Mode : Competitive </Text>
            <Text className={``}>Status : Booked </Text>
          </View>
        </View>
    </View>
    <View className={`px-4 w-5/6 py-4 mx-auto my-4 rounded-lg bg-gray-300 shadow-lg`}>
        <View className={`flex-row items-center`}>
          <View className={`flex-1 justify-center items-center`}>
          
            <Text className={`font-bold text-lg py-2`}>
              <Ionicons name={'time-outline'} size={24}/>17:00 - 18:00
            </Text>
            <Text className={``}>Sport : Basketball </Text>
            <Text className={``}>Mode : Casual </Text>
            <Text className={``}>Status : Booked </Text>
            
          </View>
        </View>
    </View>
        </>
    )
}