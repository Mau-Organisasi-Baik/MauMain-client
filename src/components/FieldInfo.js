import { Image, Text, TouchableOpacity, View } from "react-native"

import { GetUtcHours } from "../helpers/GetUtcHours"
export const FieldInfo = ({admin, detailField}) => {
    const backgroundColor = detailField.status === 'upcoming' ? 'bg-blue-400' : 'bg-red-400'
    return (
        <>
        <View className="bg-white border border-black rounded-lg my-4 w-full">
            <View>
                {!admin &&<View className="flex-row items-center self-end">
                    <Text>Invite Friend</Text>
                    <TouchableOpacity className="px-3 py-1 rounded-full m-2 bg-blue-500">
                            <Text className="text-white text-center text-xl">+</Text>
                    </TouchableOpacity>
                </View>}
                {admin && <View className="my-4"/>}
                <Image className="mx-auto rounded-xl w-5/6 h-36 object-cover" source={require('../assets/lapangan.jpg')} />
                <View className="flex-row justify-between items-center p-4">
                    <Text className="text-lg text-black font-bold">{detailField._id}</Text>
                    <Text className="px-1 bg-green-300 text-center rounded-lg">{`${detailField.schedule && GetUtcHours(detailField.schedule.TimeStart)} : ${detailField.schedule && GetUtcHours(detailField.schedule.TimeEnd)}` }</Text>
                </View>
                <View className="pl-4 py-2">
                    <Text className="text-black">Playing : {detailField?.tag?.name}</Text>
                </View>
                <View className="flex items-center"> 
                    <Text className={`${backgroundColor} text-white rounded-md w-5/6 text-center my-2`}>{detailField?.status}</Text>
                </View>
            </View>
        </View>
        </>
    )
}