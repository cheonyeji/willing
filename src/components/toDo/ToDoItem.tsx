import React, { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  groupColorById,
  isOverTrashCanState,
  toDosState,
} from "../../models/atoms";
import { styled } from "styled-components";
import ToDo from "../../models/todo";
import EditText from "./EditText";
import { Draggable } from "react-beautiful-dnd";
import { findSameId } from "../../utils/RecoilFunctions";

type ToDoItemProps = {
  item: ToDo;
  index: number;
};

function ToDoItem({ item, index }: ToDoItemProps) {
  const groupColorString = useRecoilValue(groupColorById(item.groupId));
  const [isEdit, setIsEdit] = useState(false);

  const setToDos = useSetRecoilState(toDosState);
  const isOverTrashCan = useRecoilValue(isOverTrashCanState);

  const toggleCheckbox = (isChecked: boolean) => {
    // 해당 item id 전체 요소에서 찾아서 바꾸기
    setToDos((prevToDos) => {
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
    <Draggable draggableId={item.id + ""} index={index}>
      {(provided, snapshot) => (
        <ItemCard
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isOverTrashCan={isOverTrashCan}
          isDragging={snapshot.isDragging}
        >
          <ItemText>
            <ColorCircle colorstring={groupColorString} />
            <TextSpan onDoubleClick={() => setIsEdit(!isEdit)}>
              {isEdit ? (
                <EditText
                  text={item.text}
                  setIsEdit={setIsEdit}
                  itemId={item.id}
                />
              ) : (
                item.text
              )}
            </TextSpan>
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
      )}
    </Draggable>
  );
}

export default React.memo(ToDoItem);

interface ICard {
  isOverTrashCan: boolean;
  isDragging: boolean;
}
const ItemCard = styled.li<ICard>`
  box-shadow: 0px 0px 15px 0px rgba(29, 90, 132, 0.08);
  border-radius: 7px;
  padding: 11px 11px;

  margin-bottom: 12px;
  margin-left: 30px;
  margin-right: 30px;
  background-color: #ffffff;
  box-shadow: ${(props) =>
    props.isOverTrashCan && props.isDragging ? "0 0 0.3rem #d34747b4" : ""};
  display: flex;
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
  flex-grow: 1;

  margin-right: 10px;
`;

const TextSpan = styled.span`
  width: 100%;
  display: block;
`;
