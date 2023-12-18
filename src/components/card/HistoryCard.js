import { Image, Text, View } from 'react-native'

export const HistoryCard = () => {
    return (
        <>
        <View className={`px-4 w-full mx-auto my-4 rounded-lg bg-white shadow-lg`}>
        <View className={`flex-row items-center`}>
          <Image className={`h-32 w-32 rounded-lg mr-4`} source={require('../../assets/football.jpg')} />
          <View className={`flex-1 justify-center`}>
            <Text className={`font-bold text-lg`}>Lapangan POMAD, Pancoran</Text>
            <Text className={``}>25 Dec 2021, 17:40</Text>
            <Text className={`bg-red-300 w-14 my-2 text-center`}>Win</Text>
          </View>
        </View>
      </View>
        </>
    )
}