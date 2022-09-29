import React from "react";
import { useEffect } from "react";
import { Platform } from "react-native";
import MapView, { MAP_TYPES, UrlTile } from "react-native-maps";
import { useRecoilState } from "recoil";
import { LocationObject, LocationObjectCoords } from "expo-location";
import { distance, locationSetup } from "../location/location";
import { currentLocation } from "../recoil/atom";
import { TILE_URL_TEMPLATE } from "@env";

const DIGS: LocationObjectCoords = {
  latitude: 63.43133846620186,
  longitude: 10.400746365666315,
  altitude: null,
  accuracy: null,
  altitudeAccuracy: null,
  heading: null,
  speed: null,
};

const Map = () => {
  const MIN_ZOOM_LEVEL = 17;
  const MAX_ZOOM_LEVEL = 21;
  const [location, setLocation] = useRecoilState(currentLocation); // eslint-disable-line @typescript-eslint/no-unused-vars

  const onPositionChange = (new_location: LocationObject) => {
    setLocation(new_location);
    console.log(`Distance to Digs: ${distance(DIGS, new_location.coords)} m`);
  };

  useEffect(() => {
    locationSetup(onPositionChange);
  }, []);

  return (
    <MapView
      mapType={Platform.select({ android: MAP_TYPES.NONE })}
      style={{ width: "100%", height: "100%" }}
      initialRegion={{
        latitude: 63.431443926635886,
        longitude: 10.400979180092996,
        latitudeDelta: 0.0008,
        longitudeDelta: 0.0008,
      }}
      maxZoomLevel={MAX_ZOOM_LEVEL}
      minZoomLevel={MIN_ZOOM_LEVEL}
      showsUserLocation={true}
      followsUserLocation={false}
    >
      <UrlTile
        /**
         * The url template of the tile server. The patterns {x} {y} {z} will be replaced at runtime
         * For example, http://c.tile.openstreetmap.org/{z}/{x}/{y}.png
         */
        urlTemplate={TILE_URL_TEMPLATE}
        doubleTileSize
        tileSize={512}
        maximumZ={MAX_ZOOM_LEVEL}
        maximumNativeZ={MAX_ZOOM_LEVEL}
      />
    </MapView>
  );
};

export default Map;
