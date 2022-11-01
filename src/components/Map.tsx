import React, { useEffect, useRef, useState } from "react";
import { Platform, View } from "react-native";
import MapView, { MAP_TYPES, Marker, UrlTile } from "react-native-maps";
import { useRecoilValue } from "recoil";
import { currentLocationState, activeQuestItemsState } from "../recoil/atom";
import { TILE_URL_TEMPLATE } from "@env";
import MarkerCard from "./MarkerCard";
import { IconButton } from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";
import { faDotCircle as farDotCircle } from "@fortawesome/free-regular-svg-icons";
import { ItemType } from "../client";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export const ITEM_TYPE_ICONS = {
  [ItemType.KEY]: {
    name: "key",
    color: "orange",
  },
  [ItemType.COLLECTIBLE]: {
    name: "gem",
    color: "blue",
  },
  [ItemType.POI]: {
    name: "monument",
    color: "purple",
  },
  [ItemType.VOUCHER]: {
    name: "ticket-alt",
    color: "red",
  },
};

const Map = () => {
  const MIN_ZOOM_LEVEL = 17;
  const MAX_ZOOM_LEVEL = 21;
  const map = useRef<MapView | null>(null);
  const location = useRecoilValue(currentLocationState);
  const [focusUserLocation, setFocusUserLocation] = useState(true);
  const [selectedMarker, setSelectedMarker] = useState<null | {
    id: string;
  }>(null);
  const [animateToCoordinate, setAnimateToCoordinate] = useState(false);
  const questItems = useRecoilValue(activeQuestItemsState);

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

  const getSelectedMarkerItem = () => {
    if (!selectedMarker) return null;
    return questItems?.find((item) => item.id == selectedMarker.id);
  };

  useEffect(() => {
    if (selectedMarker === null || !animateToCoordinate || !map.current) return;
    const marker = getSelectedMarkerItem();
    if (!marker || !marker.location) return;
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
          shouldReplaceMapContent={true}
        />

        {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
          >
            <FontAwesomeIcon icon={farDotCircle} size={24} color="#1E88E5" />
          </Marker>
        )}

        {questItems?.map(
          (item) =>
            item.location && (
              <Marker
                key={`item:${item.id}`}
                coordinate={{
                  latitude: item.location[0],
                  longitude: item.location[1],
                }}
                onPress={() => {
                  setSelectedMarker({
                    id: item.id,
                  });
                  setAnimateToCoordinate(true);
                }}
              >
                <FontAwesome5
                  {...ITEM_TYPE_ICONS[item.item.item_type]}
                  size={selectedMarker?.id == item.id ? 50 : 30}
                />
              </Marker>
            )
        )}
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
          title={getSelectedMarkerItem()?.item.title}
          description={getSelectedMarkerItem()?.item.description}
          resetSelectedMarker={() => setSelectedMarker(null)}
        />
      ) : null}
    </View>
  );
};

export default Map;
