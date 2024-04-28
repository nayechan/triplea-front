import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faPlus, faFileExport, faFileImport } from '@fortawesome/free-solid-svg-icons';
import DefaultButton from 'components/DefaultButton';
import Modal from 'components/Modal/Modal';
import { Map, MapMarker, Polyline } from 'react-kakao-maps-sdk';

const EditLocation = ({ location, isVisible, setVisibility, onConfirm }) => {
  const generateRecommendedLocations = () => {
    const locations = [];
    for (let i = 1; i <= 5; i++) {
      locations.push({
        id: i,
        name: `Location ${i}`,
        address: `Address ${i}`,
        description: `Description ${i}`
      });
    }
    return locations;
  };

  const getLocation = ()=>{
    return location;
  }

  const { tab, setTab } = useState("map");
  const { recommendedLocations, fetchRecommendedLocations } =
    useState(generateRecommendedLocations());

  return <Modal isVisible={isVisible} onClose={() => setVisibility(false)}>
    <h2>Edit Location</h2>
    <div>
      {/* Tab buttons */}
      <button onClick={() => setTab("map")}>Select location from map</button>
      <button onClick={() => SetTab("recommended")}>Select recommended location</button>
    </div>
    {/* Render content based on selected tab */}
    {tab === 'map' && (
      <div>
        <Map
          center={{ lat: 36, lng: 128 }}
          style={{ width: '100%', height: '340px' }}
          level={8}
        />
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
              <tr key={location.id} onClick={() => { console.log(location) }}>
                <td>{location.name}</td>
                <td>{location.address}</td>
                <td>{location.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
    <button onClick={() => onConfirm(location)}>Confirm</button>
    <button onClick={() => setVisibility(false)}>Cancel</button>
  </Modal>
}

export default EditLocation;