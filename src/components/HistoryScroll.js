import { ScrollView, Text, TouchableOpacity, View } from "react-native"
import { HistoryCard } from "./HistoryCard"

export const HistoryScroll = () => {
    return (
        <>
        <View className={`flex-col mt-4 max-w-lg`}>
            <TouchableOpacity className={`mx-2`}>
                <Text className={`text-white text-lg pl-2 rounded-lg bg-blue-500`}>History</Text>
            </TouchableOpacity>
            <ScrollView>
                <HistoryCard/>
                <HistoryCard/>
                <HistoryCard/>
            </ScrollView>
        </View>
        </>
    )
}