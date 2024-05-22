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
        <h2>여행지 삭제</h2>
        <p>정말로 이 여행지를 경로에서 삭제하시겠습니까?</p>
        <ButtonContainer>
          <DefaultButton onClick={confirmDelete}>예</DefaultButton>
          <DefaultButton onClick={() => setIsopen(false)}>아니오</DefaultButton>
        </ButtonContainer>
      </ModalWrapper>
    </Modal>
  );
};

export default DeleteLocation;
