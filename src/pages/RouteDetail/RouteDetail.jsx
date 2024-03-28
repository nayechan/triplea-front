import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useRouteData } from 'contexts/RouteDataContext';
import Header from 'components/Header';
import ContentBackground from 'components/ContentBackground';
import RouteDetailMapComponent from 'components/RouteDetail/RouteDetailMapComponent';
import RouteDetailDataComponent from 'components/RouteDetail/RouteDetailDataComponent';
import SideBar from 'components/SideBar/SideBar';
import ShrinkableSidebar from 'components/SideBar/ShrinkableSideBar';

const RouteDetail = () => {
  const { routeData } = useRouteData();
  const navigate = useNavigate();

  const [routeName, setRouteName] = useState('');
  const [dates, setDates] = useState([]);

  useEffect(() => {
    if (!routeData) {
      navigate('/resultRoute');
    } else {
      const transformedData = routeData.planners.reduce((acc, planner) => {
        const { day, touristDestinationName, latitude, longitude } = planner;
        acc[day] = acc[day] || [];
        acc[day].push({ location: touristDestinationName, latitude, longitude });
        return acc;
      }, {});

      const convertedData = Object.entries(transformedData).map(([day, locations]) => ({
        date: day,
        locations
      }));

      setRouteName(`경로 ${routeData.number + 1}`);
      setDates(convertedData);
    }
  }, [routeData, navigate]);

  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
      setIsOpen(!isOpen);
  };

  return (
    <>
      {routeData && (
        <div className="routeDetailWrapper">
          <Header />
          <ShrinkableSidebar isOpen={isOpen} toggleSidebar={toggleSidebar}>
            {/* Sidebar content goes here */}
            {/* You can put your navigation links or any other content */}

            <RouteDetailDataComponent
              routeName={routeName}
              setRouteName={setRouteName}
              dates={dates}
              setDates={setDates}
            />
          </ShrinkableSidebar>
          <RouteDetailMapComponent />
        </div>
      )}
    </>
  );
};

export default RouteDetail;
