import { useRef } from "react";
import { styled } from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Memo from "../../models/memo";
import { memosState } from "../../models/atoms";

function NewMemo() {
  const memoInputRef = useRef<HTMLTextAreaElement>(null);
  const setMemos = useSetRecoilState(memosState);
  const memos = useRecoilValue(memosState);
  const sumbitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredText = memoInputRef.current!.value;
    const newMemo = new Memo(Date.now(), enteredText, new Date());

    setMemos((prev) => prev.concat(newMemo));
    console.log(memos);

    memoInputRef.current!.value = "";
  };
  return (
    <Form onSubmit={sumbitHandler}>
      <Textarea
        placeholder="메모를 입력하세요"
        autoComplete="off"
        ref={memoInputRef}
      ></Textarea>
      <Button type="submit">+</Button>
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

  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const Textarea = styled.textarea`
  border: none;
  width: 90%;
  background-color: transparent;
  resize: none;
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  border-radius: 3px;
  text-align: center;
  border: none;
  background-color: #abcbfc;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #7bb0ff;
  }
`;
