import React, { useEffect, useRef, useState } from "react";
import { Platform, View } from "react-native";
import MapView, { MAP_TYPES, Marker, UrlTile } from "react-native-maps";
import { useRecoilState } from "recoil";
import { LocationObject, LocationObjectCoords } from "expo-location";
import { distance, locationSetup } from "../location/location";
import { currentLocation } from "../recoil/atom";
import { useQuery } from "react-query";
import { AntDesign } from "@expo/vector-icons";
import { TILE_URL_TEMPLATE } from "@env";
import MarkerCard from "./MarkerCard";
import { Item, POI } from "../client";
import fetchItems from "../api/fetch-items";
import fetchPois from "../api/fetch-pois";

enum MarkerType {
  POI = "POI",
  ITEM = "ITEM",
}

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
  const [selectedMarker, setSelectedMarker] = useState<null | {
    id: number;
    markerType: MarkerType;
  }>(null);
  const [animateToCoordinate, setAnimateToCoordinate] = useState(false);
  const map = useRef<MapView | null>(null);

  //TODO: Add error handling from api-fetches and maybe loading indication
  const { data: items } = useQuery<Item[], Error>("items", fetchItems);

  const { data: pois } = useQuery<POI[], Error>("pois", fetchPois);

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

  const getSelectedMarker = () => {
    if (!selectedMarker) return null;
    return selectedMarker.markerType == MarkerType.POI
      ? pois?.find((poi) => poi.id == selectedMarker.id)
      : items?.find((item) => item.id == selectedMarker.id);
  };

  useEffect(() => {
    if (selectedMarker === null || !animateToCoordinate || !map.current) return;
    const marker = getSelectedMarker();
    if (!marker) return;
    map?.current?.animateToRegion(
      {
        latitude: marker.position[0],
        longitude: marker.position[1],
        latitudeDelta: 0,
        longitudeDelta: 0,
      },
      350
    );
    setAnimateToCoordinate(false);
  }, [selectedMarker, animateToCoordinate]);

  return (
    <View>
      <MapView
        ref={map}
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

        {pois?.map((poi) => {
          return (
            <Marker
              key={`poi:${poi.id}`}
              coordinate={{
                latitude: poi.position[0],
                longitude: poi.position[1],
              }}
              onPress={() => {
                setSelectedMarker({ id: poi.id, markerType: MarkerType.POI });
                setAnimateToCoordinate(true);
              }}
            >
              <AntDesign
                name="question"
                size={
                  selectedMarker?.id == poi.id &&
                  selectedMarker.markerType == MarkerType.POI
                    ? 50
                    : 30
                }
                color="blue"
              />
            </Marker>
          );
        })}
        {items?.map((item) => (
          <Marker
            key={`item:${item.id}`}
            coordinate={{
              latitude: item.position[0],
              longitude: item.position[1],
            }}
            onPress={() => {
              setSelectedMarker({ id: item.id, markerType: MarkerType.ITEM });
              setAnimateToCoordinate(true);
            }}
          >
            <AntDesign
              name="star"
              size={
                selectedMarker?.id == item.id &&
                selectedMarker.markerType == MarkerType.ITEM
                  ? 50
                  : 30
              }
              color="hotpink"
            />
          </Marker>
        ))}
      </MapView>
      {selectedMarker != null ? (
        <MarkerCard
          title={getSelectedMarker()?.title}
          description={getSelectedMarker()?.description}
          resetSelectedMarker={() => setSelectedMarker(null)}
        />
      ) : null}
    </View>
  );
};

export default Map;
