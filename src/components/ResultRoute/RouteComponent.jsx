import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router
import { useRouteData } from  'contexts/RouteDataContext'
import styled from 'styled-components';
import RouteLayout from './RouteLayout';

// Function to group planner items by day
const groupPlannersByDay = (planners) => {
  const groupedByDay = {};
  planners.forEach((planner) => {
    if (!groupedByDay[planner.day]) {
      groupedByDay[planner.day] = [];
    }
    groupedByDay[planner.day].push(planner);
  });
  return groupedByDay;
};

const RouteComponent = ({ route }) => {
  const {routeData, setRouteData} = useRouteData();
  
  const navigate = useNavigate();
  const onDetailsClick = ()=>{
    setRouteData(route);
    console.log("Route clicked:", route);
  };

  useEffect(() => {
    if(routeData !== null)
    {
      console.log("Route data changed:", routeData);
      navigate('/routeDetail');
    }
  }, [routeData]);

  let groupedPlanners = groupPlannersByDay(route.planners);


  return <RouteLayout groupedPlanners={groupedPlanners} routeNumber={route.number} onDetailsClick={onDetailsClick}/>;
};

export default RouteComponent;