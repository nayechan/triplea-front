import React, { useState, useEffect } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useSelectedResidenceContext } from 'contexts/SelectedResidenceContext';
import { useSelectedRegionContext } from 'contexts/SelectedRegionContext';
import ContentTemplate from 'components/ContentsTemplate';
import LinkedButton from 'components/LinkedButton';
import BackButton from 'components/BackButton';
import { FiSearch } from "react-icons/fi";
import 'styles/Residence/Residence.css';

const { kakao } = window;

const Residence = () => {
    const { setSelectedResidence } = useSelectedResidenceContext();
    const { selectedRegion } = useSelectedRegionContext();
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [searchedInput, setSearchedInput] = useState('');
    const [cityCenter, setCityCenter] = useState({ lat: 37.5665, lng: 126.9780 });
    const [searchResults, setSearchResults] = useState([]);

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

        const geocoder = new kakao.maps.services.Geocoder();

        geocoder.coord2Address(longitude, latitude, (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
                const address = result[0].address.address_name;
                const road_address = result[0].road_address?.address_name;

                let name = road_address || address;

                const ps = new kakao.maps.services.Places();
                ps.keywordSearch(name, (data, status) => {
                    if (status === kakao.maps.services.Status.OK) {
                        name = data[0].place_name;
                        setSelectedLocation({ latitude, longitude, name: name });
                        console.log(`${latitude}, ${longitude}, ${name} selected`);
                    } else {
                        setSelectedLocation({ latitude, longitude, name: null });
                        console.log(`${latitude}, ${longitude}, null selected`);
                        //console.error('Failed to search for location name');
                    }
                });
            } else {
                console.log(`${latitude}, ${longitude}, null selected`);
                //console.error('Failed to convert coordinates to address');
            }
        });
    };

    const onInputChange = (e) => {
        setSearchedInput(e.target.value);
    };

    const handleSearchIconClick = (e) => {
        e.preventDefault();
        setSearchResults([]);
        const ps = new kakao.maps.services.Places();

        ps.keywordSearch(searchedInput, (data, status) => {
            if (status === kakao.maps.services.Status.OK) {
                const results = data.map(item => {
                    return {
                        latitude: item.y,
                        longitude: item.x,
                        name: item.place_name,
                        address: item.road_address_name || item.address_name || null
                    };
                });
                setSearchResults(results.slice(0, 3));
                if (results.length > 0) {
                    const { latitude, longitude } = results[0];
                    setCityCenter({ lat: latitude, lng: longitude });
                }
                console.log("Search Results:", results);
            } else {
                console.error('Failed to search for location name');
            }
        });

    };

    const handleResultClick = (result) => {
        setSelectedLocation(result.latitude, result.longitude, result.name);
        setCityCenter({ lat: result.latitude, lng: result.longitude });
        console.log(`${result.latitude}, ${result.longitude}, ${result.name} selected`);
        setSearchedInput('');
        setSearchResults([]);
    };

    const handleNextButtonClick = () => {
        if (selectedLocation) {
            setSelectedResidence(selectedLocation);
            console.log(`${selectedLocation.latitude}, ${selectedLocation.longitude}, ${selectedLocation.name || ''}last selected`);
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
                        {selectedLocation && (
                            <div className="marker-info">
                                {selectedLocation.name}
                            </div>
                        )}
                    </div>
                    <Map
                        center={cityCenter}
                        style={{ position: 'relative', width: '100%', height: '410px' }}
                        level={5}
                        onClick={handleMarkerClick}
                    >
                        {selectedLocation && (
                            <MapMarker
                                position={{ lat: selectedLocation.latitude, lng: selectedLocation.longitude }}
                            />
                        )}
                        {searchResults.map((result, index) => (
                            <MapMarker
                                key={index}
                                position={{ lat: result.latitude, lng: result.longitude }}
                            />
                        ))}
                    </Map>
                    <form className="residence-search" onSubmit={handleSearchIconClick}>
                        <div className="search-container">
                            <input className="search-input" onChange={onInputChange} value={searchedInput} placeholder="장소를 검색하세요" />
                            <button type="submit" className="search-button">
                                <FiSearch size={20} />
                            </button>
                            <div className="search-results">
                                {searchResults.map((result, index) => (
                                    <div key={index} className="search-result" onClick={() => handleResultClick(result)}>
                                        {result.name}
                                        <span style={{fontSize: '0.8rem'}}>{result.address}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </form>
                </div>
                <div className="residence-buttons">
                    <BackButton />
                    <LinkedButton to="/resultRoute" onClick={handleNextButtonClick}>다음</LinkedButton>
                </div>
            </ContentTemplate>
        </div>
    );
};

export default Residence;
