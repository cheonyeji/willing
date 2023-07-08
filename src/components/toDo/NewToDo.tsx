import { useState, useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { selectedDateState, toDosState } from "../../models/atoms";
import ToDo from "../../models/todo";
import { styled } from "styled-components";
import GroupSelect from "./GroupSelect";

function NewToDo() {
  const [selectedGroupId, setSelectedGroupId] = useState<number>(0);
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

const Wrapper = styled.div`
  display: flex;
`;
