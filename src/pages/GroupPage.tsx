import { styled } from "styled-components";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState, useSetRecoilState } from "recoil";

import Groups from "../components/group/Groups";
import NewGroup from "../components/group/NewGroup";
import {
  IGroup,
  groupsState,
  isOverCompletedState,
  selectedGroupIdState,
} from "../models/atoms";
import { findSameId } from "../utils/RecoilFunctions";

function GroupPage() {
  const [groups, setGroups] = useRecoilState(groupsState);
  const setSelectedGroupIdState = useSetRecoilState(selectedGroupIdState);
  const setIsOverCompleted = useSetRecoilState(isOverCompletedState);

  const changeSelectedGroupId = (groupId: number, groups: IGroup[]) => {
    setSelectedGroupIdState((prevGroupId) => {
      if (prevGroupId === groupId) {
        const targetIndex = groups.findIndex((group) => group.id === groupId);
        return targetIndex > 0 && groups[targetIndex - 1]!.id !== -1
          ? groups[targetIndex - 1]!.id
          : 0;
      } else {
        return prevGroupId;
      }
    });
  };

  const dragEndHandler = ({ destination, draggableId, source }: DropResult) => {
    setIsOverCompleted(false);

    if (!destination) return;

    setGroups((allGroups) => {
      const dedicatedGroup = { ...allGroups[0] };
      const sourceIndex = allGroups.findIndex((element) =>
        findSameId(element, +draggableId)
      );
      const moveGroup = { ...allGroups[sourceIndex] };

      const uncompletedGroups = allGroups.filter((group) => !group.completed);
      const completedGroups = allGroups.filter(
        (group) => group.completed && group.id !== -1
      );

      if (
        destination.droppableId !== source.droppableId &&
        +draggableId !== 0
      ) {
        moveGroup.completed =
          destination.droppableId === "uncompletedGroups" ? false : true;
      }

      if (source.droppableId === "uncompletedGroups") {
        uncompletedGroups.splice(source.index, 1);
      } else {
        completedGroups.splice(source.index, 1);
      }

      if (destination.droppableId === "uncompletedGroups") {
        uncompletedGroups.splice(destination.index, 0, moveGroup);
      } else {
        completedGroups.splice(destination.index, 0, moveGroup);
      }

      return [dedicatedGroup, ...uncompletedGroups, ...completedGroups];
    });

    // selectedGroupIdState 요소가 만약 현재 group id인 경우 배열 받아와서 이전 데이터로 설정 (groupId : 0인 요소는 삭제불가라 무조건 존재)
    if (
      destination.droppableId !== source.droppableId &&
      destination.droppableId === "completedGroups"
    ) {
      changeSelectedGroupId(+draggableId, groups);
    }
  };

  return (
    <DragDropContext
      onDragEnd={dragEndHandler}
      onDragUpdate={(update) => {
        if (update.destination?.droppableId === "completedGroups") {
          setIsOverCompleted(true);
        } else {
          setIsOverCompleted(false);
        }
      }}
    >
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
