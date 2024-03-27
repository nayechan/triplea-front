import React from 'react';
import styled from 'styled-components';
import Button from 'components/Button';

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

// Define a separate component for rendering daily routes
const DailyRoute = ({ day, planners }) => {
  return (
    <div>
      <h3>{day}일차</h3>
      {planners.map((planner, index) => (
        <p key={index}>{planner.touristDestinationName}</p>
      ))}
    </div>
  );
};

const RouteTemplate = ({ routeNumber, groupedPlanners, onDetailsClick }) => {
  return (
    <RouteContainer>
      <RouteHeader>
        <RouteNumber>경로 {routeNumber+1}</RouteNumber> 
      </RouteHeader>
      <DailyRoutesContainer>
        {Object.keys(groupedPlanners).map((day, index) => (
          <DailyRouteWrapper key={index}>
            <DailyRoute day={day} planners={groupedPlanners[day]} />
          </DailyRouteWrapper>
        ))}
      </DailyRoutesContainer>
      <Button onClick={onDetailsClick}>자세히 보기</Button>
    </RouteContainer>
  );
};

export default RouteTemplate;
