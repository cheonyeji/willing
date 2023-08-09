import { useState } from "react";
import { useRecoilValue } from "recoil";
import { IGroup, groupItemById, groupsState } from "../../models/atoms";
import { styled } from "styled-components";
import IconSelectDown from "../icons/IconSelectDown";
import IconSelectUp from "../icons/IconSelectUp";
import Dropdown from "../UI/Dropdown";

type SelectGroupProps = {
  selectedGroupId: number;
  setSelectedGroupId: (n: number) => void;
};

function SelectGroup(props: SelectGroupProps) {
  const groups = useRecoilValue(groupsState);
  const uncompletedGroups = groups.filter((group) => !group.completed);

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
    <Wrapper onMouseLeave={() => setIsUlVisible(false)}>
      <SelectBtn onClick={toggleSelect}>
        <ColorCircle colorstring={selectedGroupItem!.color} />
        <TitleSpan>{selectedGroupItem!.title}</TitleSpan>
        <IconWrapper>
          {isUlVisible ? <IconSelectUp /> : <IconSelectDown />}
        </IconWrapper>
      </SelectBtn>
      <Dropdown<IGroup>
        isUlVisible={isUlVisible}
        setIsUlVisible={setIsUlVisible}
        liClickHandler={liClickHandler}
        dataArray={uncompletedGroups}
      />
    </Wrapper>
  );
}

export default SelectGroup;

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
  margin: 8px;
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
