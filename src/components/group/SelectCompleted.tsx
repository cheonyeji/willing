import { styled } from "styled-components";
import IconSelectUp from "../icons/IconSelectUp";
import IconSelectDown from "../icons/IconSelectDown";
import IconComplete from "../icons/IconComplete";

type SelectCompletedProps = {
  isUlVisible: boolean;
  setIsUlVisible: (x: boolean) => void;
};

function SelectCompleted(props: SelectCompletedProps) {
  return (
    <SelectBtn onClick={() => props.setIsUlVisible(!props.isUlVisible)}>
      <CompletedText>
        <IconArea>
          <IconComplete />
        </IconArea>
        COMPLETED
      </CompletedText>
      <IconWrapper>
        {props.isUlVisible ? <IconSelectUp /> : <IconSelectDown />}
      </IconWrapper>
    </SelectBtn>
  );
}

export default SelectCompleted;

const SelectBtn = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 18px;
  padding: 0 13px;
  cursor: pointer;
  padding: 5px;
  align-items: center;
  margin: 9px;
`;

const CompletedText = styled.span`
  font-size: 12px;
  align-items: center;
  display: flex;
`;

const IconWrapper = styled.div`
  margin-left: 5px;
  display: flex;
  align-items: center;
`;
const IconArea = styled.div`
  align-items: center;
  padding-top: 2px;
  padding-right: 8px;
`;
