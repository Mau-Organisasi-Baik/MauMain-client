import MapView, { Marker } from "react-native-maps";
import { useContext, useEffect, useState } from "react";
import BottomDrawer from "../../components/modal/ModalSwipeUp";
import { access_token } from "../../helpers/AccessToken";
import axios from "axios";

import * as Location from "expo-location";
import CategoryFilter from "../../components/CategoryFilter";
import { LoginContext } from "../../context/AuthContext";
import { Toast } from "toastify-react-native";

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

function FieldMarker({ field, handler, mapviewRef }) {
  const { coordinates, name, address } = field;

  return (
    <Marker
      onPress={() => {
        handler();
      }}
      coordinate={{
        latitude: coordinates[0],
        longitude: coordinates[1],
      }}
      title={name}
      description={address}
    />
  );
}

export const Explore = () => {
  const { userInfo } = useContext(LoginContext);

  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [location, setLocation] = useState(null);
  const [fields, setFields] = useState([]);
  const [selectedFieldId, setSelectedFieldId] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);

  function changeTag(newTag) {
    if (newTag.name === "All") {
      return setSelectedTag(null);
    }
    setSelectedTag(newTag);
  }

  async function fetchFields() {
    try {
      let {
        coords: { longitude, latitude },
      } = location;

      latitude = -6.2607187;
      longitude = 106.7816162;

      const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

      let url = `${BASE_URL}/fields/explore?longitude=${longitude}&latitude=${latitude}`;

      if (selectedTag) {
        url += `&tagId=${selectedTag._id}`;
      }

      const token = userInfo.access_token;

      const {
        data: { data },
      } = await axios.get(url, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const fieldsResult = data.fields;
      setFields(fieldsResult);
    } catch (error) {
      Toast.error(error.response?.data.message);
    }
  }

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      } else {
        let newLocation = await Location.getCurrentPositionAsync({});
        console.log(newLocation, "new LOCATION");
        setLocation(newLocation);
      }
    })();
  }, []);

  useEffect(() => {
    if (location) {
      fetchFields();
    }
  }, [location, selectedTag]);

  if (!location) {
    latitude = -6.2607187;
    longitude = 106.7816162;

    setLocation({ coords: { longitude, latitude } });
  }

  return (
    <>
      <CategoryFilter selectedTag={selectedTag} changeTag={changeTag} />
      <MapView
        style={{ flex: 1 }}
        className="w-full"
        initialRegion={{
          latitude: -6.2607187,
          longitude: 106.7816162,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        customMapStyle={customMapStyle}
      >
        {fields.map((field, idx) => {
          return (
            <FieldMarker
              key={idx}
              field={field}
              handler={() => {
                setIsDrawerVisible(false);

                setSelectedFieldId(field._id);
                setIsDrawerVisible(true);
              }}
            />
          );
        })}
      </MapView>
      {isDrawerVisible && <BottomDrawer isDrawerOpen={isDrawerVisible} setIsDrawerOpen={setIsDrawerVisible} fieldId={selectedFieldId} />}
    </>
  );
};
