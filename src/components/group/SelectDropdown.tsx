import { useState } from "react";
import { styled } from "styled-components";
import IconSelectUp from "../icons/IconSelectUp";
import IconSelectDown from "../icons/IconSelectDown";

type SelectDropdownProps = {
  groupColorState: string;
  setGroupColorState: (s: string) => void;
};

function SelectDropdown(props: SelectDropdownProps) {
  const colorArr = ["#AEE4FF", "#e1aeff", "#6bd2bf", "#bb8787", "#98ae6e"];

  const [isUlVisible, setIsUlVisible] = useState(false);

  const toggleSelect = () => {
    setIsUlVisible(!isUlVisible);
  };
  const liClickHandler = (event: React.MouseEvent<HTMLElement>) => {
    props.setGroupColorState(event.currentTarget.id);
    setIsUlVisible(!isUlVisible);
  };
  return (
    <Wrapper>
      <SelectBtn onClick={toggleSelect}>
        <ColorCircle colorstring={props.groupColorState} />
        <IconWrapper>
          {isUlVisible ? <IconSelectUp /> : <IconSelectDown />}
        </IconWrapper>
      </SelectBtn>

      <Ul visible={isUlVisible}>
        {colorArr.map((item) => (
          <Li key={item} id={item} onClick={liClickHandler}>
            <ColorCircle colorstring={item} />
          </Li>
        ))}
      </Ul>
    </Wrapper>
  );
}

export default SelectDropdown;

const Wrapper = styled.div`
  margin-right: 5px;
`;

const SelectBtn = styled.span`
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  padding: 8px 0;
`;

const ColorCircle = styled.div<{ colorstring: string }>`
  min-width: 10px;
  min-height: 10px;
  border-radius: 50%;
  background-color: ${(props) => props.colorstring};
`;

const IconWrapper = styled.div`
  margin-left: 5px;
  display: flex;
  align-items: center;
`;

const Ul = styled.ul<{ visible: boolean }>`
  display: ${(props) => (props.visible ? "block" : "none")};
  list-style: none;
  padding: 4px;
  position: absolute;
  border: 1px solid #717171;
  border-radius: 4px;
  background-color: #ffffff;
`;

const Li = styled.li`
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #cae2fe9c;
  }
  padding: 3px 5px;
  border-radius: 2px;
`;
