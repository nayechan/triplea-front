import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faPlus, faFileExport, faFileImport, faInfo } from '@fortawesome/free-solid-svg-icons';
import DefaultButton from 'components/DefaultButton';
import Modal from 'components/Modal/Modal';
import { Map, MapMarker, Polyline } from 'react-kakao-maps-sdk';

const StyledRouteInfo = styled.div`
    height: 100%;
    .routeName {
      font-size: 1.5em;
      font-weight: bold;
      width: 400px;
      margin-bottom: 20px;
    }

    .routeInfoWrapper {
      // Add styles for the component container here
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .dateTitle {
      font-size: 1.2em;
      font-weight: bold;
      // Add any additional styles for the date title here
    }

    .locationContainer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 4px;
    }

    .locationTitle{
      font-size: 1em;
    }

    .locationInput {
      // Add styles for the location input here
    }

    .actionButton {
      border: none;
      background: none;
      cursor: pointer;
      padding: 5px;
      transition: color 0.3s;
    }

    .actionButton:hover {
      color: #007bff;
    }
`;

const ButtonContainer = styled.div`
  display: flex;

  button {
    margin-left: 5px; /* Add margin between buttons */
  }
`;

const TopButtonContainer = styled(ButtonContainer)`
  display: flex;
  margin: 10px 0;
`;

const StyledButton = styled(DefaultButton)`
  width: 40px;
  height: 40px;
  margin: 4px;
`;

const SmallStyledButton = styled(DefaultButton)`
  width: 32px;
  height: 32px;
  margin: 2px;
`;

const AddLocationButton = styled(DefaultButton)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 32px;
  margin: 10px 0 50px 0;
`;

const RouteInfo = ({
  route,
  openEditResidenceLocationModal,
  openAddLocationModal,
  openEditLocationModal,
  openDeleteLocationModal,
  openInfoLocationModal,
  openImportRouteModal,
  openExportRouteModal
}) => {
  return (
    <StyledRouteInfo>
      <div className='routeInfoWrapper'>
        <div className="routeInfo">
          <input type="text" value={route.name} readOnly placeholder="여행 경로명" className='routeName' />
          <h3>숙소</h3>
          <div key={-1} className='locationContainer'>
            <div className='locationTitle'>{route.residence.name}</div>
            <ButtonContainer>
              <SmallStyledButton onClick={()=>{openEditResidenceLocationModal()}}>
                <FontAwesomeIcon icon={faEdit}/>
              </SmallStyledButton>
            </ButtonContainer>
          </div>
          {Object.entries(route.plannersByDay).map(([dayIndex, locations]) => (
            <div key={dayIndex}>
              <h3>{dayIndex}일차</h3>
              {locations.map((locationData, locationIndex) => (
                <div key={locationIndex} className='locationContainer'>
                  <div className='locationTitle'>{locationData.touristDestinationName}</div>
                  <ButtonContainer>
                    <SmallStyledButton onClick={() => (openInfoLocationModal(
                      {
                        name: locationData.touristDestinationName,
                        latitude: locationData.latitude,
                        longitude: locationData.longitude
                      }
                    ))}>
                      <FontAwesomeIcon icon={faInfo} />
                    </SmallStyledButton>
                    <SmallStyledButton onClick={() => (openEditLocationModal(dayIndex, locationIndex))}>
                      <FontAwesomeIcon icon={faEdit} />
                    </SmallStyledButton>
                    <SmallStyledButton onClick={() => (openDeleteLocationModal(dayIndex, locationIndex))}>
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </SmallStyledButton>
                  </ButtonContainer>
                </div>
              ))}
              <AddLocationButton onClick={() => (openAddLocationModal(dayIndex))}>
                <FontAwesomeIcon icon={faPlus} />
              </AddLocationButton>
            </div>
          ))}
        </div>

        <div className='featureButtons'>
          <TopButtonContainer>
            <StyledButton onClick={openImportRouteModal()}>
              <FontAwesomeIcon icon={faFileExport}></FontAwesomeIcon>
            </StyledButton>
            <StyledButton onClick={openExportRouteModal()}>
              <FontAwesomeIcon icon={faFileImport}></FontAwesomeIcon>
            </StyledButton>
          </TopButtonContainer>
        </div>
      </div>
    </StyledRouteInfo >
  );
};

export default RouteInfo;