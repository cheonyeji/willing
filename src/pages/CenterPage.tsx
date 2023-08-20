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

  const dragEndHandler = ({ destination, draggableId, source }: DropResult) => {
    setIsDragging(false);
    setIsOverTrashCan(false);

    if (!destination) {
      return;
    }

    if (destination.droppableId === "trashcan") {
      setTodos((allTodos) => {
        const copyTodos = [...allTodos];
        const sourceIndex = allTodos.findIndex((element) =>
          findSameId(element, +draggableId)
        );
        copyTodos.splice(sourceIndex, 1);

        return copyTodos;
      });
    } else {
      setTodos((allTodos) => {
        const sourceIndex = allTodos.findIndex((element) =>
          findSameId(element, +draggableId)
        );

        const unpinnedToDos = allTodos.filter((toDo) => !toDo.pinned);
        const pinnedToDos = allTodos.filter((toDo) => toDo.pinned);

        const moveTodo = { ...allTodos[sourceIndex] };

        if (destination.droppableId !== source.droppableId) {
          moveTodo.pinned =
            destination.droppableId === "unpinnedTodos" ? false : true;
        }

        if (source.droppableId === "unpinnedTodos") {
          unpinnedToDos.splice(source.index, 1);
        } else {
          pinnedToDos.splice(source.index, 1);
        }

        if (destination.droppableId === "unpinnedTodos") {
          unpinnedToDos.splice(destination.index, 0, moveTodo);
        } else {
          pinnedToDos.splice(destination.index, 0, moveTodo);
        }

        return [...unpinnedToDos, ...pinnedToDos];
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
  flex-grow: 1;
`;
