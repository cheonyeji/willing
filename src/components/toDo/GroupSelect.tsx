import { useState } from "react";
import { useRecoilValue } from "recoil";
import { groupItemById, groupsState } from "../../models/atoms";
import { styled } from "styled-components";

type GroupSelectProps = {
  selectedGroupId: number;
  setSelectedGroupId: (n: number) => void;
};

function GroupSelect(props: GroupSelectProps) {
  const groups = useRecoilValue(groupsState);
  const [isUlVisible, setIsUlVisible] = useState<boolean>(false);

  const selectedGroupItem = useRecoilValue(
    groupItemById(props.selectedGroupId)
  );

  const toggleSelect = () => {
    console.log("toggleSelect is called");
    setIsUlVisible(!isUlVisible);
  };

  const liClickHandler = (event: React.MouseEvent<HTMLElement>) => {
    console.log("liClickHandler is called");
    props.setSelectedGroupId(+event.currentTarget.id);
    setIsUlVisible(!isUlVisible);
  };
  return (
    <div>
      <SelectBtn onClick={toggleSelect}>
        <ColorCircle colorstring={selectedGroupItem!.color} />
        <TitleSpan>{selectedGroupItem!.title}</TitleSpan>
      </SelectBtn>
      <Ul visible={isUlVisible}>
        {groups.map((group) => (
          <Li key={group.id} id={group.id.toString()} onClick={liClickHandler}>
            <ColorCircle colorstring={group.color} />
            {group.title}
          </Li>
        ))}
      </Ul>
    </div>
  );
}

export default GroupSelect;

const SelectBtn = styled.button`
  width: 100px;
  border: none;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  &:hover {
    background-color: #14141410;
  }
  padding: 2px;
`;

const ColorCircle = styled.div<{ colorstring: string }>`
  width: 1em;
  height: 1em;
  border-radius: 50%;
  background-color: ${(props) => props.colorstring};
  margin-right: 5px;
`;

const TitleSpan = styled.span`
  width: 70px;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Ul = styled.ul<{ visible: boolean }>`
  font-size: 10px;
  display: ${(props) => (props.visible ? "block" : "none")};
  list-style: none;
  padding: 5px;
  position: absolute;
  border: 1px solid #717171;
  border-radius: 3px;
  background-color: #ffffff;
`;

const Li = styled.li`
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #e3e3f3;
  }
  padding: 3px 5px;
  border-radius: 2px;
`;
