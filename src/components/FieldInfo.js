import { Switch, Image, Text, TouchableOpacity, View } from "react-native"
import {useState} from 'react'
export const FieldInfo = ({admin}) => {
    const [repeat, setRepeat] = useState(false)
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
                    <Text className="text-lg text-black font-bold">Lapangan Pomad, Pancoran</Text>
                    <Text className="px-1 bg-green-300 text-center rounded-lg">15:00 - 16:00</Text>
                </View>
                <View className="pl-4 py-2">
                    <Text className="text-black">Playing : Football</Text>
                </View>
                {admin && <View className="flex items-center"> 
                <Text>Paid</Text>               
                <Switch
                value={repeat}
                onValueChange={setRepeat}
                />
                </View>
                }
            </View>
        </View>
        </>
    )
}