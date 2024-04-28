import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { useCurrentRouteData } from 'contexts/CurrentRouteDataContext';

import Header from 'components/Header';
import RouteMap from 'components/RouteDetail/RouteMap';
import RouteContent from 'components/RouteDetail/RouteContent';
import ShrinkableSidebar from 'components/Sidebar/ShrinkableSidebar';
import Modal from 'components/Modal/Modal';
import EditLocation from 'components/Modal/RouteDetail/EditLocation';


const RouteDetailModalWrapper = styled.div``;

const RouteDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentRoute, propagateCurrentRoute } = useCurrentRouteData();
  const [isOpen, setIsOpen] = useState(true);
  const [modalVisibility, setModelVisibility] = useState({
    editLocation: true
  });

  const updateStatus = (modalName, isVisible) =>
  {
    setModelVisibility({ ...myObject, [modalName]: isVisible });
  }

  useEffect(() => {
    const unlisten = () => {
      if (location.action === 'POP') {
        propagateCurrentRoute();
      }
    };

    unlisten(); // Call unlisten immediately to check initial location

    return () => {
      unlisten();
    };
  }, [location, propagateCurrentRoute]);

  useEffect(() => {
    if (currentRoute === null) {
      navigate('/resultRoute');
    }
  }, [currentRoute, navigate]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {currentRoute && (
        <div className="routeDetailWrapper">
          <Header />
          <ShrinkableSidebar isOpen={isOpen} toggleSidebar={toggleSidebar}>
            <RouteContent route={currentRoute} />
          </ShrinkableSidebar>
          <RouteDetailModalWrapper>
            <Modal>
              <EditLocation />
            </Modal>
          </RouteDetailModalWrapper>
          <RouteMap route={currentRoute} />
        </div>
      )}
    </>
  );
};

export default RouteDetail;
