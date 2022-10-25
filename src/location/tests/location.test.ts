import { distance } from "../location";
import { LocationObjectCoords } from "expo-location";

describe("Tests that distance is calculated correctly for different locations.", () => {
  it("Check that distance between Digs and NTNU Hovedbyging is approximately 1342m.", () => {
    const digs: LocationObjectCoords = {
      latitude: 63.43134713935571,
      longitude: 10.400647548060293,
      accuracy: null,
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
      speed: null,
    };

    const NTNU_Hovedbygning: LocationObjectCoords = {
      latitude: 63.419296198137424,
      longitude: 10.402193760856612,
      accuracy: null,
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
      speed: null,
    };
    const dist = distance(digs, NTNU_Hovedbygning);
    expect(dist).toBeCloseTo(1342.209);
  });

  it("Check that distance between two identical coordinates is zero.", () => {
    const location1: LocationObjectCoords = {
      latitude: -63.43134713935571,
      longitude: 10.400647548060293,
      accuracy: null,
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
      speed: null,
    };

    const location2: LocationObjectCoords = {
      latitude: -63.43134713935571,
      longitude: 10.400647548060293,
      accuracy: null,
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
      speed: null,
    };
    const dist = distance(location1, location2);
    expect(dist).toBe(0);
  });

  it("Check that the distance from two almost identical coordinates is close to zero", () => {
    const location1: LocationObjectCoords = {
      latitude: 63.43134713935571,
      longitude: 10.400647548060293,
      accuracy: null,
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
      speed: null,
    };

    const location2: LocationObjectCoords = {
      latitude: 63.43134713935579,
      longitude: 10.400647548060299,
      accuracy: null,
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
      speed: null,
    };
    const dist = distance(location1, location2);
    expect(dist).toBeCloseTo(0, 5);
  });

  it("Check that invalid lat value is handled correctly", () => {
    const location1: LocationObjectCoords = {
      latitude: 91, // Invalid value
      longitude: 180,
      accuracy: null,
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
      speed: null,
    };

    const location2: LocationObjectCoords = {
      latitude: 90,
      longitude: 180,
      accuracy: null,
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
      speed: null,
    };
    const dist = distance(location1, location2);
    expect(dist).toBe(NaN);
  });

  it("Check that invalid long value is handled correctly", () => {
    const location1: LocationObjectCoords = {
      latitude: 90,
      longitude: 180,
      accuracy: null,
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
      speed: null,
    };

    const location2: LocationObjectCoords = {
      latitude: 63,
      longitude: -181, // Invaid value
      accuracy: null,
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
      speed: null,
    };
    const dist = distance(location1, location2);
    expect(dist).toBe(NaN);
  });
});
