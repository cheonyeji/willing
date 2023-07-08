import { useState, useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { groupsState, selectedDateState, toDosState } from "../../models/atoms";
import ToDo from "../../models/todo";
import { styled } from "styled-components";
import GroupSelect from "./GroupSelect";

function NewToDo() {
  const groups = useRecoilValue(groupsState);
  const [selectedGroupId, setSelectedGroupId] = useState<number>(0);
  const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedGroupId(+event.target.value);
  };

  const todoInputRef = useRef<HTMLInputElement>(null);
  const setTodosState = useSetRecoilState(toDosState);
  const selectedDate = useRecoilValue(selectedDateState);
  const sumbitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredText = todoInputRef.current!.value;

    if (enteredText.trim().length === 0) {
      // Throw an error
      return;
    }
    const newTodo = new ToDo(
      enteredText,
      selectedGroupId,
      selectedDate,
      selectedDate,
      false
    );
    setTodosState((prev) => prev.concat(newTodo));

    todoInputRef.current!.value = "";
  };

  return (
    <Wrapper>
      {/* {groups.map((group) => (
        <label key={group.id}>
          <RadioBtn
            key={group.id}
            colorstring={group.color}
            onChange={radioHandler}
            value={group.id as number}
            type="radio"
            checked={group.id === selectedGroupId}
            name="groupColor"
          />
          {group.title}
        </label>
      ))} */}
      <GroupSelect
        selectedGroupId={selectedGroupId}
        setSelectedGroupId={setSelectedGroupId}
      />
      <form onSubmit={sumbitHandler}>
        <input
          type="text"
          name="todoInput"
          placeholder="할일을 입력하세요"
          ref={todoInputRef}
          autoComplete="off"
        />
        <button type="submit">✔</button>
      </form>
    </Wrapper>
  );
}

export default NewToDo;

// const RadioBtn = styled.input<{ colorstring: string }>`
//   appearance: none;
//   border: 2px solid ${(props) => props.colorstring};
//   background-color: transparent;
//   border-radius: 50%;
//   width: 1em;
//   height: 1em;
//   &:checked {
//     border: 3px solid ${(props) => props.colorstring};
//     background-color: ${(props) => props.colorstring};
//   }
// `;

const Wrapper = styled.div`
  display: flex;
`;
