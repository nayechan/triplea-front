import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchRouteData = (region, period, strength, residence) => {
  const [fetchedRouteData, setFetchedRouteData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const numStrength = strength === "weak" ? 2 :
      strength === "normal" ? 3 :
        strength === "hard" ? 4 :
          0;

    const fetchRouteData = async () => {
      try {
        const requestBody = ({
          area: region,
          day: `${period}`,
          strength: `${numStrength}`,
          accommodationName: residence?.name,
          accomodate_latitude: residence?.latitude,
          accomodate_longitude: residence?.longitude
        });


        console.log(requestBody);

        const response = await axios.get('http://localhost:8080/api/planners', {
          params: requestBody
        });

        let responseDict = [];

        response.data.forEach(route => {
          responseDict[route.number] = route;
        });

        const processedResponseData = responseDict;

        setFetchedRouteData(processedResponseData);
        console.log(`Response : ${processedResponseData}`);

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching route data:', error);
        setIsLoading(false);
      }
    };

    fetchRouteData();

  }, [region, period, strength, residence]);

  return { fetchedRouteData, isLoading };
};

export default useFetchRouteData;
