import { keyframes, styled } from "styled-components";
import IconTrashCan from "../icons/IconTrashCan";
import { Droppable } from "react-beautiful-dnd";
import { useRecoilValue } from "recoil";
import { isDraggingState } from "../../models/atoms";

function FloatingTrashCan() {
  const isDragging = useRecoilValue(isDraggingState);
  return (
    <Droppable droppableId="trashcan">
      {(provided, snapshot) => (
        <IconWrapper
          isDraggingOver={snapshot.isDraggingOver}
          dragging={isDragging}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <IconTrashCan />
        </IconWrapper>
      )}
    </Droppable>
  );
}

export default FloatingTrashCan;

interface Idiv {
  dragging: boolean;
  isDraggingOver: boolean;
}

const fadeIn = keyframes`
  from {
    transform: scale(.95);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    transform: scale(1);
    opacity: 1;
  }
  
  to {
    transform: scale(.95);
    opacity: 0;
  }
`;

const IconWrapper = styled.div<Idiv>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  width: 3rem;
  height: 3rem;
  border-radius: 100rem 100rem 100rem 100rem;
  box-shadow: 0 0 0.5rem #c58072;
  z-index: 5;
  transition: visibility 0.2s;
  background-color: ${(props) =>
    props.isDraggingOver ? "#e67a68" : "#ea9688"};
  visibility: ${(props) => (props.dragging ? "visible" : "hidden")};
  animation: ${(props) => (props.dragging ? fadeIn : fadeOut)} 0.2s;
`;
