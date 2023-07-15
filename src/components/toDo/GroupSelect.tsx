import { useState } from "react";
import { useRecoilValue } from "recoil";
import { groupItemById, groupsState } from "../../models/atoms";
import { styled } from "styled-components";
import IconSelectDown from "../icons/IconSelectDown";
import IconSelectUp from "../icons/IconSelectUp";

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
    setIsUlVisible(!isUlVisible);
  };

  const liClickHandler = (event: React.MouseEvent<HTMLElement>) => {
    props.setSelectedGroupId(+event.currentTarget.id);
    setIsUlVisible(!isUlVisible);
  };
  return (
    <Wrapper>
      <SelectBtn onClick={toggleSelect}>
        <ColorCircle colorstring={selectedGroupItem!.color} />
        <TitleSpan>{selectedGroupItem!.title}</TitleSpan>
        <IconWrapper>
          {isUlVisible ? <IconSelectUp /> : <IconSelectDown />}
        </IconWrapper>
      </SelectBtn>
      <Ul visible={isUlVisible}>
        {groups.map((group) => (
          <Li key={group.id} id={group.id.toString()} onClick={liClickHandler}>
            <ColorCircle colorstring={group.color} />
            {group.title}
          </Li>
        ))}
      </Ul>
    </Wrapper>
  );
}

export default GroupSelect;

const Wrapper = styled.div`
  margin-right: 7px;
`;

const SelectBtn = styled.span`
  background-color: #cae2fe80;
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  padding: 0;
  border-radius: 4px;
  height: 31px;
`;

const ColorCircle = styled.div<{ colorstring: string }>`
  min-width: 10px;
  min-height: 10px;
  border-radius: 50%;
  background-color: ${(props) => props.colorstring};
  margin: 0 11px 0 5px;
`;

const TitleSpan = styled.span`
  width: 80px;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0 8px;
`;

const Ul = styled.ul<{ visible: boolean }>`
  display: ${(props) => (props.visible ? "block" : "none")};
  list-style: none;
  padding: 4px;
  position: absolute;
  border-radius: 4px;
  background-color: #ffffff;
  box-shadow: 0px 8px 8px 0px rgba(29, 91, 132, 0.25);
  max-width: 160px;
`;

const Li = styled.li`
  display: flex;
  align-items: baseline;
  cursor: pointer;
  &:hover {
    background-color: #cae2fe9c;
  }
  padding: 3px 5px;
  border-radius: 4px;
`;
