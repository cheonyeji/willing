import { useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { styled } from "styled-components";

import {
  selectedDateState,
  selectedGroupIdState,
  toDosState,
} from "../../models/atoms";
import ToDo from "../../models/todo";
import SelectGroup from "./SelectGroup";

function NewToDo() {
  const todoInputRef = useRef<HTMLInputElement>(null);

  const selectedDate = useRecoilValue(selectedDateState);
  const setTodosState = useSetRecoilState(toDosState);
  const selectedGroupId = useRecoilValue(selectedGroupIdState);

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
      <SelectGroup />
      <Form onSubmit={sumbitHandler}>
        <Input
          type="text"
          name="todoInput"
          placeholder="할일을 입력하세요"
          ref={todoInputRef}
          autoComplete="off"
        />
      </Form>
    </Wrapper>
  );
}

export default NewToDo;

const Wrapper = styled.div`
  display: flex;
  margin: 30px 30px 18.5px 30px;
`;

const Form = styled.form`
  flex-grow: 1;
`;

const Input = styled.input`
  width: 100%;
  border: none;
  padding: 8px;
  font-size: 12px;
  border-radius: 4px;
  &:focus {
    outline: none;
    background-color: #00000012;
  }
`;
