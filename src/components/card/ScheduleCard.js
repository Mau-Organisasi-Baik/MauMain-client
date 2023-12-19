import { Text, View } from "react-native"
import { GetUtcHours } from "../../helpers/GetUtcHours"

export const ScheduleCard = ({schedule}) => {
    return (
        <>
        
        <View className="mb-4 p-4 rounded-lg justify-between flex-row bg-blue-100">
            
          <Text className="text-lg">{GetUtcHours(schedule.TimeStart)} - {GetUtcHours(schedule.TimeEnd)}</Text>
          <Text className="text-lg text-blue-800 border border-blue-500 rounded-lg px-2">x</Text>
        </View>
        </>
    )
}