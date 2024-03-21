import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Styled component for the content wrapper
const ContentWrapper = styled.div`
  padding: 20px; /* Adjust padding as needed */
  border-radius: 10px; /* Adjust border radius for rounded corners */
  background: #ffffff; /* Background color of the content component */
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); /* Shadow for a lifted effect */
`;

const Content = ({ children }) => {
  return <ContentWrapper>{children}</ContentWrapper>;
};

Content.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Content;