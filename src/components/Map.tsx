import React, { useEffect, useRef, useState } from "react";
import { Platform, View } from "react-native";
import MapView, { MAP_TYPES, Marker, UrlTile } from "react-native-maps";
import { useRecoilState, useRecoilValue } from "recoil";
import { LocationObject } from "expo-location";
import { locationSetup } from "../location/location";
import {
  currentEventState,
  currentLocation,
  userQuestsState,
} from "../recoil/atom";
import { useQuery } from "react-query";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import { TILE_URL_TEMPLATE } from "@env";
import MarkerCard from "./MarkerCard";
import { QuestItem } from "../client";
import { IconButton } from "react-native-paper";
import { locationUnlock } from "../location/locationUnlock";
import { currentUser } from "../recoil/atom";
import { getQuestItems, getUserEventActiveQuests } from "../api/quests";

enum MarkerType {
  POI = "POI",
  ITEM = "ITEM",
}

const Map = () => {
  const MIN_ZOOM_LEVEL = 17;
  const MAX_ZOOM_LEVEL = 21;
  const map = useRef<MapView | null>(null);
  const [location, setLocation] = useRecoilState(currentLocation);
  const [focusUserLocation, setFocusUserLocation] = useState(true);
  const [selectedMarker, setSelectedMarker] = useState<null | {
    id: string;
    markerType: MarkerType;
  }>(null);
  const [animateToCoordinate, setAnimateToCoordinate] = useState(false);
  const user = useRecoilValue(currentUser);
  const [userQuests, setUserQuests] = useRecoilState(userQuestsState);
  const currentEvent = useRecoilValue(currentEventState);

  const { data: questItems } = useQuery<QuestItem[], Error>(
    ["questItems", userQuests],
    async () => {
      if (userQuests == null) {
        return [];
      }
      return (
        await Promise.all(userQuests.map((q) => getQuestItems(q.quest.id)))
      ).flat();
    }
  );

  const onPositionChange = (newLocation: LocationObject) => {
    setLocation(newLocation);
    if (user && currentEvent) {
      locationUnlock(newLocation, user.id, currentEvent.id).then(
        (someUnlocked) => {
          if (someUnlocked && currentEvent) {
            getUserEventActiveQuests(user.id, currentEvent.id).then(
              setUserQuests
            );
          }
        }
      );
    }
  };

  useEffect(() => {
    // Caution! Remember that all state from recoil will be frozen upon listener setup
    // That is we we have 'currentEvent' in the dependency list
    // TODO: Remove subscribers when new ones are added, or just don't do it this way...
    locationSetup(onPositionChange);
  }, [currentEvent]);

  useEffect(() => {
    if (focusUserLocation && location) {
      map.current?.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0,
        longitudeDelta: 0,
      });
    }
  }, [focusUserLocation, location]);

  const getSelectedMarker = () => {
    if (!selectedMarker) return null;
    return selectedMarker.markerType == MarkerType.POI
      ? null
      : questItems?.find((item) => item.id == selectedMarker.id);
  };

  useEffect(() => {
    if (selectedMarker === null || !animateToCoordinate || !map.current) return;
    const marker = getSelectedMarker();
    if (!marker) return;
    map?.current?.animateToRegion(
      {
        latitude: marker.location[0],
        longitude: marker.location[1],
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
        onPanDrag={() => setFocusUserLocation(false)}
        maxZoomLevel={MAX_ZOOM_LEVEL}
        minZoomLevel={MIN_ZOOM_LEVEL}
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

        {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
          >
            <FontAwesome5 name="dot-circle" size={24} color="#1E88E5" />
          </Marker>
        )}

        {questItems?.map((item) => (
          <Marker
            key={`item:${item.id}`}
            coordinate={{
              latitude: item.location[0],
              longitude: item.location[1],
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
                selectedMarker?.markerType == MarkerType.ITEM
                  ? 50
                  : 30
              }
              color="hotpink"
            />
          </Marker>
        ))}
      </MapView>
      <IconButton
        style={{
          position: "absolute",
          right: 10,
          top: 10,
          backgroundColor: "#fff",
          borderRadius: 6,
        }}
        size={26}
        color={focusUserLocation ? "#1E88E5" : "#666"}
        icon={focusUserLocation ? "crosshairs-gps" : "crosshairs"}
        onPress={() => setFocusUserLocation((prev) => !prev)}
      />
      {selectedMarker != null ? (
        <MarkerCard
          title={getSelectedMarker()?.item.title}
          description={getSelectedMarker()?.item.description}
          resetSelectedMarker={() => setSelectedMarker(null)}
        />
      ) : null}
    </View>
  );
};

export default Map;
