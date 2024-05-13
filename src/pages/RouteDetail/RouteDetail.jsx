import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { useCurrentRouteData } from 'contexts/CurrentRouteDataContext';

import Header from 'components/Header';
import RouteMap from 'components/RouteDetail/RouteMap';
import RouteInfo from 'components/RouteDetail/RouteInfo';
import ShrinkableSidebar from 'components/Sidebar/ShrinkableSidebar';
import EditLocation from 'components/Modal/RouteDetail/EditLocation';
import AddLocation from 'components/Modal/RouteDetail/AddLocation';
import DeleteLocation from 'components/Modal/RouteDetail/DeleteLocation';
import InfoLocation from 'components/Modal/RouteDetail/InfoLocation';
import EditResidenceLocation from 'components/Modal/RouteDetail/EditResidenceLocation';
import PrintRoute from 'components/Modal/RouteDetail/PrintRoute';

const RouteDetailModalWrapper = styled.div`
  position: relative; /* Ensure that z-index works */
  z-index: 9999; /* Set a high z-index value to bring the modal to the front */
`;

const RouteDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {currentRoute, setCurrentRoute} = useCurrentRouteData();

  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const [isEditResidenceLocationModalOpen, setIsEditResidenceLocationModalOpen] = useState(false);
  const [isAddLocationModalOpen, setIsAddLocationModalOpen] = useState(false);
  const [isEditLocationModalOpen, setIsEditLocationModalOpen] = useState(false);
  const [isDeleteLocationModalOpen, setIsDeleteLocationModalOpen] = useState(false);
  const [isInfoLocationModalOpen, setIsInfoLocationModalOpen] = useState(false);
  const [isPrintRouteModalOpen, setIsPrintRouteModalOpen] = useState(false);

  const [dayIndex, setDayIndex] = useState(null); // Define dayIndex state
  const [locationIndex, setLocationIndex] = useState(null); // Define locationIndex state
  const [tripLocation, setTripLocation] = useState(null);

  const openEditResidenceLocationModal = ()=>{
    setIsEditResidenceLocationModalOpen(true);
  }

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

  const openInfoLocationModal = (location)=>{
    setIsInfoLocationModalOpen(true);
    setTripLocation(location);
  }

  const openPrintRouteModal = ()=>{
    setIsPrintRouteModalOpen(true);
  }
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
              setRoute={setCurrentRoute}
              openEditResidenceLocationModal={openEditResidenceLocationModal}
              openAddLocationModal={openAddLocationModal}
              openEditLocationModal={openEditLocationModal}
              openDeleteLocationModal={openDeleteLocationModal}
              openInfoLocationModal={openInfoLocationModal}
              openPrintRouteModal={openPrintRouteModal}
            />
          </ShrinkableSidebar>
          <RouteDetailModalWrapper>
            <EditResidenceLocation
              isopen={isEditResidenceLocationModalOpen}
              setIsopen={setIsEditResidenceLocationModalOpen}
            />
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
            <InfoLocation
              isopen={isInfoLocationModalOpen}
              setIsopen={setIsInfoLocationModalOpen}
              tripLocation={tripLocation}
            />
            <PrintRoute
              isopen={isPrintRouteModalOpen}
              setIsopen={setIsPrintRouteModalOpen}
            />
          </RouteDetailModalWrapper>
          <RouteMap route={currentRoute} openInfoLocationModal={openInfoLocationModal}/>
        </div>
      )}
    </>
  );
};

export default RouteDetail;
