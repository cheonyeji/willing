import { useState } from "react";
import { styled } from "styled-components";

import IconSelectUp from "../icons/IconSelectUp";
import IconSelectDown from "../icons/IconSelectDown";
import Dropdown from "../UI/Dropdown";
import { IColor, colors, getColorItemById } from "../../models/colorArr";

type SelectColorProps = {
  selectedColorIdState: number;
  setSelectedColorIdState: (n: number) => void;
};

function SelectColor(props: SelectColorProps) {
  const [isUlVisible, setIsUlVisible] = useState(false);
  const colorItemById = getColorItemById(props.selectedColorIdState);

  const toggleSelect = () => {
    setIsUlVisible(!isUlVisible);
  };

  const liClickHandler = (event: React.MouseEvent<HTMLElement>) => {
    props.setSelectedColorIdState(+event.currentTarget.id);
    setIsUlVisible(!isUlVisible);
  };
  return (
    <Wrapper onMouseLeave={() => setIsUlVisible(false)}>
      <SelectBtn onClick={toggleSelect}>
        <ColorCircle $colorstring={colorItemById!.color} />
        <IconWrapper>
          {isUlVisible ? <IconSelectUp /> : <IconSelectDown />}
        </IconWrapper>
      </SelectBtn>
      <Dropdown<IColor>
        isUlVisible={isUlVisible}
        setIsUlVisible={setIsUlVisible}
        liClickHandler={liClickHandler}
        dataArray={colors}
      />
    </Wrapper>
  );
}

export default SelectColor;

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

const ColorCircle = styled.div<{ $colorstring: string }>`
  min-width: 10px;
  min-height: 10px;
  border-radius: 50%;
  background-color: ${(props) => props.$colorstring};
`;

const IconWrapper = styled.div`
  margin-left: 5px;
  display: flex;
  align-items: center;
`;
