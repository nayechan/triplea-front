import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router
import NewContentTemplate from 'components/NewContentsTemplate';
import { useRouteData } from 'contexts/RouteDataContext'

const RouteDetail = () => {
  const { routeData } = useRouteData();
  const navigate = useNavigate();

  console.log("Route data changed:", routeData);

    useEffect(() => {
      handleRouteData();
    }, [routeData, navigate]);

    const handleRouteData = () => {
      if (!routeData) {
        navigate('/resultRoute');
      }
    };

  return (
    <div className="route-detail-container">
      {routeData && (
        <NewContentTemplate>
          {routeData.number}
        </NewContentTemplate>
      )}
    </div>
  );

}
export default RouteDetail;