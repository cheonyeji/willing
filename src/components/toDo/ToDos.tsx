import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import ToDoItem from "./ToDoItem";
import {
  selectedDateState,
  toDosByDateSelector,
  undoneToDosSelector,
} from "../../models/atoms";
import { styled } from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import IconPin from "../icons/IconPin";
import { isSameDate } from "../../utils/RecoilFunctions";
import SelectUndone from "./SelectUndone";

function ToDos() {
  const selectedDate = useRecoilValue(selectedDateState);
  const toDosByDate = useRecoilValue(toDosByDateSelector);
  const unpinnedToDos = toDosByDate.filter((toDo) => !toDo.pinned);
  const pinnedToDos = toDosByDate.filter((toDo) => toDo.pinned);
  const undoneToDos = useRecoilValue(undoneToDosSelector);

  const [isUlVisible, setIsUlVisible] = useState(false);

  useEffect(() => {
    if (undoneToDos.length === 0) {
      setIsUlVisible(false);
    }
  }, [undoneToDos.length]);

  const showUndoneToDos = isSameDate(selectedDate, new Date());
  return (
    <>
      {showUndoneToDos && (
        <Droppable droppableId="undoneTodos">
          {(provided) => (
            <Ul ref={provided.innerRef} {...provided.droppableProps}>
              {undoneToDos.length !== 0 && (
                <SelectUndone
                  isUlVisible={isUlVisible}
                  setIsUlVisible={setIsUlVisible}
                />
              )}
              {undoneToDos.length !== 0 &&
                isUlVisible &&
                undoneToDos.map((item, index) => (
                  <ToDoItem key={item.id} index={index} item={item} />
                ))}
              {undoneToDos.length !== 0 && <Hr />}
              {provided.placeholder}
            </Ul>
          )}
        </Droppable>
      )}

      <Droppable droppableId="pinnedTodos">
        {(provided) => (
          <Ul ref={provided.innerRef} {...provided.droppableProps}>
            {pinnedToDos.length !== 0 && (
              <PinnedTitle>
                {" "}
                <Icon>
                  <IconPin />
                </Icon>
                Pin
              </PinnedTitle>
            )}
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
  background: #00000011;
  height: 0.2px;
  border: 0;
`;

const UndoneTitle = styled.div``;

const PinnedTitle = styled.div`
  margin: 0 auto;
  width: 92%;
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
`;

const Icon = styled.div`
  padding-left: 10px;
  padding-right: 5px;
`;
