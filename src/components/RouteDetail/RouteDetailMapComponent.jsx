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

const RouteDetailMapComponent = ({ route }) => {

  const points = route.planners.map((planner) => ({
    name: planner.order,
    latitude: planner.latitude,
    longitude: planner.longitude
  }));

  const polylinePoint = points.map((point) => ({
    lat: point.latitude,
    lng: point.longitude
  }));

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
      <Polyline
        path={[
          polylinePoint
        ]}
        strokeWeight={5} // 선의 두께 입니다
        strokeColor={"#3377ff"} // 선의 색깔입니다
        strokeOpacity={0.7} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle={"solid"} // 선의 스타일입니다
        endArrow={true}
      />
    </Map>
  );
};

export default RouteDetailMapComponent;