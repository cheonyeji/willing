import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { styled } from "styled-components";

import GroupItem from "./GroupItem";
import { groupsState } from "../../models/atoms";
import { Droppable } from "react-beautiful-dnd";
import SelectCompleted from "./SelectCompleted";

function Groups() {
  const groups = useRecoilValue(groupsState);
  const [isUlVisible, setIsUlVisible] = useState(false);

  const uncompletedGroups = groups.filter((group) => !group.completed);
  const completedGroups = groups.filter(
    (group) => group.completed && group.id !== -1
  );

  useEffect(() => {
    if (completedGroups.length === 0) {
      setIsUlVisible(false);
    }
  }, [completedGroups.length]);

  return (
    <>
      <Droppable droppableId="uncompletedGroups">
        {(provided) => (
          <Ul ref={provided.innerRef} {...provided.droppableProps}>
            {uncompletedGroups &&
              uncompletedGroups.map((groupItem, index) => (
                <GroupItem key={groupItem.id} index={index} item={groupItem} />
              ))}
            {provided.placeholder}
          </Ul>
        )}
      </Droppable>

      <Droppable droppableId="completedGroups">
        {(provided) => (
          <Ul ref={provided.innerRef} {...provided.droppableProps}>
            {completedGroups.length !== 0 && <Hr />}
            {completedGroups.length !== 0 && (
              <SelectCompleted
                isUlVisible={isUlVisible}
                setIsUlVisible={setIsUlVisible}
              />
            )}

            {completedGroups.length !== 0 &&
              isUlVisible &&
              completedGroups.map((groupItem, index) => (
                <GroupItem key={groupItem.id} index={index} item={groupItem} />
              ))}
            {provided.placeholder}
          </Ul>
        )}
      </Droppable>

      <BtnWrapper></BtnWrapper>
    </>
  );
}

export default Groups;

const Ul = styled.ul`
  padding: 0;
  overflow-y: auto;

  @media (max-width: 1200px) {
    background: none;
    flex-direction: column;
    display: flex;
  }
  @media (max-width: 768px) {
    background: none;
    flex-direction: row;
    display: flex;
  }
  // custom scrollbar
  &::-webkit-scrollbar {
    width: 6px; /* width of scrollbar */
  }
  &::-webkit-scrollbar-thumb {
    height: 25%; /* height of scrollbar */
    background: #b9cee6; /* color of scollbar */
    border-radius: 3px;
  }
  &::-webkit-scrollbar-track {
    border-radius: 3px;
    background: #abcbfc3b; /* scrollbar background color*/
  }
`;

const BtnWrapper = styled.div`
  position: absolute;
  top: 70%;
  left: 20px;

  display: flex;
  gap: 10%;
  z-index: 999;
  @media (max-width: 1200px) {
    left: 44px;
  }
  @media (max-width: 768px) {
    left: 30px;
  }
`;

const Hr = styled.hr`
  width: 90%;
  margin: 0 auto;
  margin-bottom: 10px;
  background: #00000016;
  height: 0.3px;
  border: 0;
`;
