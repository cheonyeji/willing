import { useRecoilValue } from "recoil";
import NewToDo from "../components/toDo/NewToDo";
import ToDos from "../components/toDo/ToDos";
import { isSameDate, selectedDateState } from "../models/atoms";
import { styled } from "styled-components";

type ToDoPageProps = { className: string };

function ToDoPage(props: ToDoPageProps) {
  const selectedDate = useRecoilValue(selectedDateState);
  const dateString = isSameDate(selectedDate, new Date())
    ? "오늘의 할일"
    : selectedDate.toLocaleDateString("ko-KR", {
        // year: "numeric",
        month: "long",
        day: "numeric",
      });

  return (
    <div className={props.className}>
      <DateH2>{dateString}</DateH2>
      <NewToDo />
      <ToDos />
    </div>
  );
}

export default ToDoPage;

const DateH2 = styled.h2`
  font-size: 20px;
  font-weight: 600;
  line-height: 27px;
  text-align: left;
`;
