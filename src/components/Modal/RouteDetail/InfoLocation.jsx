import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import DefaultButton from 'components/DefaultButton';
import Modal from 'components/Modal/Modal';
import useFetchInfoImage from 'hooks/api/FetchInfoImage';
import { FaPhotoVideo } from 'react-icons/fa';

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

const ImagePlaceholder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); /* Adjust the shadow as needed */
  width: 500px;
  height: 500px;
`;

const StyledImage = styled.img`
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); /* Adjust the shadow as needed */
  width: 500px;
  height: 500px;
  object-fit: cover;
`;

const InfoLocation = ({ isopen, setIsopen, tripLocation }) => {
  const [mapPosition, setMapPosition] = useState({ lat: 36.3, lng: 127.4 });
  const [tab, setTab] = useState("map");
  const [keyword, setKeyword] = useState("");

  const { fetchedInfoImage, isLoading } = useFetchInfoImage(keyword);

  const closeInfoLocationModal = () => {
    setIsopen(false);
    setTab("map");
  }

  useEffect(() => {
    console.log(tripLocation);
    if (tripLocation) {
      setMapPosition({
        lat: tripLocation.latitude,
        lng: tripLocation.longitude
      });

      setKeyword(tripLocation.name);
    }
  }, [tripLocation]);

  return (
    <Modal isVisible={isopen} onClose={() => setIsopen(false)} width="1000px" height="700px">
      <ModalWrapper>
        <h2>정보</h2>
        <TabButtonContainer>
          {/* Tab buttons */}
          <TabButton onClick={() => setTab("map")}>지도</TabButton>
          {fetchedInfoImage !== "" && (
            <TabButton onClick={() => setTab("image")}>사진</TabButton>
          )}
        </TabButtonContainer>

        <ContentWrapper>
          <TabContentWrapper>
            {tab === 'map' && (
              <div>
                <Map
                  center={{ lat: mapPosition?.lat || 128, lng: mapPosition?.lng || 37 }}
                  style={{ width: '500px', height: '500px' }}
                  level={3}
                >
                  <MapMarker position={{ lat: tripLocation?.latitude || 126.3, lng: tripLocation?.longitude || 36.4 }} />
                </Map>
              </div>
            )}
            {tab === 'image' && (
              <div>
                {(isLoading) ? (
                  <ImagePlaceholder>
                    <p>Image Loading...</p>
                  </ImagePlaceholder>
                ) : fetchedInfoImage ? (
                  <StyledImage src={fetchedInfoImage}></StyledImage>
                ) : (
                  <ImagePlaceholder>
                    <p>No Image</p>
                  </ImagePlaceholder>
                )}
              </div>
            )}
          </TabContentWrapper>
          <LocationInputFormWrapper>
            <h3>이름</h3>
            <p>{tripLocation?.name}</p>
            <br />
            <h3>설명</h3>
            <p>{tripLocation?.information}</p>
          </LocationInputFormWrapper>
        </ContentWrapper>
        <ButtonContainer>
          <DefaultButton onClick={closeInfoLocationModal}>닫기</DefaultButton>
        </ButtonContainer>
      </ModalWrapper>
    </Modal>
  );
};

export default InfoLocation;
