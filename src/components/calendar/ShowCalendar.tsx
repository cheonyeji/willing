import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { DayPicker } from "react-day-picker";
import "./calendar.css";
import { selectedDateState } from "../../models/atoms";

const css = `
  .my-selected {
    background-color: #ABCBFC;
    border-radius: 20%;
    color: white;
  }
  .my-selected:hover:not([disabled]) { 
    color: black;
  }
  .my-outside {
    color: #ABCBFC;
  }
`;

type ShowCalendarProps = { className?: string };

function ShowCalendar(props: ShowCalendarProps) {
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState);
  const handleDayClick = (day: Date) => {
    setSelectedDate(day);
  };

  return (
    <div className={props.className}>
      <style>{css}</style>
      <DayPicker
        mode="single" // single day can be selected
        weekStartsOn={1} // start Mon
        selected={selectedDate}
        onDayClick={handleDayClick} // custom day select handler
        // for CSS
        modifiersClassNames={{
          selected: "my-selected",
          outside: "my-outside",
        }}
      />
    </div>
  );
}

export default ShowCalendar;
