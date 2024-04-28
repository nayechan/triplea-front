import React, { useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useSelectedResidenceContext } from 'contexts/SelectedResidenceContext';
import ContentTemplate from 'components/ContentsTemplate';
import LinkedButton from 'components/LinkedButton';
import BackButton from 'components/BackButton';
import 'styles/Residence/Residence.css';


const Residence = () => {
    const { setSelectedResidence } = useSelectedResidenceContext();
    const [selectedLocation, setSelectedLocation] = useState(null);

    const handleMarkerClick = (map, mouseEvent) => {
        const latLng = mouseEvent.latLng;
        const latitude = latLng.getLat();
        const longitude = latLng.getLng();
        const name = prompt("이 위치의 이름을 입력하세요(스킵가능):");
        setSelectedLocation({ latitude, longitude, name });
        console.log(`${latitude}, ${longitude}, ${name} selected`);
    };

    const handleNextButtonClick = () => {
        if (selectedLocation) {
            setSelectedResidence(selectedLocation);
            console.log(`${selectedLocation.latitude}, ${selectedLocation.longitude}, ${selectedLocation.name} selected`);
        } else {
            console.log("No location selected");
        }
    };

    return (
        <div className="residence-container">
            <ContentTemplate>
                <div className="residence-contents">
                    <div className="residence-top">
                        <h1>숙소정보를 입력하세요. <span>(스킵가능)</span></h1>
                    </div>
                    <Map
                        center={{ lat: 37.5665, lng: 126.9780 }} // 서울 시청을 중심으로 지도를 띄웁니다.
                        style={{ width: '100%', height: '420px'}} // 지도 크기
                        level={3} // 지도 확대 레벨
                        onClick={handleMarkerClick} // 지도를 클릭하면 handleMarkerClick 함수를 실행합니다.
                    >
                        {selectedLocation && (
                            <MapMarker
                                position={{ lat: selectedLocation.latitude, lng: selectedLocation.longitude }}
                            />
                        )}
                    </Map>
                </div>
                <div className="residence-buttons">
                    <BackButton />
                    <LinkedButton to="/resultRoute" onClick={handleNextButtonClick}>다음</LinkedButton>
                </div>
            </ContentTemplate>
        </div>
    )

};

export default Residence;
