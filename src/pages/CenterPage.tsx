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
  toDosState,
  undoneToDosSelector,
} from "../models/atoms";
import { findSameId } from "../utils/RecoilFunctions";
import MemoModal from "../components/modal/MemoModal";
import CalendarModal from "../components/modal/CalendarModal";

type CenterPageProps = { className: string };

const UNDONE = "undoneTodos";
const TRASHCAN = "trashcan";
const UNPINNED = "unpinnedTodos";
const PINNED = "pinnedTodos";

function CenterPage(props: CenterPageProps) {
  const setTodos = useSetRecoilState(toDosState);
  const setIsDragging = useSetRecoilState(isDraggingState);
  const setIsOverTrashCan = useSetRecoilState(isOverTrashCanState);
  const undoneToDos = useRecoilValue(undoneToDosSelector);

  const dragEndHandler = ({ destination, draggableId, source }: DropResult) => {
    setIsDragging(false);
    setIsOverTrashCan(false);

    if (!destination) {
      return;
    }

    // 미래에서 -> 과거 할일로 옮기는 것 불가능
    if (destination.droppableId === UNDONE && source.droppableId !== UNDONE) {
      return;
    }

    if (destination.droppableId === TRASHCAN) {
      setTodos((allTodos) => {
        const copyTodos = [...allTodos];
        const sourceIndex = allTodos.findIndex((element) =>
          findSameId(element, +draggableId)
        );
        copyTodos.splice(sourceIndex, 1);
        return copyTodos;
      });
      return;
    }

    // 미완료된 할일 -> 오늘자로 미루기 기능
    if (source.droppableId === UNDONE && destination.droppableId !== UNDONE) {
      setTodos((allTodos) => {
        const unpinnedToDos = allTodos.filter((toDo) => !toDo.pinned);
        const pinnedToDos = allTodos.filter((toDo) => toDo.pinned);

        const sourceIndex = allTodos.findIndex((element) =>
          findSameId(element, +draggableId)
        );
        const moveTodo = { ...allTodos[sourceIndex] };

        if (moveTodo.pinned) {
          const sourceIndex = pinnedToDos.findIndex((element) =>
            findSameId(element, +draggableId)
          );
          pinnedToDos.splice(sourceIndex, 1);
        } else {
          const sourceIndex = unpinnedToDos.findIndex((element) =>
            findSameId(element, +draggableId)
          );
          unpinnedToDos.splice(sourceIndex, 1);
        }

        moveTodo.pinned = destination.droppableId === UNPINNED ? false : true;
        moveTodo.dueDate = new Date();

        if (destination.droppableId === UNPINNED) {
          unpinnedToDos.splice(destination.index, 0, moveTodo);
        } else if (destination.droppableId === PINNED) {
          pinnedToDos.splice(destination.index, 0, moveTodo);
        }
        return [...unpinnedToDos, ...pinnedToDos];
      });
      return;
    }

    // 미완료 내부에서 순서변경
    if (destination.droppableId === UNDONE && source.droppableId === UNDONE) {
      const moveTodo = { ...undoneToDos[source.index] };
      const sourceId = undoneToDos[source.index].id;
      const destId = undoneToDos[destination.index].id;

      setTodos((allTodos) => {
        const sourceIndex = allTodos.findIndex((element) =>
          findSameId(element, sourceId)
        );
        const destIndex = allTodos.findIndex((element) =>
          findSameId(element, destId)
        );
        const copyAllTodos = [...allTodos];

        copyAllTodos.splice(sourceIndex, 1);
        copyAllTodos.splice(destIndex, 0, moveTodo);
        return copyAllTodos;
      });

      return;
    }

    // 그 외의 경우
    setTodos((allTodos) => {
      const sourceIndex = allTodos.findIndex((element) =>
        findSameId(element, +draggableId)
      );

      const unpinnedToDos = allTodos.filter((toDo) => !toDo.pinned);
      const pinnedToDos = allTodos.filter((toDo) => toDo.pinned);

      const moveTodo = { ...allTodos[sourceIndex] };

      if (
        destination.droppableId !== source.droppableId &&
        destination.droppableId !== UNDONE
      ) {
        moveTodo.pinned = destination.droppableId === UNPINNED ? false : true;
      }

      if (source.droppableId === UNPINNED) {
        unpinnedToDos.splice(source.index, 1);
      } else if (source.droppableId === PINNED) {
        pinnedToDos.splice(source.index, 1);
      }

      if (destination.droppableId === UNPINNED) {
        unpinnedToDos.splice(destination.index, 0, moveTodo);
      } else if (destination.droppableId === PINNED) {
        pinnedToDos.splice(destination.index, 0, moveTodo);
      }

      return [...unpinnedToDos, ...pinnedToDos];
    });
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
          update.destination?.droppableId === TRASHCAN
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
  /* width: 100%; */

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
