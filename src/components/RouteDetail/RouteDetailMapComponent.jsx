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

const RouteDetailMapComponent = ({ route }) => {

  const points = route.planners.map((planner) => ({
    name: planner.order,
    order: planner.order,
    day: planner.day,
    latitude: planner.latitude,
    longitude: planner.longitude
  }));

  // Group points by day
  const pointsByDay = points.reduce((acc, point) => {
    acc[point.day] = acc[point.day] || [];
    acc[point.day].push(point);
    return acc;
  }, {});

  const centralPoint = getCentralPoint(points);

  return (
    <Map
      center={{ lat: centralPoint.latitude, lng: centralPoint.longitude }} // 지도의 중심 좌표
      style={{ width: '100%', height: 'calc(100vh - 64px)' }} // 지도 크기
      level={8} // 지도 확대 레벨
    >
      {points.map((point, index) => (
        <MapMarker
          key={index}
          position={{ lat: point.latitude, lng: point.longitude }}
        >
        </MapMarker>
      ))}
      {Object.values(pointsByDay).map((pointsInDay, dayIndex) => (
        pointsInDay.map((point, index, array) => {
          const nextIndex = (index + 1) % pointsInDay.length; // Circular next index
          const nextPoint = pointsInDay[nextIndex];

          // Check if it's not the last point of the day
          if (index !== array.length - 1) {
            return (
              <Polyline
                key={`${dayIndex}-${index}`}
                path={[
                  { lat: point.latitude, lng: point.longitude },
                  { lat: nextPoint.latitude, lng: nextPoint.longitude }
                ]}
                strokeWeight={5}
                strokeColor={interpolateColorHSV(dayIndex, Object.keys(pointsByDay).length, 0, 1, 1, 350, 1, 1)}
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

export default RouteDetailMapComponent;