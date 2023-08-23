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

  width: 364px;
  height: 380px;
  border-radius: 4px;
  .rdp {
    font-size: 14px;
    --rdp-cell-size: 3.3em;
    margin: 20px 20px;
  }

  .rdp-caption {
    margin-bottom: 10px;
    height: 80px;
  }

  .rdp-months {
    justify-content: center;
  }
  @media (max-width: 360px) {
    width: 280px;
    height: 296px;
    .rdp {
      font-size: 14px;
      --rdp-cell-size: 2.5em;
      margin: 20px 20px;
    }

    .rdp-caption {
      margin-bottom: 10px;
      height: 70px;
    }

    .rdp-months {
      justify-content: center;
    }
  }
`;
