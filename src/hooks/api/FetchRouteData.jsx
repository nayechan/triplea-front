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
        if (region === "" || period === "" || strength === "") {
          throw new Error('Blank parameter');
        }

        let numStrength;
        switch (strength) {
          case "normal":
            numStrength = 3;
            break;
          case "hard":
            numStrength = 4;
            break;
          default:
            numStrength = 3;
            break;
        }

        let requestBody;
        if (residence) {
          requestBody = ({
            area: region,
            day: `${period}`,
            strength: `${numStrength}`,
            accommodationName: residence?.name,
            accommodate_latitude: residence?.latitude,
            accommodate_longitude: residence?.longitude
          });

        }
        else {
          requestBody = ({
            area: region,
            day: `${period}`,
            strength: `${numStrength}`,
            accommodationName: ''
          });
        }

        const response = await axios.get('http://52.62.34.185:8080/api/planners', {
          params: requestBody
        });

        setFetchedRouteData(response.data);
        console.log(`${strength} : ${numStrength}`);
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
