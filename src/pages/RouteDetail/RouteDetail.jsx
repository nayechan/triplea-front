import React from 'react';
import NewContentTemplate from 'components/NewContentsTemplate';
import { useRouteData } from  'contexts/RouteDataContext'

const RouteDetail = () => {
    const { routeData } = useRouteData(); 
    console.log("Route data changed:", useRouteData());
    return (
        <div className="route-detail-container">
            <NewContentTemplate>
            </NewContentTemplate>
        </div>
    );
}
export default RouteDetail;