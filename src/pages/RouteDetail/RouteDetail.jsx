import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { useCurrentRouteData } from 'contexts/CurrentRouteDataContext';

import Header from 'components/Header';
import RouteMap from 'components/RouteDetail/RouteMap';
import RouteInfo from 'components/RouteDetail/RouteInfo';
import ShrinkableSidebar from 'components/Sidebar/ShrinkableSidebar';
import Modal from 'components/Modal/Modal';
import EditLocation from 'components/Modal/RouteDetail/EditLocation';
import AddLocation from 'components/Modal/RouteDetail/AddLocation';
import DeleteLocation from 'components/Modal/RouteDetail/DeleteLocation';


const RouteDetailModalWrapper = styled.div`
  position: relative; /* Ensure that z-index works */
  z-index: 9999; /* Set a high z-index value to bring the modal to the front */
`;

const RouteDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentRoute } = useCurrentRouteData();

  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const [isAddLocationModalOpen, setIsAddLocationModalOpen] = useState(false);
  const [isEditLocationModalOpen, setIsEditLocationModalOpen] = useState(false);
  const [isDeleteLocationModalOpen, setIsDeleteLocationModalOpen] = useState(false);
  const [isImportRouteModalOpen, setIsImportRouteModalOpen] = useState(false);
  const [isExportRouteModalOpen, setIsExportRouteModalOpen] = useState(false);

  const [dayIndex, setDayIndex] = useState(null); // Define dayIndex state
  const [locationIndex, setLocationIndex] = useState(null); // Define locationIndex state

  const openAddLocationModal = (dayIndex) => {
    setIsAddLocationModalOpen(true);
    setDayIndex(dayIndex);
    setLocationIndex(currentRoute.plannersByDay[dayIndex].length);
  }

  const openEditLocationModal = (dayIndex, locationIndex) => {
    setIsEditLocationModalOpen(true);
    setDayIndex(dayIndex);
    setLocationIndex(locationIndex);
  };

  const openDeleteLocationModal = (dayIndex, locationIndex) => {
    setIsDeleteLocationModalOpen(true);
    setDayIndex(dayIndex);
    setLocationIndex(locationIndex);
  };

  const openImportRouteModal = () => {

  };

  const openExportRouteModal = () => {

  };

  useEffect(() => {
    const unlisten = () => {
      if (location.action === 'POP') {
      }
    };

    unlisten(); // Call unlisten immediately to check initial location

    return () => {
      unlisten();
    };
  }, [location]);

  useEffect(() => {
    if (currentRoute === null) {
      navigate('/resultRoute');
    }
  }, [currentRoute, navigate]);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {currentRoute && (
        <div className="routeDetailWrapper">
          <Header />
          <ShrinkableSidebar isopen={isSidebarOpen} toggleSidebar={toggleSidebar}>
            <RouteInfo
              route={currentRoute}
              openAddLocationModal={openAddLocationModal}
              openEditLocationModal={openEditLocationModal}
              openDeleteLocationModal={openDeleteLocationModal}
              openImportRouteModal={openImportRouteModal}
              openExportRouteModal={openExportRouteModal}
            />
          </ShrinkableSidebar>
          <RouteDetailModalWrapper>
            <AddLocation
              isopen={isAddLocationModalOpen}
              setIsopen={setIsAddLocationModalOpen}
              dayIndex={dayIndex}
              locationIndex={locationIndex}
            />
            <EditLocation
              isopen={isEditLocationModalOpen}
              setIsopen={setIsEditLocationModalOpen}
              dayIndex={dayIndex}
              locationIndex={locationIndex}
            />
            <DeleteLocation
              isopen={isDeleteLocationModalOpen}
              setIsopen={setIsDeleteLocationModalOpen}
              dayIndex={dayIndex}
              locationIndex={locationIndex}
            />
          </RouteDetailModalWrapper>
          <RouteMap route={currentRoute} />
        </div>
      )}
    </>
  );
};

export default RouteDetail;
