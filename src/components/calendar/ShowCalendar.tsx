import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
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

function ShowCalendar() {
  const [pickedDate, setPickedDate] = useState<Date>(new Date());
  const setselectedDateState = useSetRecoilState(selectedDateState);
  const handleDayClick = (day: Date) => {
    setPickedDate(day);
    setselectedDateState(day);
  };

  return (
    <div>
      <style>{css}</style>
      <DayPicker
        mode="single" // single day can be selected
        showOutsideDays // show outside dates
        weekStartsOn={1} // start Mon
        selected={pickedDate}
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
