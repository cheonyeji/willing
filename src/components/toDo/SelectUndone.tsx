import { styled } from "styled-components";
import IconSelectUp from "../icons/IconSelectUp";
import IconSelectDown from "../icons/IconSelectDown";

type SelectUndoneProps = {
  isUlVisible: boolean;
  setIsUlVisible: (x: boolean) => void;
};

function SelectUndone(props: SelectUndoneProps) {
  return (
    <SelectBtn onClick={() => props.setIsUlVisible(!props.isUlVisible)}>
      <CompletedText>미완료된 할일</CompletedText>
      <IconWrapper>
        {props.isUlVisible ? <IconSelectUp /> : <IconSelectDown />}
      </IconWrapper>
    </SelectBtn>
  );
}

export default SelectUndone;

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
