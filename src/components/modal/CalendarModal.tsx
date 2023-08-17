import { styled } from "styled-components";
import ShowCalendar from "../calendar/ShowCalendar";
import Modal from "../UI/Modal";

function CalendarModal() {
  return (
    <Modal>
      <Wrapper>
        <ShowCalendar />
      </Wrapper>
    </Modal>
  );
}

export default CalendarModal;

const Wrapper = styled.div`
  background-color: #ffffff;
`;
