import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

import MapView, { Marker } from "react-native-maps";

const customMapStyle = [
  {
    featureType: "poi",
    elementType: "all",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
];

export const PinpointField = ({ route, navigation }) => {
  const coordinates = route.params?.coordinates;

  const [latitude, setLatitude] = useState(-6.2607187);
  const [longitude, setLongitude] = useState(106.7816162);

  if (coordinates) {
    latitude = coordinates[0];
    latitude = coordinates[1];
  }

  return (
    <>
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          className="w-full"
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          customMapStyle={customMapStyle}
          onRegionChange={(region) => {
            setLatitude(region.latitude);
            setLongitude(region.longitude);
          }}
        >
          <Marker
            coordinate={{
              latitude,
              longitude,
            }}
          />
        </MapView>

        <Text style={{ marginVertical: 10, textAlign: "center" }}>
          Coordinates: {latitude.toFixed(6)},{longitude.toFixed(6)}{" "}
        </Text>

        <TouchableOpacity
          onPress={() => {
            let prevStack;
            if (route.params?.prev === "updateProfile") {
              prevStack = "My Field";
            } else if (route.params?.prev === "createProfile") {
              prevStack = "createField";
            }

            navigation.navigate(prevStack, { coordinates: [latitude.toFixed(6), longitude.toFixed(6)] });
          }}
          style={{ width: "100%", alignItems: "center", padding: 10, backgroundColor: "rgb(27, 117, 208)" }}
        >
          <Text>Select Pinpoint</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
