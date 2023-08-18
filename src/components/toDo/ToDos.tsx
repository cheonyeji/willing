import { useRecoilValue } from "recoil";
import ToDoItem from "./ToDoItem";
import { toDosByDateSelector } from "../../models/atoms";
import { styled } from "styled-components";
import { Droppable } from "react-beautiful-dnd";

function ToDos() {
  const toDosByDate = useRecoilValue(toDosByDateSelector);
  const unpinnedToDos = toDosByDate.filter((toDo) => !toDo.pinned);
  const pinnedToDos = toDosByDate.filter((toDo) => toDo.pinned);
  return (
    <>
      <Droppable droppableId="pinnedTodos">
        {(provided) => (
          <Ul ref={provided.innerRef} {...provided.droppableProps}>
            {pinnedToDos.length !== 0 && <PinnedTitle>Pinned</PinnedTitle>}
            {pinnedToDos.map((item, index) => (
              <ToDoItem key={item.id} index={index} item={item} />
            ))}
            {provided.placeholder}
          </Ul>
        )}
      </Droppable>
      <Droppable droppableId="unpinnedTodos">
        {(provided) => (
          <Ul ref={provided.innerRef} {...provided.droppableProps}>
            {pinnedToDos.length !== 0 && unpinnedToDos.length !== 0 && <Hr />}
            {unpinnedToDos.map((item, index) => (
              <ToDoItem key={item.id} index={index} item={item} />
            ))}
            {provided.placeholder}
          </Ul>
        )}
      </Droppable>
    </>
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

const Hr = styled.hr`
  width: 90%;
  margin: 0 auto;
  margin-bottom: 10px;
  background: #b0b0b0;
  height: 1px;
  border: 0;
`;

const PinnedTitle = styled.div``;
