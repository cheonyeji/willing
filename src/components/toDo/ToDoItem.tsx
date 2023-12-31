import React, { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { styled } from "styled-components";
import {
  Draggable,
  DraggableStateSnapshot,
  DraggingStyle,
  NotDraggingStyle,
} from "react-beautiful-dnd";

import {
  IGroup,
  groupColorById,
  isOverTrashCanState,
  toDosState,
  groupsState,
} from "../../models/atoms";
import ToDo from "../../models/todo";
import EditText from "./EditText";
import { findSameId } from "../../utils/RecoilFunctions";
import Dropdown from "../UI/Dropdown";
import IconKebap from "../icons/IconKebap";
import PinDropdown from "./PinDropdown";

type ToDoItemProps = {
  item: ToDo;
  index: number;
};

function ToDoItem({ item, index }: ToDoItemProps) {
  const groups = useRecoilValue(groupsState);
  const uncompletedGroups = groups.filter((group) => !group.completed);

  const groupColorString = useRecoilValue(groupColorById(item.groupId));
  const isOverTrashCan = useRecoilValue(isOverTrashCanState);

  const [isEdit, setIsEdit] = useState(false);
  const [isUlVisible, setIsUlVisible] = useState(false);
  const [isPinDropdownVisible, setIsPinDropdownVisible] = useState(false);

  const setToDos = useSetRecoilState(toDosState);

  const kebapClickHandler = () => {
    setIsPinDropdownVisible(!isPinDropdownVisible);
  };

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
        isChecked,
        item.pinned,
        item.id
      );

      // because of state immutability, cannot mutate state. So set new State
      const newState = [...prevToDos];
      newState.splice(targetIndex, 1);
      newState.splice(targetIndex, 0, modifiedToDo);

      return newState;
    });
  };

  const getStyle = (
    style: DraggingStyle | NotDraggingStyle,
    snapshot: DraggableStateSnapshot,
    isOverTrashCan: boolean
  ) => {
    if (!snapshot.isDropAnimating || !isOverTrashCan) {
      return style;
    }
    return {
      ...style,
      // cannot be 0, but make it super tiny
      transitionDuration: `0.001s`,
    };
  };

  const liClickHandler = (
    event: React.MouseEvent<HTMLElement>,
    itemId: number
  ) => {
    setIsUlVisible(false);

    // 해당 item id 전체 요소에서 찾아서 groupId 클릭된 요소로 바꾸기
    setToDos((prevToDos) => {
      const findSameId = (element: ToDo, targetId: number) => {
        if (element.id === targetId) {
          return true;
        }
      };
      const targetIndex = prevToDos.findIndex((element) =>
        findSameId(element, itemId)
      );
      const modifiedToDo = new ToDo(
        prevToDos[targetIndex].text,
        +event.currentTarget.id,
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
  };

  return (
    <Draggable draggableId={item.id + ""} index={index}>
      {(provided, snapshot) => (
        <ItemCard
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getStyle(
            provided.draggableProps.style!,
            snapshot,
            isOverTrashCan
          )}
          $isovertrashcan={isOverTrashCan}
          $isdragging={snapshot.isDragging}
          $isdone={item.isDone}
          $isedit={isUlVisible || isEdit}
          onMouseLeave={() => setIsPinDropdownVisible(false)}
        >
          <ItemText>
            <ColorCircle
              $colorstring={groupColorString}
              onDoubleClick={() => {
                setIsUlVisible(!isUlVisible);
                setIsPinDropdownVisible(false);
              }}
            />

            <TextSpan
              onDoubleClick={() => {
                setIsEdit(!isEdit);
                setIsPinDropdownVisible(false);
              }}
            >
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
          <Dropdown<IGroup>
            isUlVisible={isUlVisible}
            setIsUlVisible={setIsUlVisible}
            liClickHandler={(e: React.MouseEvent<HTMLElement>) =>
              liClickHandler(e, item.id)
            }
            dataArray={uncompletedGroups}
          />
          <input
            type="checkbox"
            name=""
            id=""
            checked={item.isDone}
            onChange={(e) => {
              toggleCheckbox(e.target.checked);
            }}
          />

          <IconKebapWrapper onClick={kebapClickHandler}>
            <IconKebap />
            {isPinDropdownVisible && (
              <PinDropdown todoId={item.id} todoPinned={item.pinned} />
            )}
          </IconKebapWrapper>
        </ItemCard>
      )}
    </Draggable>
  );
}

export default React.memo(ToDoItem);

interface ICard {
  $isovertrashcan: boolean;
  $isdragging: boolean;
  $isdone: boolean;
  $isedit: boolean;
}

const IconKebapWrapper = styled.div`
  display: none;
  cursor: pointer;
`;

const ItemCard = styled.li<ICard>`
  box-shadow: 0px 0px 15px 0px rgba(29, 90, 132, 0.08);
  border-radius: 7px;
  padding: 11px 11px;
  margin-bottom: 12px;
  margin-left: 30px;
  margin-right: 30px;
  background-color: #ffffff;
  box-shadow: ${(props) =>
    props.$isovertrashcan && props.$isdragging ? "0 0 0.3rem #d34747b4" : ""};
  display: flex;
  word-break: break-all; // for forbidding text overflow
  color: ${(props) => (props.$isdone ? "#929292" : "#000000")};

  &:hover > ${IconKebapWrapper} {
    display: ${(props) => {
      if (props.$isedit) return "none";
      else return "block";
    }};
  }
`;

const ColorCircle = styled.div<{ $colorstring: string }>`
  min-width: 1em;
  min-height: 1em;
  border-radius: 50%;
  background-color: ${(props) => props.$colorstring};
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
  padding: 3px;
`;
