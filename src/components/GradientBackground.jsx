import React from 'react';

const GradientBackground = () => {
  const gradientStyle = {
    position: 'absolute',
    zIndex: '-1', // Push the background behind other content
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    background: 'linear-gradient(to bottom, #59A48F, #A0C2B7)',
    // Adjust other styles as needed
  };

  return (
    <div style={gradientStyle}>
      {/* Add any children components here */}
    </div>
  );
};

export default GradientBackground;