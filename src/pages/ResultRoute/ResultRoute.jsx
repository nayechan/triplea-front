import React, { useEffect } from 'react';
import ContentTemplate from 'components/ContentsTemplate';
import RouteComponent from 'components/ResultRoute/RouteComponent';
import { useRouteData } from 'contexts/RouteDataContext'

import { useSelectedRegionContext } from 'contexts/SelectedRegionContext';
import { useSelectedPeriodContext } from 'contexts/SelectedPeriodContext';
import { useSelectedStrengthContext } from 'contexts/SelectedStrengthContext';

const routes = [
  {
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
;

const ResultRoute = () => {
  const { routeData, setRouteData } = useRouteData();

  const { selectedRegion } = useSelectedRegionContext();
  const { selectedPeriod } = useSelectedPeriodContext();
  const { selectedStrength } = useSelectedStrengthContext();

  useEffect(() => {
    // 선택된 데이터를 콘솔에 출력합니다.
    console.log("선택된 여행지역:", selectedRegion);
    console.log("선택된 여행기간:", selectedPeriod);
    console.log("선택된 여행강도:", selectedStrength);
  }, []);


  useEffect(() => {
    // do stuff here...
    setRouteData(null);
  }, []) // <-- empty dependency array

  return (
    <div className="result-route-container">
      <ContentTemplate>
        {
          routes.map((route) => (
            <RouteComponent route={route} />
          ))
        }
      </ContentTemplate>
    </div>
  )
}
export default ResultRoute;