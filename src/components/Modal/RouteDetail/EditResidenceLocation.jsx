import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import DefaultButton from 'components/DefaultButton';
import Modal from 'components/Modal/Modal';
import { useCurrentRouteData } from 'contexts/CurrentRouteDataContext';

const { kakao } = window;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
`;

const TabContentWrapper = styled.div`
  margin: 10px;
`;

const LocationInputFormWrapper = styled.div`
  margin: 10px;
  flex: 1;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const EditResidenceLocation = ({ isopen, setIsopen }) => {
  const { currentRoute } = useCurrentRouteData();
  const [newResidence, setNewResidence] = useState(null);
  const [inputName, setInputName] = useState("");
  const [inputLatitude, setInputLatitude] = useState("");
  const [inputLongitude, setInputLongitude] = useState("");
  const [inputAddress, setInputAddress] = useState("");
  const [mapPosition, setMapPosition] = useState({ lat: 36.3, lng: 127.4 });

  useEffect(() => {
    if (isopen && currentRoute?.residence) {
      setNewResidence(currentRoute.residence);
      setMapPosition({
        lat: currentRoute.residence.latitude,
        lng: currentRoute.residence.longitude
      });
    }
  }, [isopen, currentRoute]);

  useEffect(() => {
    if (newResidence !== null) {
      setInputName(newResidence.name);
      setInputLatitude(newResidence.latitude);
      setInputLongitude(newResidence.longitude);
    }
  }, [newResidence]);

  const handleNameChange = (e) => {
    setInputName(e.target.value);
    setNewResidence({
      ...newResidence,
      name: e.target.value
    });
  };

  const saveLocation = () => {
    currentRoute.residence = newResidence;
    setIsopen(false);
  };

  return (
    <Modal isVisible={isopen} onClose={() => setIsopen(false)} width="1000px" height="650px">
      <ModalWrapper>
        <h2>숙소 변경</h2>
        <ContentWrapper>
          <TabContentWrapper>
            <div>
              <Map
                center={{ lat: mapPosition?.lat || 128, lng: mapPosition?.lng || 37 }}
                style={{ width: '500px', height: '500px' }}
                level={3}
                onClick={(_, mouseEvent) => {
                  let locationName = newResidence.name;
                  const pos = mouseEvent.latLng;
                  // 주소-좌표 변환 객체를 생성합니다
                  const geocoder = new kakao.maps.services.Geocoder();
                  const ps = new kakao.maps.services.Places();

                  geocoder.coord2Address(pos.getLng(), pos.getLat(), (result, status) => {
                    if (status === kakao.maps.services.Status.OK) {
                      const road_address = result[0].road_address?.address_name;
                      const _address = result[0].address?.address_name;
                      locationName = road_address || _address;

                      ps.keywordSearch(locationName, (data, status, pagination) => {
                        const address = locationName;
                        if (status === kakao.maps.services.Status.OK) {
                          locationName = data[0].place_name;
                        }
                        setNewResidence({
                          latitude: pos.getLat(),
                          longitude: pos.getLng(),
                          name: locationName
                        });
                        setInputAddress(address);
                      });
                    }
                  });
                }}
              >
                <MapMarker position={{ lat: newResidence?.latitude || 126.3, lng: newResidence?.longitude || 36.4 }} />
              </Map>
            </div>
          </TabContentWrapper>
          <LocationInputFormWrapper>
            <h3>숙소명</h3>
            <input style={{ width: "420px" }} placeholder='name' value={inputName} onChange={handleNameChange}></input>
            <input style={{ width: "200px", margin: "0 15px 0 0" }} placeholder='latitude'
              value={inputLatitude} onChange={(e) => setInputLatitude(e.target.value)} hidden></input>
            <input style={{ width: "200px", margin: "0 15px 0 0" }} placeholder='longitude'
              value={inputLongitude} onChange={(e) => setInputLongitude(e.target.value)} hidden></input>
            <h3>주소</h3>
            <p>{inputAddress}</p>
          </LocationInputFormWrapper>
        </ContentWrapper>
        <ButtonContainer>
          <DefaultButton onClick={() => saveLocation()}>확인</DefaultButton>
          <DefaultButton onClick={() => setIsopen(false)}>취소</DefaultButton>
        </ButtonContainer>
      </ModalWrapper>
    </Modal>
  );
};

export default EditResidenceLocation;
