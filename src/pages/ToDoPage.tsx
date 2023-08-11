import { useRecoilValue, useSetRecoilState } from "recoil";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { styled } from "styled-components";

import ToDoHeader from "../components/toDo/ToDoHeader";
import NewToDo from "../components/toDo/NewToDo";
import ToDos from "../components/toDo/ToDos";
import FloatingTrashCan from "../components/toDo/FloatingTrashCan";
import {
  isDraggingState,
  isOverTrashCanState,
  toDosByDateSelector,
  toDosState,
} from "../models/atoms";
import { findSameId } from "../utils/RecoilFunctions";

type ToDoPageProps = { className: string };

function ToDoPage(props: ToDoPageProps) {
  const setTodos = useSetRecoilState(toDosState);
  const toDosByDate = useRecoilValue(toDosByDateSelector);
  const setIsDragging = useSetRecoilState(isDraggingState);
  const setIsOverTrashCan = useSetRecoilState(isOverTrashCanState);

  const dragEndHandler = ({ destination, draggableId }: DropResult) => {
    setIsDragging(false);
    setIsOverTrashCan(false);

    if (!destination) {
      return;
    }

    if (destination.droppableId === "todos") {
      setTodos((allTodos) => {
        const copyTodos = [...allTodos];
        const sourceIndex = allTodos.findIndex((element) =>
          findSameId(element, +draggableId)
        );
        const moveTodo = copyTodos[sourceIndex];
        const destinationIndex = allTodos.findIndex((element) =>
          findSameId(element, toDosByDate[destination.index].id)
        );
        copyTodos.splice(sourceIndex, 1);
        copyTodos.splice(destinationIndex, 0, moveTodo);

        return copyTodos;
      });
    } else if (destination.droppableId === "trashcan") {
      setTodos((allTodos) => {
        const copyTodos = [...allTodos];
        const sourceIndex = allTodos.findIndex((element) =>
          findSameId(element, +draggableId)
        );
        copyTodos.splice(sourceIndex, 1);

        return copyTodos;
      });
    }
  };

  return (
    <DragDropContext
      onDragEnd={dragEndHandler}
      onBeforeCapture={() => setIsDragging(true)}
      onDragUpdate={(update) => {
        update.destination?.droppableId === "trashcan"
          ? setIsOverTrashCan(true)
          : setIsOverTrashCan(false);
      }}
    >
      <Wrapper className={props.className}>
        <ToDoHeader />
        <NewToDo />
        <ToDos />
        <FloatingTrashCan />
      </Wrapper>
    </DragDropContext>
  );
}

export default ToDoPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  position: relative;
`;
