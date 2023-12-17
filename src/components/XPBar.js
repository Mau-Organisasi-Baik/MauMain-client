import { Text, View } from "react-native";

export const XPBar = ({ currentXP = 0  , totalXP = 1000 }) => {
    const xpPercentage = (currentXP / totalXP) * 100;
    console.log(xpPercentage);
    return (<>
      <View className={`w-5/6 mx-auto px-4 py-2`}>
        <View className={`h-2 bg-gray-200 rounded-full`}>
          <View
            className={
              `h-2 bg-blue-600 rounded-full`
            }
            style={{width : `${xpPercentage}%`}}
          />
        </View>
      </View>
      <View>
        <Text className="text-center">Level : 40</Text>
      </View>
      </>
    );
  };