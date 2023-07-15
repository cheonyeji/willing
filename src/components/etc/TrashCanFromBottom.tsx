import { styled } from "styled-components";
import IconTrashCan from "../icons/IconTrashCan";
import { Droppable } from "react-beautiful-dnd";
import { useRecoilValue } from "recoil";
import { isDraggingState } from "../../models/atoms";

function TrashCanFromBottom() {
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

export default TrashCanFromBottom;

interface Idiv {
  dragging: boolean;
  isDraggingOver: boolean;
}
const IconWrapper = styled.div<Idiv>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: -4.15rem;
  left: calc(50vw - 3.75rem);
  width: 7.5rem;
  height: 3.75rem;
  border-radius: 100rem 100rem 0 0;
  box-shadow: 0 -0.1rem 0.4rem #c58072;
  z-index: 5;
  transition: transform 0.2s;
  background-color: ${(props) =>
    props.isDraggingOver ? "#e67a68" : "#ea9688"};
  transform: ${(props) => (props.dragging ? "translateY(-4.15rem)" : "")};
`;
