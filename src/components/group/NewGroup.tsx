import { useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

import { groupsState } from "../../models/atoms";
import SelectColor from "./SelectColor";
import { getColorItemById } from "../../models/colorArr";
import Group from "../../models/group";

function NewGroup() {
  const [selectedColorIdState, setSelectedColorIdState] = useState(0);
  const colorItemById = getColorItemById(selectedColorIdState);
  const groupInputRef = useRef<HTMLInputElement>(null);

  const setGroups = useSetRecoilState(groupsState);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredText = groupInputRef.current!.value;

    if (enteredText.trim().length === 0) {
      // Throw an error
      return;
    }

    setGroups((prev) => [
      ...prev,
      new Group(Date.now(), enteredText, colorItemById!.color),
    ]);
    groupInputRef.current!.value = "";
  };

  return (
    <Form onSubmit={submitHandler}>
      <SelectColor
        selectedColorIdState={selectedColorIdState}
        setSelectedColorIdState={setSelectedColorIdState}
      />
      <Input
        type="text"
        name="groupInput"
        autoComplete="off"
        ref={groupInputRef}
        placeholder="그룹이름을 추가하세요"
      />
    </Form>
  );
}

export default NewGroup;

const Form = styled.form`
  display: flex;
  margin-bottom: 18px;
  margin-left: 13px;
  margin-right: 13px;
  background-color: none;
  flex-grow: 1;
  background-color: transparent;
  @media (max-width: 768px) {
    align-items: center;
    margin-bottom: 0px;
  }
`;

const Input = styled.input`
  border: none;
  padding: 5px 0px;
  font-size: 12px;
  @media (max-width: 1200px) {
    background-color: transparent;
  }

  &:focus {
    outline: none;
    color: #000;
    background-color: rgba(240, 245, 252, 1);
    border-radius: 2px;
  }
`;
