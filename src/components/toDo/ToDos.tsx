import { useRecoilValue } from "recoil";
import ToDoItem from "./ToDoItem";
import { toDosByDateSelector } from "../../models/atoms";
import { styled } from "styled-components";

function ToDos() {
  const toDosByDate = useRecoilValue(toDosByDateSelector);

  return (
    <DraggableUl>
      {toDosByDate.map((item) => (
        <ToDoItem key={item.id} item={item} />
      ))}
    </DraggableUl>
  );
}

export default ToDos;

const DraggableUl = styled.ul`
  // Allow drag only in todo list area
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  user-select: text;

  // remove list default css
  list-style: none;
  padding: 0;
`;
