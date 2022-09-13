import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import * as Location from 'expo-location';

type PositionData = {
  timestamp: number;
  position : {
    latitude: number;
    longitude: number;
  };
}


export default function LocationExample() {
  const [position, setPosition] = useState<PositionData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let position: PositionData = {
        timestamp: location.timestamp,
        position: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        }
      }; 
      setPosition(position);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (position) {
    text = `Timestamp: ${position.timestamp}, Position: ${position.position.latitude}, ${position.position.longitude} `;
  }

  return (
    <View>
      <Text>{text}</Text>
    </View>
  );
}