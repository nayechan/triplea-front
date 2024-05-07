import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchRouteData = (region, period, strength, residence) => {
  const [fetchedRouteData, setFetchedRouteData] = useState(null);
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
          accommodate_latitude: residence?.latitude,
          accommodate_longitude: residence?.longitude
        });


        console.log(requestBody);

        const response = await axios.get('http://localhost:8080/api/planners', {
          params: requestBody
        });

        console.log(response);

        setFetchedRouteData(response.data);

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