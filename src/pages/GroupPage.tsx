import { styled } from "styled-components";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useSetRecoilState } from "recoil";

import Groups from "../components/group/Groups";
import NewGroup from "../components/group/NewGroup";
import { groupsState } from "../models/atoms";
import { findSameId } from "../utils/RecoilFunctions";

function GroupPage() {
  const setGroups = useSetRecoilState(groupsState);

  const dragEndHandler = ({ destination, draggableId, source }: DropResult) => {
    if (!destination) return;

    setGroups((allGroups) => {
      const newGroups = [...allGroups];
      const sourceIndex = allGroups.findIndex((element) =>
        findSameId(element, +draggableId)
      );
      const moveGroup = { ...newGroups[sourceIndex] };

      if (destination.droppableId !== source.droppableId) {
        moveGroup.completed =
          destination.droppableId === "uncompletedGroups" ? false : true;
      }

      const destinationIndex = allGroups.findIndex((element) =>
        findSameId(element, allGroups[destination.index].id)
      );
      newGroups.splice(sourceIndex, 1);
      newGroups.splice(destinationIndex, 0, moveGroup);
      return newGroups;
    });
  };

  return (
    <DragDropContext onDragEnd={dragEndHandler}>
      <Wrapper>
        <NewGroup />
        <Groups />
      </Wrapper>
    </DragDropContext>
  );
}

export default GroupPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  @media (max-width: 1200px) {
    flex-direction: column;
    display: flex;
  }
  @media (max-width: 768px) {
    flex-direction: row;
    display: flex;
  }
`;
