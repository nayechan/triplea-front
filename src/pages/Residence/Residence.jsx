import React, { useState, useEffect, useRef } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useSelectedResidenceContext } from 'contexts/SelectedResidenceContext';
import { useSelectedRegionContext } from 'contexts/SelectedRegionContext';
import ContentTemplate from 'components/ContentsTemplate';
import LinkedButton from 'components/LinkedButton';
import BackButton from 'components/BackButton';
import { FiSearch } from 'react-icons/fi';
import 'styles/Residence/Residence.css';

const { kakao } = window;

// 지역별 좌표 JSON 형식으로 정의
const regionCoordinates = {
  서울: { lat: 37.5535, lng: 126.9698 },
  부산: { lat: 35.1154, lng: 129.0413 },
  대구: { lat: 35.8722, lng: 128.5961 },
  인천: { lat: 37.4486, lng: 126.7052 },
  광주: { lat: 35.1605, lng: 126.8515 },
  대전: { lat: 36.3326, lng: 127.4344 },
  울산: { lat: 35.5381, lng: 129.3114 },
  세종: { lat: 36.5115, lng: 127.2469 },
  경기: { lat: 37.2753, lng: 127.0005 },
  강원: { lat: 37.3425, lng: 127.9209 },
  충북: { lat: 36.6292, lng: 127.4477 },
  충남: { lat: 36.8105, lng: 127.1464 },
  전북: { lat: 35.8405, lng: 127.1322 },
  전남: { lat: 34.7554, lng: 127.744 },
  경북: { lat: 36.0371, lng: 129.3652 },
  경남: { lat: 35.2277, lng: 128.6812 },
  제주: { lat: 33.5104, lng: 126.5218 },
};

const Residence = () => {
  const { setSelectedResidence } = useSelectedResidenceContext();
  const { selectedRegion } = useSelectedRegionContext();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchedInput, setSearchedInput] = useState('');
  const [cityCenter, setCityCenter] = useState({ lat: 37.5665, lng: 126.9780 });
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchInputRef = useRef(null);

  useEffect(() => {
    setCityCenter(regionCoordinates[selectedRegion] || { lat: 37.5665, lng: 126.9780 });
  }, [selectedRegion]);

  const handleMarkerClick = (map, mouseEvent) => {
    setSearchResults([]);
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
            setSelectedLocation({ latitude, longitude, name: name, address: address });
            console.log(`${latitude}, ${longitude}, ${name} selected`);
            searchInputRef.current.blur(); // 마커를 클릭하면 검색창 포커스 제거
          } else {
            //setSelectedLocation({ latitude, longitude, name: null });
            console.log(`${latitude}, ${longitude}, null selected`);
            alert("해당사항 없음");
          }
        });
      } else {
        console.log(`${latitude}, ${longitude}, null selected`);
      }
    });
  };

  const onInputChange = (e) => {
    setSearchedInput(e.target.value);
  };

  const handleSearchIconClick = (e) => {
    e.preventDefault();
    setSearchResults([]);
    setSelectedLocation('');
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
        setSearchResults(results.slice(0, 10));
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
    setSelectedLocation({ latitude: result.latitude, longitude: result.longitude, name: result.name, address: result.address });
    setCityCenter({ lat: result.latitude, lng: result.longitude });
    setSearchResults([]);
    setSearchedInput('');
    console.log(`${result.latitude}, ${result.longitude}, ${result.name} selected`);
  };
  
  const handleNextButtonClick = () => {
    if (selectedLocation) {
      setSelectedResidence(selectedLocation);
      console.log(`${selectedLocation.latitude}, ${selectedLocation.longitude}, ${selectedLocation.name || ''}last selected`);
    } else {
      console.log("No location selected");
    }
  };

  useEffect(() => {
    // 검색창 렌더링 후 포커스 주기
    if (isSearchFocused) {
      searchInputRef.current.focus();
    }
  }, [isSearchFocused]);

  return (
    <div className="residence-container">
      <ContentTemplate>
        <div className="residence-contents">
          <div className="residence-top">
            <h1>숙소정보를 입력하세요. <span>(스킵가능)</span></h1>
            {selectedLocation && (
              <div className="marker-info">
                {selectedLocation.name} <br/>
                {selectedLocation.address}
              </div>
            )}
          </div>
          <Map
            center={cityCenter}
            style={{ position: 'relative', width: '100%', height: '410px' }}
            level={5}
            onClick={handleMarkerClick}
            keyboardEvents
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
              <input
                className="search-input"
                onChange={onInputChange}
                value={searchedInput}
                placeholder="장소를 검색하세요"
                ref={searchInputRef}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              <button type="submit" className="search-button">
                <FiSearch size={20} />
              </button>
              <div className="search-results">
                <div className="search-results-container" style={{ overflowY: 'auto', maxHeight: '200px' }}>
                  {searchResults.map((result, index) => (
                    <div key={index} className="search-result" onClick={() => handleResultClick(result)}>
                      {result.name}
                      <span style={{ fontSize: '0.8rem' }}>{result.address}</span>
                    </div>
                  ))}
                </div>
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
