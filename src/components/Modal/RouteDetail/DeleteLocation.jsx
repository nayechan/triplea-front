import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DefaultButton from 'components/DefaultButton';
import Modal from 'components/Modal/Modal';
import { useCurrentRouteData } from 'contexts/CurrentRouteDataContext';

// Styled components
const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

// DeleteLocation component
const DeleteLocation = ({ isopen, setIsopen, dayIndex, locationIndex }) => {
  const { currentRoute } = useCurrentRouteData();

  const confirmDelete = () => {
    currentRoute.plannersByDay[dayIndex].splice(locationIndex, 1);

    setIsopen(false); // Close the modal
  };

  return (
    <Modal isVisible={isopen} onClose={() => setIsopen(false)} width="500px" height="200px">
      <ModalWrapper>
        <h2>Delete Location</h2>
        <p>Are you sure you want to delete this location?</p>
        <ButtonContainer>
          <DefaultButton onClick={confirmDelete}>Confirm</DefaultButton>
          <DefaultButton onClick={() => setIsopen(false)}>Cancel</DefaultButton>
        </ButtonContainer>
      </ModalWrapper>
    </Modal>
  );
};

export default DeleteLocation;
