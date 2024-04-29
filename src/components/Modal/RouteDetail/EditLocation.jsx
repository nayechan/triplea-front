import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faPlus, faFileExport, faFileImport } from '@fortawesome/free-solid-svg-icons';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

import DefaultButton from 'components/DefaultButton';
import Modal from 'components/Modal/Modal';
import { useCurrentRouteData } from 'contexts/CurrentRouteDataContext';

// Style for modal itself
const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

`;

// Style for tab buttons
const TabButton = styled.button`
  padding: 10px 20px;
  background-color: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  font-size: 16px;
  cursor: pointer;
  transition: border-color 0.3s ease;

  &:hover {
    border-color: #007bff;
  }

  ${({ active }) => active && `
    border-color: #007bff;
    font-weight: bold;
  `}
`;

// Style for button container
const TabButtonContainer = styled.div`
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
`;

const TabContentWrapper = styled.div`
  margin: 10px;
  width: 500px;
`;

const LocationInputFormWrapper = styled.div`
  margin: 10px;
  flex: 1;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const EditLocation = ({ isOpen, setIsOpen, dayIndex, locationIndex }) => {
  const generateRecommendedLocations = () => {
    const locations = [];
    for (let i = 1; i <= 10; i++) {
      locations.push({
        id: i,
        name: `Location ${i}`,
        address: `Address ${i}`,
        latitude: 32 + Math.random() * 6,
        longitude: 126 + Math.random() * 4,
        description: `Description ${i}`
      });
    }
    return locations;
  };

  const { currentRoute } = useCurrentRouteData();
  const [tripLocation, setTripLocation] = useState(null);
  const [tab, setTab] = useState("map");
  const [recommendedLocations, setRecommendedLocations] = useState(generateRecommendedLocations());

  const [inputName, setInputName] = useState("");
  const [inputLatitude, setInputLatitude] = useState("");
  const [inputLongitude, setInputLongitude] = useState("");
  const [mapPosition, setMapPosition] = useState({ lat: 128, lng: 37 });

  useEffect(() => {
    if (isOpen && currentRoute?.plannersByDay?.[dayIndex]?.[locationIndex]) {
      setTripLocation(currentRoute.plannersByDay[dayIndex][locationIndex]);
      setMapPosition({
        lat: currentRoute.plannersByDay[dayIndex][locationIndex].latitude,
        lng: currentRoute.plannersByDay[dayIndex][locationIndex].longitude
      });
      console.log(tripLocation);
    }
  }, [isOpen, dayIndex, locationIndex, currentRoute]);

  useEffect(() => {
    if (tripLocation !== null) {
      setInputName(tripLocation.touristDestinationName);
      setInputLatitude(tripLocation.latitude);
      setInputLongitude(tripLocation.longitude);
    }
  }, [tripLocation]);

  const handleNameChange = (e) => {
    setInputName(e.target.value);
    setTripLocation({
      ...tripLocation,
      touristDestinationName: e.target.value
    });
  };

  const handleLatitudeChange = (e) => {
    setInputLatitude(e.target.value);
    setTripLocation({
      ...tripLocation,
      latitude: e.target.value
    });
  };

  const handleLongitudeChange = (e) => {
    setInputLongitude(e.target.value);
    setTripLocation({
      ...tripLocation,
      longitude: e.target.value
    });
  };

  const saveLocation = () => {
    currentRoute.plannersByDay[dayIndex][locationIndex] = tripLocation;
    setIsOpen(false);
  }

  return <Modal isVisible={isOpen} onClose={() => setIsOpen(false)} width="1000px" height="600px">
    <ModalWrapper>
      <h2>Edit Location</h2>
      <TabButtonContainer>
        {/* Tab buttons */}
        <TabButton onClick={() => setTab("map")}>Select location from map</TabButton>
        <TabButton onClick={() => setTab("recommended")}>Select recommended location</TabButton>
      </TabButtonContainer>

      {/* Render content based on selected tab */}
      <ContentWrapper>
        <TabContentWrapper>
          {tab === 'map' && (
            <div>
              <Map
                center={{ lat: mapPosition?.lat || 128, lng: mapPosition?.lng || 37 }}
                style={{ width: '500px', height: '400px' }}
                level={3}
                onClick={(_, mouseEvent) => {
                  let locationName = tripLocation.name;
                  const pos = mouseEvent.latLng;

                  // 주소-좌표 변환 객체를 생성합니다
                  const geocoder = new kakao.maps.services.Geocoder();
                  const ps = new kakao.maps.services.Places();

                  geocoder.coord2Address(pos.getLng(), pos.getLat(), (result, status) => {
                    console.log(status);
                    console.log(pos.getLng() + ", " + pos.getLat());
                    if (status === kakao.maps.services.Status.OK) {
                      const road_address = result[0].road_address?.address_name;
                      const _address = result[0].address?.address_name;

                      locationName = road_address || _address;

                      ps.keywordSearch(locationName, (data, status, pagination) => {
                        console.log(status);
                        if (status === kakao.maps.services.Status.OK) {
                          console.log(data[0].place_name);
                          locationName = data[0].place_name;
                        }

                        setTripLocation({
                          day: tripLocation.day,
                          latitude: pos.getLat(),
                          longitude: pos.getLng(),
                          order: tripLocation.order,
                          touristDestinationName: locationName
                        });
                      });


                      console.log(locationName);
                    }

                  });
                }}
              >
                <MapMarker position={{
                  lat: tripLocation?.latitude || 128,
                  lng: tripLocation?.longitude || 37
                }} />
              </Map>
            </div>
          )}
          {tab === 'recommended' && (
            <div>
              <h3>Recommended Locations</h3>
              <table>
                <thead>
                  <tr>
                    <th>Location Name</th>
                    <th>Address</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {recommendedLocations.map((location) => (
                    <tr key={location.id} onClick={() => {
                      console.log(location);
                      setTripLocation(
                        {
                          day: tripLocation.day,
                          latitude: location.latitude,
                          longitude: location.longitude,
                          order: tripLocation.order,
                          touristDestinationName: location.name ? location.name : location.address
                        }
                      )
                      setMapPosition({
                        lat: location.latitude,
                        lng: location.longitude
                      });
                    }}>
                      <td>{location.name}</td>
                      <td>{location.address}</td>
                      <td>{location.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </TabContentWrapper>
        <LocationInputFormWrapper>
          <h3>Name</h3>
          <input style={{ width: "420px" }} placeholder='name' value={inputName} onChange={handleNameChange}></input>
          <h3>Position</h3>
          <input style={{ width: "200px", margin: "0 15px 0 0" }} placeholder='latitude'
            value={inputLatitude} onChange={handleLatitudeChange}></input>
          <input style={{ width: "200px", margin: "0 15px 0 0" }} placeholder='longitude'
            value={inputLongitude} onChange={handleLongitudeChange}></input>
        </LocationInputFormWrapper>
      </ContentWrapper>

      <ButtonContainer>
        <DefaultButton onClick={() => saveLocation()}>Confirm</DefaultButton>
        <DefaultButton onClick={() => setIsOpen(false)}>Cancel</DefaultButton>
      </ButtonContainer>
    </ModalWrapper>
  </Modal>
}

export default EditLocation;