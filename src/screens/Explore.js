
import MapView, {Marker} from 'react-native-maps'

const customMapStyle = [
  {
    "featureType": "poi",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
]

export const Explore = () => {
    return (
        <>
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
      <Marker
        coordinate={{
          latitude: -6.2607187,
          longitude: 106.7816162,
        }}
        title={"Ini Tempat Hacktiv"}
        description={"Cuma tes doang bang!"}
      />
    </MapView>
   
        </>
    )
}