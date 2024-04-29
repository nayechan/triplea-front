import React, { useEffect } from 'react';
import { Map, MapMarker, Polyline } from 'react-kakao-maps-sdk';

const getCentralPoint = (points) => {
  if (points.length === 0) {
    return null;
  }

  // Calculate the average latitude and longitude
  const totalLat = points.reduce((sum, point) => sum + point.latitude, 0);
  const totalLng = points.reduce((sum, point) => sum + point.longitude, 0);
  const avgLat = totalLat / points.length;
  const avgLng = totalLng / points.length;

  return { latitude: avgLat, longitude: avgLng };
};

const interpolateColorHSV = (lineIndex, lineCount, startHue, startSaturation, startValue, endHue, endSaturation, endValue) => {
  // Interpolate hue
  const hue = startHue + (endHue - startHue) * (lineIndex / lineCount);

  // Interpolate saturation
  const saturation = startSaturation + (endSaturation - startSaturation) * (lineIndex / lineCount);

  // Interpolate value
  const value = startValue + (endValue - startValue) * (lineIndex / lineCount);

  // Convert HSV to RGB
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

  // Convert RGB to hexadecimal color representation
  const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');

  return rgbToHex(r, g, b);
};

const RouteMap = ({ route }) => {
  const centralPoint = getCentralPoint(Object.values(route.plannersByDay).flat());


  return (
    <Map
      center={{ lat: centralPoint.latitude, lng: centralPoint.longitude }}
      style={{ width: '100%', height: 'calc(100vh - 64px)' }}
      level={8}
    >
    {Object.entries(route.plannersByDay).map(([dayIndex, locations]) => (
        locations.map((locationData, locationIndex, array) => {
          const nextIndex = (locationIndex + 1) % array.length; // Circular next index
          const nextPlanner = array[nextIndex];
          const maxDay = Math.max(...Object.keys(route.plannersByDay));

          // Check if it's not the last point of the day
          if (locationIndex !== array.length - 1) {
            return (
              <Polyline
                key={`${dayIndex}-${locationIndex}`}
                path={[
                  { lat: locationData.latitude, lng: locationData.longitude },
                  { lat: nextPlanner.latitude, lng: nextPlanner.longitude }
                ]}
                strokeWeight={5}
                strokeColor={interpolateColorHSV(dayIndex-1, maxDay, 0, 1, 1, 350, 1, 1)}
                strokeOpacity={0.7}
                strokeStyle={"solid"}
                endArrow={true}
              />
            );
          }
          return null; // Exclude the last line segment
        })
      ))}
    </Map>
  );
};

export default RouteMap;