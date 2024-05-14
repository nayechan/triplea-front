import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchRouteData = (region, period, strength, residence) => {
  const [fetchedRouteData, setFetchedRouteData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        if (region === "" || period === "" || strength === "" || !residence) {
          throw new Error('Blank parameter');
        }

        const numStrength = strength === "weak" ? 2 :
          strength === "normal" ? 3 :
            strength === "hard" ? 4 :
              0;

        const requestBody = ({
          area: region,
          day: `${period}`,
          strength: `${numStrength}`,
          accommodationName: residence?.name,
          accommodate_latitude: residence?.latitude,
          accommodate_longitude: residence?.longitude
        });

        const response = await axios.get('http://52.62.34.185:8080/api/planners', {
          params: requestBody
        });

        setFetchedRouteData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching route data:', error);
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [region, period, strength, residence]);

  return { fetchedRouteData, isLoading, error }; // Return error state
};

export default useFetchRouteData;
