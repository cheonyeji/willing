import { useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import { groupsState } from "../../models/atoms";

import styled from "styled-components";

function NewGroup() {
  const colorArr = ["#AEE4FF", "#e1aeff", "#6bd2bf"];
  const [groupColorState, setGroupColorState] = useState<string>();
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

  const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGroupColorState(event.target.value);
  };
  return (
    <form onSubmit={submitHandler}>
      {colorArr.map((colorItem) => (
        <RadioBtn
          key={colorItem}
          colorstring={colorItem}
          onChange={radioHandler}
          value={colorItem}
          type="radio"
          name="groupColor"
        />
      ))}
      <input
        type="text"
        name="groupInput"
        autoComplete="off"
        ref={groupInputRef}
        placeholder="새로운 그룹을 추가하세요"
      />
      <button type="submit">✔</button>
    </form>
  );
}

export default NewGroup;

const RadioBtn = styled.input<{ colorstring: string }>`
  appearance: none;
  border: 2px solid ${(props) => props.colorstring};
  background-color: transparent;
  border-radius: 50%;
  width: 1em;
  height: 1em;
  &:checked {
    border: 3px solid ${(props) => props.colorstring};
    background-color: ${(props) => props.colorstring};
  }
`;
