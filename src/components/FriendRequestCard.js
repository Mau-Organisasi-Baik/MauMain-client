import { View, Text, Image, TouchableOpacity} from 'react-native';
export const FriendRequestCard = () => {
    return (
        <>
        <View className={`px-4 w-5/6 mx-auto mt-8 rounded-lg bg-white shadow-lg`}>
            <View className={`flex-row items-center`}>
                <Image className={`h-32 w-32 rounded-lg mr-4`} source={require('../assets/MAUMAIN.png')} />
                <View className={`flex-1 justify-center`}>
                    <Text className={``}>AkunBaik123 mengirim permintaan pertemanan 
                    </Text>
                    <View className="flex-row gap-2 my-1">
                        <TouchableOpacity className="bg-red-300 rounded-full px-2 py-1">
                            <Text className="text-white">Reject</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="bg-blue-300 rounded-full px-2 py-1">
                            <Text className="text-white">Accept</Text>
                        </TouchableOpacity>
                    </View>
            </View>
            </View>
        </View>
        </>
    )
}