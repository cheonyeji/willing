import { useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

import IconKebap from "../icons/IconKebap";
import EditDropdown from "./EditDropdown";
import EditText from "./EditText";
import Dropdown from "../UI/Dropdown";
import { IGroup, groupsState } from "../../models/atoms";
import { IColor, colors, getColorItemById } from "../../models/colorArr";
import Group from "../../models/group";
import { Draggable } from "react-beautiful-dnd";

type IGroupItem = {
  item: IGroup;
  index: number;
};

function GroupItem({ item, index }: IGroupItem) {
  const [isTextEdit, setIsTextEdit] = useState(false);
  const [isColorDropdownVisible, setIsColorDropdownVisible] = useState(false);
  const [isEditDropdownVisible, setEditIsDropdownVisible] = useState(false);

  const setGroups = useSetRecoilState(groupsState);

  const kebapClickHandler = () => {
    setEditIsDropdownVisible(!isEditDropdownVisible);
  };

  const liClickHandler = (event: React.MouseEvent<HTMLElement>) => {
    const colorItemById = getColorItemById(+event.currentTarget.id);

    // 해당 group id 전체 요소에서 찾아서 group Color 바꾸기
    setGroups((prevGroups) => {
      const findSameId = (element: IGroup, targetId: number) => {
        if (element.id === targetId) {
          return true;
        }
      };
      const targetIndex = prevGroups.findIndex((element) =>
        findSameId(element, item.id)
      );

      const modifiedGroup = new Group(
        prevGroups[targetIndex].id,
        prevGroups[targetIndex].title,
        colorItemById!.color,
        prevGroups[targetIndex].completed
      );

      const newState = [...prevGroups];
      newState.splice(targetIndex, 1);
      newState.splice(targetIndex, 0, modifiedGroup);

      return newState;
    });
    setIsColorDropdownVisible(!isColorDropdownVisible);
  };

  return (
    <Draggable draggableId={item.id + ""} index={index}>
      {(provided) => (
        <Item
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          groupid={item.id}
          isEdit={isTextEdit || isColorDropdownVisible}
          onMouseLeave={() => {
            setEditIsDropdownVisible(false);
            setIsColorDropdownVisible(false);
          }}
        >
          <CircleTitleWrapper>
            <ColorCircle
              colorstring={item.color}
              onDoubleClick={() => {
                setIsColorDropdownVisible(!isColorDropdownVisible);
                setEditIsDropdownVisible(false);
              }}
            />

            <TextSpan
              onDoubleClick={() => {
                setIsTextEdit(!isTextEdit);
                setEditIsDropdownVisible(false);
              }}
            >
              {isTextEdit ? (
                <EditText
                  text={item.title}
                  setIsEdit={setIsTextEdit}
                  itemId={item.id}
                />
              ) : (
                item.title
              )}
            </TextSpan>
          </CircleTitleWrapper>

          <Dropdown<IColor>
            isUlVisible={isColorDropdownVisible}
            setIsUlVisible={setIsColorDropdownVisible}
            liClickHandler={liClickHandler}
            dataArray={colors}
          />

          <IconKebapWrapper onClick={kebapClickHandler}>
            <IconKebap />
            {isEditDropdownVisible && (
              <EditDropdown groupId={item.id} groupCompleted={item.completed} />
            )}
          </IconKebapWrapper>
        </Item>
      )}
    </Draggable>
  );
}

export default GroupItem;

const IconKebapWrapper = styled.div`
  display: none;
  cursor: pointer;
`;

const Item = styled.li<{ groupid: number; isEdit: boolean }>`
  font-size: 12px;
  display: flex;
  align-items: center;
  margin-bottom: 18px;
  margin-left: 13px;
  margin-right: 13px;
  justify-content: space-between;

  &:hover > ${IconKebapWrapper} {
    display: ${(props) => {
      if (props.groupid === 0 || props.isEdit) return "none";
      else return "block";
    }};
  }

  @media (max-width: 1200px) {
    margin-bottom: 0px;
    margin-bottom: 0px;
    display: flex;
    margin-bottom: 18px;
    margin-left: 13px;
    margin-right: 13px;
  }
  @media (max-width: 768px) {
    margin-bottom: 0px;
    margin-bottom: 0px;
    display: flex;
  }
`;

const CircleTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
`;

const ColorCircle = styled.div<{ colorstring: string }>`
  min-width: 0.8em;
  min-height: 0.8em;
  width: 0.8em;
  height: 0.8em;
  border-radius: 50%;
  background-color: ${(props) => props.colorstring};
  margin-right: 8px;
`;

const TextSpan = styled.span`
  width: 100%;
  display: block;
`;
