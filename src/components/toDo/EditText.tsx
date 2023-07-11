import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { styled } from "styled-components";
import { toDosState } from "../../models/atoms";
import ToDo from "../../models/todo";
type EditTextProps = {
  text: string;
  setIsEdit: (x: boolean) => void;
  itemId: number;
};
function EditText(props: EditTextProps) {
  const [inputText, setInputText] = useState(props.text);
  const setToDos = useSetRecoilState(toDosState);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (inputText.trim().length === 0) {
      return;
    }
    // 해당 item id 전체 요소에서 찾아서 text 바꾸기
    setToDos((prevToDos) => {
      const findSameId = (element: ToDo, targetId: number) => {
        if (element.id === targetId) {
          return true;
        }
      };
      const targetIndex = prevToDos.findIndex((element) =>
        findSameId(element, props.itemId)
      );

      const modifiedToDo = new ToDo(
        inputText,
        prevToDos[targetIndex].groupId,
        prevToDos[targetIndex].dueDate,
        prevToDos[targetIndex].createdDate,
        prevToDos[targetIndex].isDone
      );

      // because of state immutability, cannot mutate state. So set new State
      const newState = [...prevToDos];
      newState.splice(targetIndex, 1);
      newState.splice(targetIndex, 0, modifiedToDo);

      return newState;
    });
    props.setIsEdit(false);
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  return (
    <form onSubmit={submitHandler}>
      <EditInput value={inputText} onChange={inputChangeHandler} />
    </form>
  );
}

export default EditText;

const EditInput = styled.input`
  width: 100%;
  border: none;
  font-size: 12px;
  border-bottom: 1px solid #00000067;
  &:focus {
    outline: none;
  }
`;
