import React from "react";
import { useEffect } from "react";
import { Platform } from "react-native";
import MapView, { MAP_TYPES, UrlTile } from "react-native-maps";
import {
  watchPositionAsync,
  Accuracy,
  LocationObject,
  LocationObjectCoords,
} from "expo-location";
import { distance } from "../location/locationUtils";

// @ts-ignore
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

const onPositionChange = (new_location: LocationObject) => {
  console.log(distance(DIGS, new_location.coords));
};

const Map = () => {
  const MIN_ZOOM_LEVEL = 17;
  const MAX_ZOOM_LEVEL = 21;

  useEffect(() => {
    watchPositionAsync(
      { accuracy: Accuracy.Highest, distanceInterval: 2 }, //TODO: Check out best locationOptions: https://docs.expo.dev/versions/latest/sdk/location/#locationoptions
      onPositionChange
    );
  }, []);

  return (
    <MapView
      mapType={Platform.select({ android: MAP_TYPES.NONE })}
      style={{ width: "100%", height: "100%" }}
      initialRegion={{
        latitude: 63.43141145560202,
        longitude: 10.40077912763459,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
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
