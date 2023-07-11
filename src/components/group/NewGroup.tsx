import { useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import { groupsState } from "../../models/atoms";

import styled from "styled-components";
import SelectDropdown from "./SelectDropdown";

function NewGroup() {
  const [groupColorState, setGroupColorState] = useState<string>("#AEE4FF");
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
      {
        color: groupColorState!,
        id: Date.now(),
        title: enteredText,
      },
    ]);
    groupInputRef.current!.value = "";
  };

  return (
    <Form onSubmit={submitHandler}>
      <SelectDropdown
        groupColorState={groupColorState}
        setGroupColorState={setGroupColorState}
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
  flex-grow: 1;
`;

const Input = styled.input`
  width: 100%;
  border: none;
  padding: 5px 0px;
  font-size: 12px;
  color: #929292;
  &:focus {
    outline: none;
    color: #000;
  }
`;
