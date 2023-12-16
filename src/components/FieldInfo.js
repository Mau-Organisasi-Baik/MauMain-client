import { Button, Image, Text, TouchableOpacity, View } from "react-native"

export const FieldInfo = () => {
    return (
        <>
        <View className="bg-white border shadow border-black rounded-lg my-4 w-full">
            <View>
                <View className="flex-row items-center self-end">
                    <Text>Invite Friend</Text>
                    <TouchableOpacity className="px-3 py-1 rounded-full m-2 bg-blue-500">
                            <Text className="text-white text-center text-xl">+</Text>
                    </TouchableOpacity>
                </View>
                <Image className="mx-auto shadow-xl rounded-xl w-5/6 h-36 object-cover" source={require('../assets/lapangan.jpg')} />
                <View className="flex-row justify-between items-center p-4">
                    <Text className="text-lg text-black font-bold">Lapangan Pomad, Pancoran</Text>
                    <Text className="px-1 bg-green-300 text-center rounded-lg">15:00 - 16:00</Text>
                </View>
                <View className="pl-4 py-2">
                    <Text className="text-black">Playing : Football</Text>
                </View>

            </View>
        </View>
        </>
    )
}