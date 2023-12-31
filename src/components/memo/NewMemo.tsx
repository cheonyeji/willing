import { useRef } from "react";
import { styled } from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Memo from "../../models/memo";
import { memosState, selectedDateState } from "../../models/atoms";
import IconPlus from "../icons/IconPlus";

function NewMemo() {
  const memoInputRef = useRef<HTMLTextAreaElement>(null);
  const setMemos = useSetRecoilState(memosState);
  const selectedDate = useRecoilValue(selectedDateState);

  const sumbitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredText = memoInputRef.current!.value;
    const memoSendTime = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      new Date().getHours(),
      new Date().getMinutes(),
      new Date().getSeconds()
    );
    const newMemo = new Memo(Date.now(), enteredText, memoSendTime);

    if (enteredText.trim().length === 0) {
      return;
    }

    setMemos((prev) => prev.concat(newMemo));
    memoInputRef.current!.value = "";
  };
  return (
    <Form onSubmit={sumbitHandler}>
      <Textarea
        placeholder="메모를 입력하세요"
        autoComplete="off"
        ref={memoInputRef}
      ></Textarea>
      <Button type="submit">
        <IconPlus />
      </Button>
    </Form>
  );
}

export default NewMemo;

const Form = styled.form`
  background: #cae2fe80;
  padding: 10px;
  display: flex;
  justify-content: stretch;
  align-items: center;
  border-bottom-left-radius: 7px;
  border-bottom-right-radius: 7px;
`;

const Textarea = styled.textarea`
  border: none;
  width: 95%;
  background-color: transparent;
  resize: none;
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
`;
