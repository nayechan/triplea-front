import React, { useEffect } from 'react';
import NewContentTemplate from 'components/NewContentsTemplate';
import RouteContent from 'components/ResultRoute/RouteContent';
import { useRouteData } from 'contexts/RouteDataContext'

const route = {
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
};

const ResultRoute = () => {
  const { routeData, setRouteData } = useRouteData();
  useEffect(()=>{
    // do stuff here...
    setRouteData(null);
  }, []) // <-- empty dependency array

  return (
      <div className="result-route-container">
        <NewContentTemplate>
          <RouteContent route={route} />
          <RouteContent route={route} />
        </NewContentTemplate>
      </div>
  )
}
export default ResultRoute;