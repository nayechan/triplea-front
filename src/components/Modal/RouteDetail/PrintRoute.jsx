import { React, useRef } from 'react';
import styled from 'styled-components';
import DefaultButton from 'components/DefaultButton';
import Modal from 'components/Modal/Modal';
import RouteMap from 'components/RouteDetail/RouteMap'; // Import the RouteMap component
import { useReactToPrint } from 'react-to-print';
import { useCurrentRouteData } from 'contexts/CurrentRouteDataContext';

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  overflow-y: auto; /* Enable vertical scrolling */
  max-height: calc(100% - 100px); /* Adjust the maximum height as needed */
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const PrintButton = styled(DefaultButton)`
  background-color: #4caf50;
  color: white;
  margin-right: 10px;
`;

// Define styled component for day section
const DaySection = styled.div`
  page-break-after: always;
`;

const PrintRoute = ({ isopen, setIsopen }) => {
  const { currentRoute } = useCurrentRouteData();
  const printRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  return (
    <Modal isVisible={isopen} onClose={() => setIsopen(false)} width="1000px" height="700px">
      <ModalWrapper>
        <h2>출력 미리보기</h2>

        <ContentWrapper ref={printRef}>
          {/* Route list section */}
          <div>
            {/* Display route name */}
            <h3>{currentRoute.name}</h3>

            {/* Display residence location */}
            {currentRoute.residence && (
              <div>
                <h4>숙소</h4>
                <p>{currentRoute.residence.name}</p>
              </div>
            )}

            {/* Display each day's route list */}
            {Object.entries(currentRoute.plannersByDay).map(([dayIndex, locations]) => (
              <DaySection key={dayIndex}>
                <h4>{dayIndex}일차</h4>
                <RouteMap 
                  route={{ residence: currentRoute.residence, plannersByDay: { [dayIndex]: locations } }} 
                  clickable={false}
                  draggable={false}
                  width={"600px"}
                  height={"500px"}
                />
                <ol>
                  {locations.map((location, index) => (
                    <li key={index}>{location.touristDestinationName}</li>
                  ))}
                </ol>
              </DaySection>
            ))}
          </div>

        </ContentWrapper>

        <ButtonContainer>
          <PrintButton onClick={handlePrint}>Print</PrintButton>
          <DefaultButton onClick={() => setIsopen(false)}>Close</DefaultButton>
        </ButtonContainer>
      </ModalWrapper>
    </Modal>
  );
};

export default PrintRoute;
