import { useState } from 'react';
import { CustomOverlayMap } from 'react-kakao-maps-sdk';
import styled from 'styled-components';

const MarkerSVG = styled.svg`
  transition: fill 0.3s ease; /* Add transition effect to the fill color */
`;

const LocationMarker = ({ position, number, size, color, onClick }) => {
  const markerSize = size || 36; // Size of the marker
  const defaultColor = color || 'red'; // Default color is red
  const [hovered, setHovered] = useState(false);

  // Function to lighten color
  const lightenColor = (hex, percent) => {
    const num = parseInt(hex.replace("#", ""), 16);
    const amt = Math.round(percent * 255 / 100); // Adjust for contrast
    const R = (num >> 16) + amt;
    const B = ((num >> 8) & 0x00FF) + amt;
    const G = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 + (B < 255 ? (B < 1 ? 0 : B) : 255) * 0x100 + (G < 255 ? (G < 1 ? 0 : G) : 255)).toString(16).slice(1);
  };

  const markerColor = hovered ? lightenColor(defaultColor, 30) : defaultColor;

  return (
    <CustomOverlayMap position={position}>
      <MarkerSVG
        xmlns="http://www.w3.org/2000/svg"
        width={markerSize}
        height={markerSize}
        viewBox={`0 0 ${markerSize} ${markerSize}`}
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ cursor: 'pointer' }}
      >
        {/* Shadow for the triangle */}
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
          <feOffset in="blur" dx="2" dy="2" result="offOut" />
          <feBlend in="SourceGraphic" in2="offOut" mode="normal" />
        </filter>

        {/* Inverted equilateral triangle with shadow */}
        <polygon
          points={`${markerSize * 0.1},${markerSize / 6} ${markerSize * 0.9},${markerSize / 6} ${markerSize / 2},${markerSize * 5 / 6}`}
          fill={markerColor}
          filter="url(#shadow)"
        />

        {/* Number inside the triangle with shadow effect */}
        <text
          x={markerSize / 2}
          y={markerSize / 2 - 1} // Adjust Y position for better alignment
          textAnchor="middle"
          fill="white"
          fontSize="11"
          fontWeight="bold"
          filter="url(#shadow)"
          dominantBaseline="middle"
          style={{ userSelect: 'none' }} // Disable text selection
        >
          {number}
        </text>
      </MarkerSVG>
    </CustomOverlayMap>
  );
};

export default LocationMarker;
