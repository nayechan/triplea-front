import React, { useEffect, useState } from 'react';

import useFetchRouteData from 'hooks/api/FetchRouteData'; // Import the custom hook

import ContentTemplate from 'components/ContentsTemplate';
import RouteComponent from 'components/ResultRoute/RouteComponent';

import { useResultRouteData } from 'contexts/ResultRouteDataContext'
import { useSelectedRegionContext } from 'contexts/SelectedRegionContext';
import { useSelectedPeriodContext } from 'contexts/SelectedPeriodContext';
import { useSelectedStrengthContext } from 'contexts/SelectedStrengthContext';
import { useSelectedResidenceContext } from 'contexts/SelectedResidenceContext';
import { result } from 'lodash';


const routes = []
/*  {
    "number": 0,
    "planners": [
      {
        "order": 1,
        "day": 1,
        "touristDestinationName": "string",
        "latitude": 0,
        "longitude": 0
      },

      {
        "order": 2,
        "day": 1,
        "touristDestinationName": "Destination B",
        "latitude": 34.0522,
        "longitude": -118.2437
      },
      {
        "order": 3,
        "day": 1,
        "touristDestinationName": "Destination 3",
        "latitude": 4,
        "longitude": 3
      },
      {
        "order": 4,
        "day": 2,
        "touristDestinationName": "Destination 4",
        "latitude": 5,
        "longitude": 6
      },
      {
        "order": 5,
        "day": 3,
        "touristDestinationName": "Destination 5",
        "latitude": 7,
        "longitude": 8
      },
      {
        "order": 6,
        "day": 3,
        "touristDestinationName": "Destination 6",
        "latitude": 9,
        "longitude": 10
      },
      {
        "order": 7,
        "day": 4,
        "touristDestinationName": "Destination 7",
        "latitude": 11,
        "longitude": 12
      },
      {
        "order": 8,
        "day": 4,
        "touristDestinationName": "Destination 8",
        "latitude": 13,
        "longitude": 14
      }
    ]
  },
  {
    "number": 1,
    "planners": [
      {
        "order": 1,
        "day": 1,
        "touristDestinationName": "string",
        "latitude": 0,
        "longitude": 0
      },

      {
        "order": 2,
        "day": 1,
        "touristDestinationName": "Destination B",
        "latitude": 34.0522,
        "longitude": -118.2437
      },
      {
        "order": 3,
        "day": 1,
        "touristDestinationName": "Destination 3",
        "latitude": 4,
        "longitude": 3
      },
      {
        "order": 4,
        "day": 2,
        "touristDestinationName": "Destination 4",
        "latitude": 5,
        "longitude": 6
      },
      {
        "order": 5,
        "day": 3,
        "touristDestinationName": "Destination 5",
        "latitude": 7,
        "longitude": 8
      },
      {
        "order": 6,
        "day": 3,
        "touristDestinationName": "Destination 6",
        "latitude": 9,
        "longitude": 10
      },
      {
        "order": 7,
        "day": 4,
        "touristDestinationName": "Destination 7",
        "latitude": 11,
        "longitude": 12
      },
      {
        "order": 8,
        "day": 4,
        "touristDestinationName": "Destination 8",
        "latitude": 13,
        "longitude": 14
      }
    ]
  }
];
*/

const ResultRoute = () => {

  const { selectedRegion } = useSelectedRegionContext();
  const { selectedPeriod } = useSelectedPeriodContext();
  const { selectedStrength } = useSelectedStrengthContext();
  const { selectedResidence } = useSelectedResidenceContext();

  const { resultRouteData, setResultRouteData } = useResultRouteData();
  const { fetchedRouteData, isLoading } = useFetchRouteData(selectedRegion, selectedPeriod, selectedStrength, selectedResidence);

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
          plannersByDay: plannersByDay
        };
      };

      if (fetchedRouteData) {
        console.log(fetchedRouteData);
        const convertedData = convertFetchedData(fetchedRouteData);
        setResultRouteData(convertedData);
        console.log(convertedData);
      }
    },
    [fetchedRouteData]
  );

  useEffect(
    ()=>{
      if(resultRouteData)
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