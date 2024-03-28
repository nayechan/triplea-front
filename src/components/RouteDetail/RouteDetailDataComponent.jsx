import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';

const StyledRouteDetailDataComponent = styled.div`
    .routeName {
        font-size: 1.5em;
        font-weight: bold;
    }

    .routeDetailDataComponent {
        // Add styles for the component container here
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

const RouteDetailDataComponent = ({ routeName, setRouteName, dates, setDates }) => {
    const handleAddLocation = (dateIndex) => {
        const newDates = [...dates];
        newDates[dateIndex].locations.push({ location: '' });
        setDates(newDates);
    };

    const handleLocationChange = (dateIndex, locationIndex, event) => {
        const newDates = [...dates];
        newDates[dateIndex].locations[locationIndex].location = event.target.value;
        setDates(newDates);
    };

    const handleEditLocation = () => {
        // Implement edit functionality here
    };

    const handleDeleteLocation = () => {
        // Implement delete functionality here
    };

    return (
        <StyledRouteDetailDataComponent>
            <div className='routeDetailDataComponent'>
                <input type="text" value={routeName} onChange={(event) => setRouteName(event.target.value)} placeholder="여행 경로명" 
                className='routeName'/>
                {dates.map((dateData, dateIndex) => (
                    <div key={dateIndex}>
                        <h3>{dateData.date}일차</h3>
                        {dateData.locations.map((locationData, locationIndex) => (
                            <div key={locationIndex} className='locationContainer'>
                                <input
                                    type="text"
                                    value={locationData.location}
                                    onChange={(event) => handleLocationChange(dateIndex, locationIndex, event)}
                                    placeholder="여행지명"
                                />
                                <ButtonContainer>
                                    <button onClick={handleEditLocation}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button onClick={handleDeleteLocation}>
                                        <FontAwesomeIcon icon={faTrashAlt} />
                                    </button>
                                </ButtonContainer>
                            </div>
                        ))}
                        <button disabled onClick={() => handleAddLocation(dateIndex)}>
                            <FontAwesomeIcon icon={faPlus} />
                            Add location
                        </button>
                    </div>
                ))}
            </div>
        </StyledRouteDetailDataComponent>
    );
};

export default RouteDetailDataComponent;