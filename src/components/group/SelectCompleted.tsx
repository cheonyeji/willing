import { styled } from "styled-components";
import IconSelectUp from "../icons/IconSelectUp";
import IconSelectDown from "../icons/IconSelectDown";

type SelectCompletedProps = {
  isUlVisible: boolean;
  setIsUlVisible: (x: boolean) => void;
};

function SelectCompleted(props: SelectCompletedProps) {
  return (
    <SelectBtn onClick={() => props.setIsUlVisible(!props.isUlVisible)}>
      <CompletedText>Completed</CompletedText>
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
`;

const CompletedText = styled.span`
  font-size: 14px;
`;

const IconWrapper = styled.div`
  margin-left: 5px;
  display: flex;
  align-items: center;
`;
