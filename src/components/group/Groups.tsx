import { useRecoilValue } from "recoil";
import { styled } from "styled-components";

import GroupItem from "./GroupItem";
import { groupsState } from "../../models/atoms";

function Groups() {
  const groups = useRecoilValue(groupsState);

  const uncompletedGroups = groups.filter((group) => !group.completed);
  const completedGroups = groups.filter(
    (group) => group.completed && group.id !== -1
  );

  return (
    <Ul>
      {uncompletedGroups &&
        uncompletedGroups.map((groupItem) => (
          <GroupItem key={groupItem.id} item={groupItem} />
        ))}

      {completedGroups.length !== 0 && <Hr />}
      {completedGroups.length !== 0 && (
        <CompletedTitle>Completed</CompletedTitle>
      )}
      {completedGroups.length !== 0 &&
        completedGroups.map((groupItem) => (
          <GroupItem key={groupItem.id} item={groupItem} />
        ))}
    </Ul>
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

const Hr = styled.hr`
  width: 90%;
  margin: 0 auto;
  margin-bottom: 10px;
  background: #b0b0b0;
  height: 1px;
  border: 0;
`;

const CompletedTitle = styled.div`
  margin-bottom: 18px;
  margin-left: 13px;
  margin-right: 13px;
`;
