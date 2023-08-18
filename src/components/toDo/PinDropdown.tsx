import { useSetRecoilState } from "recoil";
import { styled } from "styled-components";

import { toDosState } from "../../models/atoms";
import ToDo from "../../models/todo";

type PinDropdown = {
  todoId: number;
  todoPinned: boolean;
};

function PinDropdown(props: PinDropdown) {
  const setToDos = useSetRecoilState(toDosState);
  const pinnedClickHandler = () => {
    setToDos((prevToDos) => {
      const findSameId = (element: ToDo, targetId: number) => {
        if (element.id === targetId) {
          return true;
        }
      };
      const targetIndex = prevToDos.findIndex((element) =>
        findSameId(element, props.todoId)
      );

      // pinned된 경우 toDosByDate -> Pinned의 최상단에 위치하도록 수정 필요
      const modifiedToDo = new ToDo(
        prevToDos[targetIndex].text,
        prevToDos[targetIndex].groupId,
        prevToDos[targetIndex].dueDate,
        prevToDos[targetIndex].createdDate,
        prevToDos[targetIndex].isDone,
        true
      );

      // because of state immutability, cannot mutate state. So set new State
      const newState = [...prevToDos];
      newState.splice(targetIndex, 1);
      newState.splice(targetIndex, 0, modifiedToDo);

      return newState;
    });
  };
  const unPinnedClickHandler = () => {
    setToDos((prevToDos) => {
      const findSameId = (element: ToDo, targetId: number) => {
        if (element.id === targetId) {
          return true;
        }
      };
      const targetIndex = prevToDos.findIndex((element) =>
        findSameId(element, props.todoId)
      );

      // unpinned된 경우 toDosByDate -> unpinned의 최하단에 위치하도록 수정 필요
      const modifiedToDo = new ToDo(
        prevToDos[targetIndex].text,
        prevToDos[targetIndex].groupId,
        prevToDos[targetIndex].dueDate,
        prevToDos[targetIndex].createdDate,
        prevToDos[targetIndex].isDone,
        false
      );

      // because of state immutability, cannot mutate state. So set new State
      const newState = [...prevToDos];
      newState.splice(targetIndex, 1);
      newState.splice(targetIndex, 0, modifiedToDo);

      return newState;
    });
  };

  return (
    <Ul>
      {!props.todoPinned && <Li onClick={pinnedClickHandler}>pinned</Li>}
      {props.todoPinned && <Li onClick={unPinnedClickHandler}>unPinned</Li>}
    </Ul>
  );
}

export default PinDropdown;

const Ul = styled.ul`
  list-style: none;
  padding: 4px;
  position: absolute;
  border-radius: 4px;
  box-shadow: 0px 8px 8px 0px rgba(29, 91, 132, 0.25);
  max-width: 160px;
  background-color: #ffffff;
`;

const Li = styled.li`
  display: flex;
  padding: 4px;
  align-items: baseline;
  cursor: pointer;
  &:hover {
    background-color: #cae2fe9c;
  }
  border-radius: 4px;
`;
