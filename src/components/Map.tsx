import React from "react";
import { Platform } from "react-native";
import MapView, { MAP_TYPES, UrlTile } from "react-native-maps";

// @ts-ignore
import { TILE_URL_TEMPLATE } from "@env";
import { useQuery } from "react-query";
import fetchItems from "../api/fetch-items";

const Map = () => {
  const { data, isLoading, error } = useQuery("items", fetchItems);
  console.log(data);

  const MIN_ZOOM_LEVEL = 17;
  const MAX_ZOOM_LEVEL = 21;

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
      followsUserLocation={true}
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
