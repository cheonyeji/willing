import { useState, useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

import IconKebap from "../icons/IconKebap";
import EditDropdown from "./EditDropdown";
import EditText from "./EditText";
import Dropdown from "../UI/Dropdown";
import { IGroup, groupsState } from "../../models/atoms";
import { IColor, colors, getColorItemById } from "../../models/colorArr";

type IGroupItem = {
  item: IGroup;
};

function GroupItem({ item }: IGroupItem) {
  const [isEdit, setIsEdit] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isEditDropdownVisible, setEditIsDropdownVisible] = useState(false);

  const setGroups = useSetRecoilState(groupsState);

  const kebapClickHandler = () => {
    setEditIsDropdownVisible(!isEditDropdownVisible);
  };

  const liClickHandler = (event: React.MouseEvent<HTMLElement>) => {
    // +event.currentTarget.id 가지고 group의 요소 변경하기
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

      const modifiedGroup = {
        id: prevGroups[targetIndex].id,
        color: colorItemById!.color,
        title: prevGroups[targetIndex].title,
      };

      const newState = [...prevGroups];
      newState.splice(targetIndex, 1);
      newState.splice(targetIndex, 0, modifiedGroup);

      return newState;
    });
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <Item
      onMouseLeave={() => {
        setEditIsDropdownVisible(false);
      }}
    >
      <CircleTitleWrapper>
        <ColorCircle
          colorstring={item.color}
          onDoubleClick={() => {
            setIsDropdownVisible(!isDropdownVisible);
          }}
        />

        <TextSpan onDoubleClick={() => setIsEdit(!isEdit)}>
          {isEdit ? (
            <EditText
              text={item.title}
              setIsEdit={setIsEdit}
              itemId={item.id}
            />
          ) : (
            item.title
          )}
        </TextSpan>
      </CircleTitleWrapper>

      <Dropdown<IColor>
        isUlVisible={isDropdownVisible}
        setIsUlVisible={setIsDropdownVisible}
        liClickHandler={liClickHandler}
        dataArray={colors}
      />

      <IconKebapWrapper onClick={kebapClickHandler}>
        <IconKebap />
        {isEditDropdownVisible && <EditDropdown />}
      </IconKebapWrapper>
    </Item>
  );
}

export default GroupItem;

const IconKebapWrapper = styled.div`
  display: none;
  cursor: pointer;
`;

const Item = styled.li`
  font-size: 12px;
  display: flex;
  align-items: center;
  margin-bottom: 18px;
  margin-left: 13px;
  margin-right: 13px;
  justify-content: space-between;

  &:hover > ${IconKebapWrapper} {
    display: block;
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
