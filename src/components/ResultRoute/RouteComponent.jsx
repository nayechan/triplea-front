// RouteComponent.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRouteData } from  'contexts/RouteDataContext';
import styled from 'styled-components';
import DefaultButton from 'components/DefaultButton';

// Styled components
const RouteContainer = styled.div`
  margin-top: 20px;
  border: 1px solid #ccc;
  padding: 20px;
`;

const RouteHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const RouteNumber = styled.h2`
  margin: 0;
`;

const RouteImage = styled.img`
  width: 100px; /* Adjust width as needed */
  height: auto;
`;

const DailyRoutesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const DailyRouteWrapper = styled.div`
  flex-basis: calc(33.33% - 20px); /* Adjust width as needed */
  margin-right: 20px;
  margin-bottom: 20px;
`;

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
  const { routeData, selectedRouteKey, selectRouteKey } = useRouteData();
  const navigate = useNavigate();

  const onDetailsClick = () => {
    selectRouteKey(route.number);
    console.log("Route clicked:", routeData[route.number]);
  };

  useEffect(() => {
    if (selectedRouteKey !== -1) {
      console.log("Route data changed:", selectedRouteKey);
      navigate('/routeDetail');
    }
  }, [selectedRouteKey]);

  let groupedPlanners = groupPlannersByDay(route.planners);
  return (
    <RouteContainer>
      <RouteHeader>
        <RouteNumber>경로 {route.number}</RouteNumber>
      </RouteHeader>
      <DailyRoutesContainer>
        {Object.keys(groupedPlanners).map((day, index) => (
          <DailyRouteWrapper key={index}>
            <h3>{day}일차</h3>
            {groupedPlanners[day].map((planner, index) => (
              <p key={index}>{planner.touristDestinationName}</p>
            ))}
          </DailyRouteWrapper>
        ))}
      </DailyRoutesContainer>
      <DefaultButton onClick={onDetailsClick}>자세히 보기</DefaultButton>
    </RouteContainer>
  );
};

export default RouteComponent;
