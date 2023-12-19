import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getScheduleTime } from '../../helpers/ScheduleTime';

export const AdminReservationCard = ({reservation}) => {
    const navigation = useNavigation()
    console.log(reservation._id);
    return (
        <>
    <View className="mx-4 my-2 p-4 bg-white rounded-lg shadow">
        <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold">{reservation?._id}</Text>
            <Text className="text-sm bg-blue-100 text-blue-800 py-1 px-3 rounded-full">{reservation?.tag?.name}</Text>
        </View>
        <View className="flex-row justify-between items-center">
            <Text className="text-gray-600">{reservation.date}, {getScheduleTime(reservation.schedule.TimeStart)} - {getScheduleTime(reservation.schedule.TimeEnd)}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AdminDetailReservation', {id : reservation._id})} className="bg-blue-500 py-2 px-4 rounded-full">
            <Text className="text-white font-bold">Details</Text>
            </TouchableOpacity>
        </View>
        <View className="flex-row">
        <Text className={reservation.status === 'ended' ? "bg-red-500 rounded-lg px-2 text-white" : "bg-green-500 rounded-lg px-2 text-white"}>{reservation?.status}</Text>
        </View>
        <View className="flex-row mt-4">
            {reservation.players ? 
            reservation.players.map(val => {
                return(
                    <>
                    <ScrollView className="">
                        <Image 
                        className='w-12 h-12 rounded-lg'
                        source={{uri : val.profilePictureUrl}}/>
                        <Text>{val.name ? val?.name : "There's no name"}</Text>
                    </ScrollView>
            
                    </>
                ) 
                
            }) : <Text>Theres no reservation!</Text> }
        </View>
        
    </View>
        </>
    )
}