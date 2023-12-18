import { Image, Text, TouchableOpacity, View } from "react-native"
import LinearGradient from "react-native-linear-gradient"


export const GetStarted = () => {
    return (
        <> 
        <View className="flex-1 bg-blue-500 justify-between p-4">
        <LinearGradient
        colors={['#003366', '#66CCFF']}
        style={{ flex: 1, justifyContent: 'space-between', padding: 16 }}
      >
      <View className="items-center flex-1">
        <Text className="text-white text-2xl font-bold">MauMain</Text>
        <View className="my-4 p-4">
        {/* <Image className="mx-auto w-full object-cover" source={require('./assets/Tug-of-war.png')} /> */}
        </View>
      </View>
      <View className="px-4 flex-1">
        <Text className="text-white text-center mb-4">
          Kick-start your active life with MauMain – where athletes unite and playfields come alive. Find your team, book a spot, and elevate your game in a community that celebrates sports. Jump into the action now!
        </Text>
        <TouchableOpacity className="border border-white py-2 rounded-full">
          <Text className="text-white text-center font-semibold">GET STARTED</Text>
        </TouchableOpacity>
      </View>
      </LinearGradient>
    </View>
        </>
    )
}