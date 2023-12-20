import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { HistoryCard } from "./card/HistoryCard";

export const HistoryScroll = ({ histories }) => {
  if (histories.length === 0) return <></>;

  return (
    <>
      <View className={`mt-4 max-w-lg`}>
        <TouchableOpacity className={`mx-2`}>
          <Text className={`text-white text-lg pl-2 rounded-lg bg-blue-500`}>History</Text>
        </TouchableOpacity>
        <ScrollView>
          {histories.map((history) => (
            <HistoryCard />
          ))}
          {/* <HistoryCard/> */}
          {/* <HistoryCard/> */}
        </ScrollView>
      </View>
    </>
  );
};
