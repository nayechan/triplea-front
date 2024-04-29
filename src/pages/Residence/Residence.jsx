import React, { useState, useEffect } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useSelectedResidenceContext } from 'contexts/SelectedResidenceContext';
import { useSelectedRegionContext } from 'contexts/SelectedRegionContext';
import ContentTemplate from 'components/ContentsTemplate';
import LinkedButton from 'components/LinkedButton';
import BackButton from 'components/BackButton';
import DaumPostcode from 'react-daum-postcode'; // react-daum-postcode 라이브러리 추가
import 'styles/Residence/Residence.css';

const Residence = () => {
    const { setSelectedResidence } = useSelectedResidenceContext();
    const { selectedRegion } = useSelectedRegionContext();
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [cityCenter, setCityCenter] = useState({ lat: 37.5665, lng: 126.9780 });
    const [searchAddress, setSearchAddress] = useState('');
    const [searchedLocation, setSearchedLocation] = useState(null);
    const [isAddressSearchVisible, setAddressSearchVisible] = useState(false);

    useEffect(() => {
        switch (selectedRegion) {
            case "서울":
                setCityCenter({ lat: 37.5535, lng: 126.9698 }); // 서울역 좌표로 설정
                break;
            case "부산":
                setCityCenter({ lat: 35.1154, lng: 129.0413 }); // 부산역 좌표로 설정
                break;
            case "대구":
                setCityCenter({ lat: 35.8722, lng: 128.5961 }); // 대구역 좌표로 설정
                break;
            case "인천":
                setCityCenter({ lat: 37.4486, lng: 126.7052 }); // 인천역 좌표로 설정
                break;
            case "광주":
                setCityCenter({ lat: 35.1605, lng: 126.8515 }); // 광주역 좌표로 설정
                break;
            case "대전":
                setCityCenter({ lat: 36.3326, lng: 127.4344 }); // 대전역 좌표로 설정
                break;
            case "울산":
                setCityCenter({ lat: 35.5381, lng: 129.3114 }); // 울산역 좌표로 설정
                break;
            case "세종":
                setCityCenter({ lat: 36.5115, lng: 127.2469 }); // 세종역 좌표로 설정
                break;
            case "경기":
                setCityCenter({ lat: 37.2753, lng: 127.0005 }); // 수원역 좌표로 설정
                break;
            case "강원":
                setCityCenter({ lat: 37.3425, lng: 127.9209 }); // 원주역 좌표로 설정
                break;
            case "충북":
                setCityCenter({ lat: 36.6292, lng: 127.4477 }); // 청주역 좌표로 설정
                break;
            case "충남":
                setCityCenter({ lat: 36.8105, lng: 127.1464 }); // 천안역 좌표로 설정
                break;
            case "전북":
                setCityCenter({ lat: 35.8405, lng: 127.1322 }); // 전주역 좌표로 설정
                break;
            case "전남":
                setCityCenter({ lat: 34.7554, lng: 127.744 }); // 여수역 좌표로 설정
                break;
            case "경북":
                setCityCenter({ lat: 36.0371, lng: 129.3652 }); // 포항역 좌표로 설정
                break;
            case "경남":
                setCityCenter({ lat: 35.2277, lng: 128.6812 }); // 창원역 좌표로 설정
                break;
            case "제주":
                setCityCenter({ lat: 33.5104, lng: 126.5218 }); // 제주역 좌표로 설정
                break;
            default:
                setCityCenter({ lat: 37.5665, lng: 126.9780 }); // 기본값으로 서울 중심으로 설정
                break;
        }
    }, [selectedRegion]);

    const handleMarkerClick = (map, mouseEvent) => {
        const latLng = mouseEvent.latLng;
        const latitude = latLng.getLat();
        const longitude = latLng.getLng();
        const name = prompt("이 위치의 이름을 입력하세요(스킵가능):");
        setSelectedLocation({ latitude, longitude, name });
        console.log(`${latitude}, ${longitude}, ${name} selected`);
    };

    const handleAddressSearch = () => {
        setAddressSearchVisible(true);
    };

    const handleComplete = (data) => {
        const { address, addressType, lat, lng } = data;
        setSearchedLocation({ address, addressType, latitude: lat, longitude: lng });
        setCityCenter({ lat: lat, lng: lng });
        setSelectedLocation({ latitude: lat, longitude: lng, name: address });
        console.log(`${lng}, ${lat}, ${address} selected`);
        setAddressSearchVisible(false);
    };
    
    

    const handleCloseAddressSearch = () => {
        setAddressSearchVisible(false);
    };

    const handleNextButtonClick = () => {
        if (selectedLocation || searchedLocation) {
            setSelectedResidence(selectedLocation || searchedLocation);
            console.log(`${(selectedLocation || searchedLocation).latitude}, ${(selectedLocation || searchedLocation).longitude}, ${(selectedLocation || searchedLocation).name || ''} selected`);
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
                        <button onClick={handleAddressSearch}>주소로 찾기</button>
                    </div>
                    <Map
                        center={cityCenter}
                        style={{ position: 'relative', width: '100%', height: '420px' }}
                        level={5}
                        onClick={handleMarkerClick}
                    >
                        {selectedLocation && (
                            <MapMarker
                                position={{ lat: selectedLocation.latitude, lng: selectedLocation.longitude }}
                            />
                        )}
                        {searchedLocation && (
                            <MapMarker
                                position={{ lat: searchedLocation.latitude, lng: searchedLocation.longitude }}
                            />
                        )}
                        {/* {isAddressSearchVisible && (
                            <div className="address-search">
                                <DaumPostcode
                                    onComplete={handleComplete}
                                    autoClose
                                    animation
                                    style={{ position: 'absolute', zIndex: 10000, border: '1px solid #e5e5e5', width: '400px', height: '400px', top: '250px', left: '590px' }}
                                />
                                <button className="close-btn" onClick={handleCloseAddressSearch} style={{ position: 'absolute', zIndex: 10000, width: '15px', top: '250px', right: '545px', padding: '0'}}>X</button>
                            </div>
                        )} */}

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
