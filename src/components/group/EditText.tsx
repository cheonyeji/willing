import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { styled } from "styled-components";
import { IGroup, groupsState } from "../../models/atoms";

type EditTextProps = {
  text: string;
  setIsEdit: (x: boolean) => void;
  itemId: number;
};

function EditText(props: EditTextProps) {
  const [inputText, setInputText] = useState(props.text);
  const setGroups = useSetRecoilState(groupsState);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (inputText.trim().length === 0) {
      return;
    }

    // 해당 group id 전체 요소에서 찾아서 text 바꾸기
    setGroups((prevGroups) => {
      const findSameId = (element: IGroup, targetId: number) => {
        if (element.id === targetId) {
          return true;
        }
      };
      const targetIndex = prevGroups.findIndex((element) =>
        findSameId(element, props.itemId)
      );

      const modifiedGroup = {
        id: prevGroups[targetIndex].id,
        color: prevGroups[targetIndex].color,
        title: inputText,
      };

      const newState = [...prevGroups];
      newState.splice(targetIndex, 1);
      newState.splice(targetIndex, 0, modifiedGroup);

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
