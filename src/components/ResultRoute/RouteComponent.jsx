// RouteComponent.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResultRouteData } from 'contexts/ResultRouteDataContext';
import { useCurrentRouteData } from 'contexts/CurrentRouteDataContext';
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
  flex-wrap: nowrap; /* Prevent wrapping of items */
  max-height: 300px; /* Set a maximum height */
  max-width: 100%; /* Set a maximum width */
  overflow-x: auto; /* Add horizontal scrollbar if content exceeds maximum width */
  overflow-y: auto; /* Add vertical scrollbar if content exceeds maximum height */
`;

const DailyRouteWrapper = styled.div`
  flex-basis: calc(33.33% - 20px); /* Adjust width as needed */
  margin-right: 20px;
  margin-bottom: 20px;
  min-width: 300px;
`;

const RouteComponent = ({ route }) => {
  const { updateCurrentRoute, selectRouteIndex } = useResultRouteData();
  const { setCurrentRoute } = useCurrentRouteData();
  const navigate = useNavigate();

  const onDetailsClick = () => {
    selectRouteIndex(route.number);
    setCurrentRoute(route);
    navigate('/routeDetail');
  };

  console.log(route);

  return (
    <RouteContainer>
      <RouteHeader>
        <RouteNumber>경로 {route.number}</RouteNumber>
      </RouteHeader>
      <DailyRoutesContainer>
        {!route.plannersByDay ? (
          <p>여행지가 없습니다.</p>
        ) : (Object.entries(route.plannersByDay).map(([day, planners]) => (
          <DailyRouteWrapper key={day}>
            <h3>{day}일차</h3>
            {planners.map((planner, index) => (
              <p key={index}>{planner.touristDestinationName}</p>
            ))}
          </DailyRouteWrapper>
        )))}
      </DailyRoutesContainer>
      <DefaultButton onClick={onDetailsClick}>자세히 보기</DefaultButton>
    </RouteContainer>
  );
};

export default RouteComponent;
