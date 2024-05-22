import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faPlus, faFileExport, faFileImport } from '@fortawesome/free-solid-svg-icons';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

import DefaultButton from 'components/DefaultButton';
import Modal from 'components/Modal/Modal';
import { useCurrentRouteData } from 'contexts/CurrentRouteDataContext';

const { kakao } = window;

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
  min-width:100px;
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
  display: flex; /* Use flexbox */
  overflow-x: auto; /* Enable horizontal scrollbar if content overflows */
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

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    border: 1px solid #ccc;
    padding: 8px;
  }
`;

const StyledTableRow = styled.tr`
  cursor: pointer;
  transition: background-color 0.3s ease;
  max-height: 50px;
  overflow: hidden;

  &:hover {
    background-color: #f0f0f0;
  }

  &:active {
    background-color: #c5c5c5;
  }
`;

const AddLocation = ({ isopen, setIsopen, dayIndex, locationIndex }) => {
  const { currentRoute } = useCurrentRouteData();
  const [tripLocation, setTripLocation] = useState(null);
  const [tab, setTab] = useState("map");


  const [selectedRegion, setSelectedRegion] = useState("서울"); // State for selected region
  const [recommendedLocations, setRecommendedLocations] = useState([]);

  const [inputName, setInputName] = useState("");
  const [inputLatitude, setInputLatitude] = useState("");
  const [inputLongitude, setInputLongitude] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [mapPosition, setMapPosition] = useState({ lat: 36.3, lng: 127.4 });

  useEffect(() => {
    if (isopen && currentRoute?.plannersByDay?.[dayIndex]) {
      let _tripLocation =
      {
        day: dayIndex,
        latitude: 36.3,
        longitude: 127.4,
        touristDestinationName: "New Location"
      };

      if (currentRoute.plannersByDay[dayIndex].length > 0) {
        _tripLocation = currentRoute.plannersByDay[dayIndex][locationIndex - 1];
      }

      setMapPosition({
        lat: _tripLocation.latitude,
        lng: _tripLocation.longitude
      });

      setTripLocation(_tripLocation);
    }
  }, [isopen, dayIndex, locationIndex, currentRoute]);

  useEffect(() => {
    if (tripLocation !== null) {
      setInputName(tripLocation.touristDestinationName);
      setInputLatitude(tripLocation.latitude);
      setInputLongitude(tripLocation.longitude);
      setInputDescription(tripLocation.information);
    }
  }, [tripLocation]);

  useEffect(() => {
    if (selectedRegion) {
      // Fetch data based on selected region
      fetchRegionData(selectedRegion);
    }
  }, [selectedRegion]);

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

  const handleDescriptionChange = (e) => {
    setInputDescription(e.target.value);
    setTripLocation({
      ...tripLocation,
      longitude: e.target.value
    });
  }

  const saveLocation = () => {
    currentRoute.plannersByDay[dayIndex][locationIndex] = tripLocation;
    setIsopen(false);
  }

  const fetchRegionData = async (region) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/tourlist?area=${region}`);
      if (response.status === 200) {
        const regionsData = response.data.map((location, index) => {
          return {
            id: index,
            name: location.touristDestinationName,
            address: location.address,
            latitude: location.latitude,
            longitude: location.longitude,
            information: location.introduction
          };
        });
        setRecommendedLocations(regionsData);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return <Modal isVisible={isopen} onClose={() => setIsopen(false)} width="1000px" height="700px">
    <ModalWrapper>
      <h2>여행지 추가</h2>
      <TabButtonContainer>
        {/* Tab buttons */}
        <TabButton onClick={() => setTab("map")}>지도</TabButton>
        <TabButton onClick={() => setTab("recommended")}>추천 여행지</TabButton>
      </TabButtonContainer>

      {/* Render content based on selected tab */}
      <ContentWrapper>
        <TabContentWrapper>
          {tab === 'map' && (
            <div>
              <Map
                center={{ lat: mapPosition?.lat || 128, lng: mapPosition?.lng || 37 }}
                style={{ width: '500px', height: '500px' }}
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
                          touristDestinationName: locationName
                        });
                        setInputDescription("");
                      });


                      console.log(locationName);
                    }

                  });
                }}
              >
                <MapMarker position={{
                  lat: tripLocation?.latitude || 126.3,
                  lng: tripLocation?.longitude || 36.4
                }} />
              </Map>
            </div>
          )}
          {tab === 'recommended' && (
            <div>
              <TabButtonContainer>
                {['서울', '부산', '대구', '인천', '광주', '대전', '울산', '세종', '경기', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주'].map((region) => (
                  <TabButton key={region} onClick={() => setSelectedRegion(region)}>{region}</TabButton>
                ))}
              </TabButtonContainer>
              <div style={{ overflowX: 'hidden', overflowY: 'auto', maxHeight: '450px' }}>
                <StyledTable style={{ minWidth: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th width="160px">여행지명</th>
                      <th>주소</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recommendedLocations.map((location) => (
                      <StyledTableRow key={location.id} onClick={() => {
                        setTripLocation({
                          day: tripLocation.day,
                          latitude: location.latitude,
                          longitude: location.longitude,
                          touristDestinationName: location.name ? location.name : location.address,
                          information: location.information
                        });
                        setInputDescription(location.information);
                        setMapPosition({
                          lat: location.latitude,
                          lng: location.longitude
                        });
                      }}>
                        <td height="50px">{location.name}</td>
                        <td>{location.address}</td>
                      </StyledTableRow>
                    ))}
                  </tbody>
                </StyledTable>
              </div>
            </div>
          )}
        </TabContentWrapper>
        <LocationInputFormWrapper>
          <h3>여행지명</h3>
          <input style={{ width: "420px" }} placeholder='name' value={inputName} onChange={handleNameChange}></input>
          <input style={{ width: "200px", margin: "0 15px 0 0" }} placeholder='latitude'
            value={inputLatitude} onChange={handleLatitudeChange} hidden></input>
          <input style={{ width: "200px", margin: "0 15px 0 0" }} placeholder='longitude'
            value={inputLongitude} onChange={handleLongitudeChange} hidden></input>
          <h3>설명</h3>
          <p>{inputDescription}</p>
        </LocationInputFormWrapper>
      </ContentWrapper>

      <ButtonContainer>
        <DefaultButton onClick={() => saveLocation()}>확인</DefaultButton>
        <DefaultButton onClick={() => setIsopen(false)}>취소</DefaultButton>
      </ButtonContainer>
    </ModalWrapper>
  </Modal>
}

export default AddLocation;