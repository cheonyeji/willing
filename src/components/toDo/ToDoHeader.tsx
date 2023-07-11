import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import { isSameDate, selectedDateState } from "../../models/atoms";
import IconYesterday from "../icons/IconYesterday";
import IconTomorrow from "../icons/IconTomorrow";

function ToDoHeader() {
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState);
  const dateString = isSameDate(selectedDate, new Date())
    ? "오늘의 할일"
    : selectedDate.toLocaleDateString("ko-KR", {
        // year: "numeric",
        month: "long",
        day: "numeric",
      });

  const moveYesterday = () => {
    setSelectedDate(
      (prevDate) =>
        new Date(
          prevDate.getFullYear(),
          prevDate.getMonth(),
          prevDate.getDate() - 1
        )
    );
  };
  const moveTomorrow = () => {
    setSelectedDate(
      (prevDate) =>
        new Date(
          prevDate.getFullYear(),
          prevDate.getMonth(),
          prevDate.getDate() + 1
        )
    );
  };

  return (
    <Wrapper>
      <IconWrapper>
        <IconYesterday onClick={moveYesterday} />
      </IconWrapper>
      <DateH2>{dateString}</DateH2>
      <IconWrapper>
        <IconTomorrow onClick={moveTomorrow} />
      </IconWrapper>
    </Wrapper>
  );
}

export default ToDoHeader;

const IconWrapper = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  margin: 30px 30px 0 30px;
`;

const DateH2 = styled.h2`
  font-size: 20px;
  font-weight: 600;
  line-height: 27px;
  text-align: left;
  padding: 8px 0;
`;
