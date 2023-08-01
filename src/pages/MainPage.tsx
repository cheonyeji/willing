import { DragDropContext, DropResult } from "react-beautiful-dnd";
import LeftSidePage from "./LeftSidePage";
import RightSidePage from "./RightSidePage";
import ToDoPage from "./ToDoPage";
import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  isDraggingState,
  isOverTrashCanState,
  toDosByDateSelector,
  toDosState,
} from "../models/atoms";
import { findSameId } from "../utils/RecoilFunctions";

type pageProps = { className: string };

function MainPage() {
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
        if (update.destination?.droppableId === "trashcan") {
          setIsOverTrashCan(true);
        } else {
          setIsOverTrashCan(false);
        }
      }}
    >
      <Wrapper>
        <LeftSidePageWrapper className="" />
        <ToDoPageWrapper className="" />
        <RightSidePageWrapper className="" />
      </Wrapper>
    </DragDropContext>
  );
}

export default MainPage;

const Wrapper = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: repeat(12, 1fr);
  gap: 30px;
  /* height:100vh; */
/* 배경 */
@media (max-width: 1200px) {
    display: flex;
    flex-direction: column;
    gap: 0;
   height:100%;

  }

`;

const ToDoPageWrapper = styled((props: pageProps) => <ToDoPage {...props} />)`
  margin: 30px 0;
  grid-column: 3/10;
  background-color: #ffffff;
  border-radius: 7px;
 
  /* 리스트 */
  @media (max-width:1200px) {
    
    flex-direction: column;
    height: 100vh; 
    
   margin-top: 30px;
   margin-bottom:0;
 
   margin-left: 30px;
    margin-right: 30px;
   
  }

  

  

`;
const RightSidePageWrapper = styled((props: pageProps) => (
  <RightSidePage {...props} />
))`
  margin: 0px 0;
  grid-column: 10/13;
  margin-right: 30px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
 

  /* 달력/채팅 */
  @media (max-width: 1200px) {
    margin-left: 30px;
    margin-right: 30px;
    flex-direction: column-reverse;
    
  }

`;

const LeftSidePageWrapper = styled((props: pageProps) => (
  <LeftSidePage {...props} />
))`
  background-color: #ffffff;
  grid-column: 1/3;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
 
  /* 프로필 */
  @media (max-width:1200px) {
    
    flex-direction: row;
    display: flex;
    height: 130px;
    /* align-items: center; */
    
    overflow-y:hidden;
    background-color:white;
    margin-left: 30px;
    margin-right: 30px;
     margin-top: 30px;
     border-radius: 7px;
}

  
 
`;
