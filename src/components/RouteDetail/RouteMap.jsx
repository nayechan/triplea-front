import { React, useState, useEffect, useRef, Fragment } from 'react';
import { Map, MapMarker, Polyline } from 'react-kakao-maps-sdk';
import LocationMarker from 'components/MapMarker/LocationMarker';

const getCentralPoint = (points) => {
  if (points.length === 0) {
    return null;
  }

  let minLatitude = points[0].latitude;
  let maxLatitude = points[0].latitude;
  let minLongitude = points[0].longitude;
  let maxLongitude = points[0].longitude;

  points.forEach(point => {
    minLatitude = Math.min(minLatitude, point.latitude);
    maxLatitude = Math.max(maxLatitude, point.latitude);
    minLongitude = Math.min(minLongitude, point.longitude);
    maxLongitude = Math.max(maxLongitude, point.longitude);
  });

  const halfLatitude = (minLatitude + maxLatitude) / 2;
  const halfLongitude = (minLongitude + maxLongitude) / 2;

  return { latitude: halfLatitude, longitude: halfLongitude };
};

const calculateDistance = (point1, point2) => {
  const lat1 = point1.latitude;
  const lon1 = point1.longitude;
  const lat2 = point2.latitude;
  const lon2 = point2.longitude;

  const radius = 6371e3; // in meters
  const phi1 = (lat1 * Math.PI) / 180;
  const phi2 = (lat2 * Math.PI) / 180;
  const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = radius * c;

  return distance;
};

const calculateZoomLevel = (distance, size) => {
  console.log(`map size : ${size}, distance : ${distance}m`);
  let zoomLevel = 3; // Start from level 3

  // Each level halves the distance
  while (distance > size * 0.4) {
    distance /= 2;
    zoomLevel++;
  }

  return zoomLevel;
};

const interpolateColorHSV = (lineIndex, lineCount, startHue, startSaturation, startValue, endHue, endSaturation, endValue) => {
  const hue = startHue + (endHue - startHue) * (lineIndex / lineCount);
  const saturation = startSaturation + (endSaturation - startSaturation) * (lineIndex / lineCount);
  const value = startValue + (endValue - startValue) * (lineIndex / lineCount);

  const chroma = value * saturation;
  const huePrime = hue / 60;
  const x = chroma * (1 - Math.abs((huePrime % 2) - 1));
  let r1, g1, b1;
  if (huePrime >= 0 && huePrime < 1) {
    [r1, g1, b1] = [chroma, x, 0];
  } else if (huePrime >= 1 && huePrime < 2) {
    [r1, g1, b1] = [x, chroma, 0];
  } else if (huePrime >= 2 && huePrime < 3) {
    [r1, g1, b1] = [0, chroma, x];
  } else if (huePrime >= 3 && huePrime < 4) {
    [r1, g1, b1] = [0, x, chroma];
  } else if (huePrime >= 4 && huePrime < 5) {
    [r1, g1, b1] = [x, 0, chroma];
  } else {
    [r1, g1, b1] = [chroma, 0, x];
  }

  const m = value - chroma;
  const [r, g, b] = [r1 + m, g1 + m, b1 + m];

  const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');

  return rgbToHex(r, g, b);
};

const RouteMap = ({
  route,
  openInfoLocationModal,
  draggable = true,
  clickable = true,
  width,
  height,
  size = 1000
}) => {
  const [zoomLevel, setZoomLevel] = useState(3);

  const centralPoint = getCentralPoint(Object.values(route.plannersByDay).flat());
  let maxDistance = 0;

  // Calculate the maximum distance between any two consecutive points
  Object.entries(route.plannersByDay).forEach(([dayIndex, locations]) => {
    locations.forEach((locationData, locationIndex, array) => {
      const nextIndex = (locationIndex + 1) % array.length;
      const nextPlanner = array[nextIndex];
      const distance = calculateDistance(
        { latitude: locationData.latitude, longitude: locationData.longitude },
        { latitude: nextPlanner.latitude, longitude: nextPlanner.longitude }
      );
      if (distance > maxDistance) {
        maxDistance = distance;
      }
    });
  });

  // Calculate the appropriate zoom level based on the maximum distance
  useEffect(() => {
    setZoomLevel(calculateZoomLevel(maxDistance, size));
  }, [size])

  return (
    <Map
      style={{ width: width ? width : '100%', height: height ? height : 'calc(100vh - 64px)' }}
      center={{ lat: centralPoint.latitude, lng: centralPoint.longitude }}
      level={zoomLevel}
      draggable={draggable}
    >
      <LocationMarker
        position={{
          lat: route.residence.latitude,
          lng: route.residence.longitude,
        }}
        number={'H'}
        color={'black'}
      />
      {Object.entries(route.plannersByDay).map(([dayIndex, locations]) =>
        locations.map((locationData, locationIndex, array) => {
          const nextIndex = (locationIndex + 1) % array.length;
          const nextPlanner = array[nextIndex];
          const color = interpolateColorHSV((dayIndex - 1) % 6.5, 6.5, 0, 1, 1, 360, 1, 1);

          const polyLineComponent = (
            <Polyline
              key={`pl-${dayIndex}-${locationIndex}`}
              path={[
                { lat: locationData.latitude, lng: locationData.longitude },
                { lat: nextPlanner.latitude, lng: nextPlanner.longitude },
              ]}
              strokeWeight={2}
              strokeColor={color}
              strokeOpacity={0.7}
              strokeStyle={'solid'}
              endArrow={false}
            />
          );

          const locationMarkerComponent = (
            <LocationMarker
              key={`lm-${dayIndex}-${locationIndex}`}
              position={{
                lat: locationData.latitude,
                lng: locationData.longitude,
              }}
              number={locationIndex + 1}
              color={color}
              onClick={() => {
                if (clickable) {
                  openInfoLocationModal({
                    name: locationData.touristDestinationName,
                    latitude: locationData.latitude,
                    longitude: locationData.longitude,
                  });
                }
              }}
            />
          );

          if (locationIndex !== array.length - 1) {
            return (
              <Fragment key={`${dayIndex}-${locationIndex}`}>
                {polyLineComponent}
                {locationMarkerComponent}
              </Fragment>
            );
          } else {
            return locationMarkerComponent;
          }
        })
      )}
    </Map>
  );
};

export default RouteMap;
