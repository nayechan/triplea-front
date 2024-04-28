import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faPlus, faFileExport, faFileImport } from '@fortawesome/free-solid-svg-icons';
import DefaultButton from 'components/DefaultButton';
import Modal from 'components/Modal/Modal';
import { Map, MapMarker, Polyline } from 'react-kakao-maps-sdk';

const StyledRouteContent = styled.div`
    height: 100%;
    .routeName {
        font-size: 1.5em;
        font-weight: bold;
    }

    .routeDetailContentWrapper {
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
        justify-content: space-between;
        margin-bottom: 10px;
    }

    .locationInput {
        // Add styles for the location input here
    }

    .buttonContainer {
        margin-top: 5px;
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
    margin-top: 5px;

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
`

const RouteContent = ({ route }) => {
  console.log(route);

  return (
    <StyledRouteContent>
      <div className='routeDetailContentWrapper'>
        <div className="routeDetailContent">
          <input type="text" value={route.name} readOnly placeholder="여행 경로명" className='routeName' />
          {Object.entries(route.plannersByDay).map(([dayIndex, locations]) => (
            <div key={dayIndex}>
              <h3>{dayIndex}일차</h3>
              {locations.map((locationData, locationIndex) => (
                <div key={locationIndex} className='locationContainer'>
                  <input
                    type="text"
                    value={locationData.touristDestinationName}
                    placeholder="여행지명"
                    readOnly
                  />
                  <ButtonContainer>
                    <button onClick={() => (handleEditLocation(dayIndex, locationIndex))}>
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button onClick={handleDeleteLocation}>
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </ButtonContainer>
                </div>
              ))}
              <button disabled>
                <FontAwesomeIcon icon={faPlus} />
                Add location
              </button>
            </div>
          ))}
        </div>

        <div className='featureButtons'>
          <TopButtonContainer>
            <StyledButton>
              <FontAwesomeIcon icon={faFileExport}></FontAwesomeIcon>
            </StyledButton>
            <StyledButton>
              <FontAwesomeIcon icon={faFileImport}></FontAwesomeIcon>
            </StyledButton>
          </TopButtonContainer>
        </div>
      </div>
    </StyledRouteContent>
  );
};

export default RouteContent;