import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchInfoImage = (keyword) => {
  const [fetchedInfoImage, setFetchedInfoImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (keyword !== "") {
      setIsLoading(true);

      const fetchInfoImage = async () => {
        try {
          const requestBody = ({
            keyword: keyword
          });

          console.log(requestBody);

          const response = await axios.get('http://localhost:8080/api/getImageSource', {
            params: requestBody
          });

          console.log(response);

          setFetchedInfoImage(response.data.url);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching route data:', error);
          setIsLoading(false);
        }
      };
      fetchInfoImage();
    }
  }, [keyword]);

  return { fetchedInfoImage, isLoading };
};

export default useFetchInfoImage;