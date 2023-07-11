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

  // auto-scroll only in ToDos.tsx
  overflow-y: auto;

  // custom scrollbar
  &::-webkit-scrollbar {
    width: 8px; /* width of scrollbar */
  }
  &::-webkit-scrollbar-thumb {
    height: 30%; /* height of scrollbar */
    background: #6894d1; /* color of scollbar */
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    border-radius: 10px;
    background: rgba(33, 122, 244, 0.1); /* scrollbar background color*/
  }
`;
