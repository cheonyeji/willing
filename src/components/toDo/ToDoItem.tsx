import { useRecoilValue, useSetRecoilState } from "recoil";
import { groupColorById, toDosState } from "../../models/atoms";
import { styled } from "styled-components";
import Todo from "../../models/todo";
import ToDo from "../../models/todo";

type ToDoItemProps = {
  item: Todo;
};

function ToDoItem({ item }: ToDoItemProps) {
  const groupColorString = useRecoilValue(groupColorById(item.groupId));

  const setToDos = useSetRecoilState(toDosState);
  const toggleCheckbox = (isChecked: boolean) => {
    // 해당 item id 전체 요소에서 찾아서 바꾸기
    setToDos((prevToDos) => {
      const findSameId = (element: ToDo, targetId: number) => {
        if (element.id === targetId) {
          return true;
        }
      };
      const targetIndex = prevToDos.findIndex((element) =>
        findSameId(element, item.id)
      );

      const modifiedToDo = new ToDo(
        item.text,
        item.groupId,
        item.dueDate,
        item.createdDate,
        isChecked
      );

      // because of state immutability, cannot mutate state. So set new State
      const newState = [...prevToDos];
      newState.splice(targetIndex, 1);
      newState.splice(targetIndex, 0, modifiedToDo);

      return newState;
    });
  };

  return (
    <ItemCard>
      <ItemText>
        <ColorCircle colorstring={groupColorString} />
        {item.text}
      </ItemText>

      <input
        type="checkbox"
        name=""
        id=""
        checked={item.isDone}
        onChange={(e) => {
          toggleCheckbox(e.target.checked);
        }}
      />
    </ItemCard>
  );
}

export default ToDoItem;

const ItemCard = styled.li`
  border: 1px solid #00000033;
  border-radius: 7px;
  padding: 11px 11px;
  margin-bottom: 12px;

  display: flex;
  justify-content: space-between;
  word-break: break-all; // for forbidding text overflow
`;

const ColorCircle = styled.div<{ colorstring: string }>`
  min-width: 1em;
  min-height: 1em;
  border-radius: 50%;
  background-color: ${(props) => props.colorstring};
  margin-right: 12px;
`;

const ItemText = styled.div`
  font-size: 12px;
  font-weight: 400;
  display: flex;
  align-items: center;
`;
