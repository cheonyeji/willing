import { styled } from "styled-components";
import IconCalender from "../components/icons/IconCalender";

function CalenderBtn() {
  function clickHandler() {}
  return (
    <BtnWrap>
      <Button onClick={clickHandler}>
        <IconCalender />
      </Button>
    </BtnWrap>
  );
}

export default CalenderBtn;

const BtnWrap = styled.div``;

const Button = styled.div`
  display: flex;
  border-radius: none;
  background-color: none;
  display: flex;
  width: 60px;
  height: 60px;
  padding: 8px;
  background-color: #cae2fe;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 100%;
  &:hover {
    box-shadow: 0px 4px 4px 0px rgba(29, 90, 132, 0.08);
    transform: scale(1.05);
    transition: transform 0.2s linear;
  }
`;
