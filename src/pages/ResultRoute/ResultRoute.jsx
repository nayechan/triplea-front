import React, { useEffect, useState } from 'react';

import useFetchRouteData from 'hooks/api/FetchRouteData'; // Import the custom hook

import ContentTemplate from 'components/ContentsTemplate';
import RouteComponent from 'components/ResultRoute/RouteComponent';

import { useRouteData } from 'contexts/RouteDataContext'
import { useSelectedRegionContext } from 'contexts/SelectedRegionContext';
import { useSelectedPeriodContext } from 'contexts/SelectedPeriodContext';
import { useSelectedStrengthContext } from 'contexts/SelectedStrengthContext';



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
  const { selectedRouteIndex, selectRouteIndex } = useRouteData();

  const { selectedRegion } = useSelectedRegionContext();
  const { selectedPeriod } = useSelectedPeriodContext();
  const { selectedStrength } = useSelectedStrengthContext();
  const { routeData, setRouteData } = useRouteData();

  const { fetchedRouteData, isLoading } = useFetchRouteData(selectedRegion, selectedPeriod, selectedStrength);

  useEffect(
    ()=>{
      if(fetchedRouteData)
      {
        setRouteData(fetchedRouteData);
      }
    },
    [fetchedRouteData, setRouteData]
  )

  return (
    <div className="result-route-container">
      <ContentTemplate>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          routeData.map((route) => (
            <RouteComponent route={route} key={route.number} />
          ))
        )}
      </ContentTemplate>
    </div>
  );
};

export default ResultRoute;