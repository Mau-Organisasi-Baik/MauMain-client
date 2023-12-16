import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const AdminReservationCard = () => {
    const navigation = useNavigation()
    return (
        <>
    <View className="mx-4 my-2 p-4 bg-white rounded-lg shadow">
        <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold">Basketball</Text>
            <Text className="text-sm bg-blue-100 text-blue-800 py-1 px-3 rounded-full">Casual</Text>
        </View>
        <View className="flex-row justify-between items-center">
            <Text className="text-gray-600">10 Des 2023, 14:00 - 16:00</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AdminDetailReservation')} className="bg-blue-500 py-2 px-4 rounded-full">
            <Text className="text-white font-bold">Details</Text>
            </TouchableOpacity>
        </View>
    </View>
        </>
    )
}