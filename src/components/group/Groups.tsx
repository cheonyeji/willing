import { useRecoilValue } from "recoil";
import { groupsState } from "../../models/atoms";
import GroupItem from "./GroupItem";
import { styled } from "styled-components";

function Groups() {
  const groups = useRecoilValue(groupsState);
  return (
    <Ul>
      {groups.map((groupItem) => (
        <GroupItem key={groupItem.id} item={groupItem} />
      ))}
    </Ul>
  );
}

export default Groups;

const Ul = styled.ul`
  padding: 0;
`;
