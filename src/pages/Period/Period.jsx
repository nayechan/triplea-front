// period.js
import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from 'dayjs';
import { ko } from 'date-fns/locale';
import 'styles/Period/Period.css';
import LinkedButton from "components/LinkedButton";
import BackButton from "components/BackButton";
import ContentTemplate from "components/ContentsTemplate";

const CustomDatePicker = ({ startDate, endDate, onChange }) => {
    return (
        <DatePicker
            inline
            selected={startDate}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            monthsShown={2}
            onChange={onChange}
            minDate={new Date(2023, 0, 1)}
            maxDate={new Date(2100, 11, 31)}
            locale={ko}
        />
    );
};
const formatDateRangeAndDifference = (start, end) => {
    if (start && end) {
        const formattedStartDate = dayjs(start).format('YYYY.MM.DD');
        const formattedEndDate = dayjs(end).format('YYYY.MM.DD');
        const differenceInDays = dayjs(end).diff(dayjs(start), 'day') + 1;
        return {
            formattedStartDate,
            formattedEndDate,
            differenceInDays,
        };
    }
    return null;
};


const Period = () => {
    const location = useLocation();

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const dateDifference = formatDateRangeAndDifference(startDate, endDate);

    const handleNextButtonClick = () => {
        if (!dateDifference) {
            alert("여행 기간을 선택해주세요.");
            return;
        }
        console.log(`${dateDifference.differenceInDays}일 last selected`);
    }

    const handlePeriodSelect = () => {
        if (dayjs(startDate).isValid() && dayjs(endDate).isValid()) {
            console.log(`${dayjs(startDate).format('YYYY.MM.DD')} ~ ${dayjs(endDate).format('YYYY.MM.DD')} selected`);
        }
    }

    useEffect(() => {
        if (dayjs(startDate).isValid() && dayjs(endDate).isValid()) {
            handlePeriodSelect(); // startDate 또는 endDate가 변경될 때마다 실행
        }
    }, [startDate, endDate]);

    return (
        <div className="period-container">
            <ContentTemplate>
                <div className="period-contents">
                    <div className="period-top">
                        <h1>여행 기간을 선택해주세요.</h1>
                        <div>
                            {dateDifference && (
                                <>
                                    {`[${dateDifference.formattedStartDate} ~ ${dateDifference.formattedEndDate}]`}
                                    {` `}
                                    {` 총 ${dateDifference.differenceInDays - 1}박 ${dateDifference.differenceInDays}일  `}

                                </>
                            )}
                        </div>
                    </div>
                    <div className="calendar-wrapper">
                        <CustomDatePicker
                            startDate={startDate}
                            endDate={endDate}
                            onChange={(dates) => {
                                const [start, end] = dates;
                                setStartDate(start);
                                if (!endDate) { // endDate가 null인 경우에만 handlePeriodSelect 호출
                                    handlePeriodSelect();
                                }
                                setEndDate(end);
                            }}
                        />
                    </div>
                </div>
                <div className="period-buttons">
                    <BackButton />
                    <LinkedButton
                        to={{
                            pathname: dateDifference? "/strength": "/period",
                            search: dateDifference? 
                            `${location.search}&period=${dateDifference.differenceInDays}` : 
                            location.search
                        }}
                        onClick={handleNextButtonClick}
                    >
                        다음
                    </LinkedButton>
                </div>
            </ContentTemplate>
        </div>
    )
}

export default Period;
