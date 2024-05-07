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
          accommodate_latitude: residence ? residence.latitude || null : null,
          accommodate_longitude: residence ? residence.longitude || null : null,
          accommodationName: residence ? residence.name|| null : null
        });
        console.log(requestBody);
        const response = await axios.get('http://localhost:8080/api/planners', {
          params: requestBody
        });
        // let responseDict = [];

        // response.data.forEach(route => {
        //   responseDict[route.number] = route;
        // });
        // const processedResponseData = responseDict;

        // setFetchedRouteData(processedResponseData);

        const plannersData = response.data.planners.map((planner, index) => ({
          number: index,
          planners: planner
        }));

        setFetchedRouteData(plannersData);

        console.log(`Response : ${plannersData}`);

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
