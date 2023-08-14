import { useRecoilValue, useSetRecoilState } from "recoil";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { styled } from "styled-components";

import ToDoHeader from "../components/toDo/ToDoHeader";
import NewToDo from "../components/toDo/NewToDo";
import ToDos from "../components/toDo/ToDos";
import FloatingTrashCan from "../components/toDo/FloatingTrashCan";
import {
  isDraggingState,
  isModalShownState,
  isOverTrashCanState,
  toDosByDateSelector,
  toDosState,
} from "../models/atoms";
import { findSameId } from "../utils/RecoilFunctions";
import MemoModal from "../components/modal/MemoModal";
import CalendarModal from "../components/modal/CalendarModal";

type CenterPageProps = { className: string };

function CenterPage(props: CenterPageProps) {
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

  const isModalShown = useRecoilValue(isModalShownState);
  let content = <></>;
  if (isModalShown === 1) {
    content = <MemoModal />;
  } else if (isModalShown === 2) {
    content = <CalendarModal />;
  }
  return (
    <Wrap className={props.className}>
      <DragDropContext
        onDragEnd={dragEndHandler}
        onBeforeCapture={() => setIsDragging(true)}
        onDragUpdate={(update) => {
          update.destination?.droppableId === "trashcan"
            ? setIsOverTrashCan(true)
            : setIsOverTrashCan(false);
        }}
      >
        <Wrapper>
          <ToDoHeader />
          <NewToDo />
          <ToDos />
          <FloatingTrashCan />
        </Wrapper>
      </DragDropContext>
      {isModalShown !== 0 && content}
    </Wrap>
  );
}

export default CenterPage;

const Wrap = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  overflow-y: auto;
  position: relative;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  position: relative;
`;
