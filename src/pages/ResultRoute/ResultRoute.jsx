import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import useFetchRouteData from 'hooks/api/FetchRouteData'; // Import the custom hook

import ContentTemplate from 'components/ContentsTemplate';
import RouteComponent from 'components/ResultRoute/RouteComponent';

import { useResultRouteData } from 'contexts/ResultRouteDataContext'

const ResultRoute = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const { resultRouteData, setResultRouteData } = useResultRouteData();

  // Retrieve individual parameters
  const [selectedRegion] = useState(queryParams.get('region'));
  const [selectedPeriod] = useState(queryParams.get('period'));
  const [selectedStrength] = useState(queryParams.get('strength'));
  const [selectedResidence] = useState(JSON.parse(queryParams.get('residence')));


  console.log(selectedResidence);

  const { fetchedRouteData, isLoading, error } = useFetchRouteData(
    selectedRegion,
    selectedPeriod,
    selectedStrength,
    selectedResidence
  );

  // Function to group planner items by day

  const groupPlannersByDay = (planners) => {
    const groupedByDay = {};
    planners.forEach((planner) => {
      const convertedPlanner = {
        day: planner.day,
        latitude: planner.latitude,
        longitude: planner.longitude,
        touristDestinationName: planner.touristDestinationName
      };
      if (!groupedByDay[convertedPlanner.day]) {
        groupedByDay[convertedPlanner.day] = [];
      }
      groupedByDay[convertedPlanner.day].push(convertedPlanner);
    });
    return groupedByDay;
  };



  useEffect(
    () => {
      // Convert the fetched data into the desired format
      const convertFetchedData = (route) => {
        const plannersByDay = groupPlannersByDay(route.planners);
        return {
          name: "새 여행 경로",
          residence: selectedResidence,
          plannersByDay: plannersByDay
        };
      };

      if (fetchedRouteData && !error) {
          console.log(fetchedRouteData);
          const convertedData = convertFetchedData(fetchedRouteData);
          setResultRouteData(convertedData);
          console.log(convertedData);
      }

      else if (error) {
        console.error(error);
        alert("올바르지 않은 접근입니다.");
        navigate("/");
      }
    }, [fetchedRouteData, error, selectedResidence, setResultRouteData, navigate]
  );

  useEffect(
    () => {
      if (resultRouteData)
        console.log(resultRouteData);
    },
    [resultRouteData]
  )

  return (
    <div className="result-route-container">
      <ContentTemplate>
        {!resultRouteData ? (
          <p>Loading...</p>
        ) : (
          <RouteComponent route={resultRouteData} />
        )}
      </ContentTemplate>
    </div>
  );
};

export default ResultRoute;