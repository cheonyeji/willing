import { useRecoilValue } from "recoil";
import ToDoItem from "./ToDoItem";
import { toDosByDateSelector } from "../../models/atoms";
import { styled } from "styled-components";
import { Droppable } from "react-beautiful-dnd";

function ToDos() {
  const toDosByDate = useRecoilValue(toDosByDateSelector);

  return (
    <Droppable droppableId="todos">
      {(provided) => (
        <Ul ref={provided.innerRef} {...provided.droppableProps}>
          {toDosByDate.map((item, index) => (
            <ToDoItem key={item.id} index={index} item={item} />
          ))}
          {provided.placeholder}
        </Ul>
      )}
    </Droppable>
  );
}

export default ToDos;

const Ul = styled.ul`
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
