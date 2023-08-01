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
  overflow-y: auto;
 
  @media (max-width: 768px) {
   
  background:none;
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
