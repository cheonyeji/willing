import { useRecoilState, useSetRecoilState } from "recoil";
import { styled } from "styled-components";

import {
  IGroup,
  groupsState,
  selectedGroupIdState,
  toDosState,
} from "../../models/atoms";
import Group from "../../models/group";

type EditDropdownProps = {
  groupId: number;
  groupCompleted: boolean;
};

function EditDropdown(props: EditDropdownProps) {
  const [groups, setGroups] = useRecoilState(groupsState);
  const setToDos = useSetRecoilState(toDosState);
  const setSelectedGroupIdState = useSetRecoilState(selectedGroupIdState);

  const completeClickHandler = () => {
    // 해당 group id 전체 요소에서 찾아서 completed 바꾸기
    setGroups((prevGroups) => {
      const findSameId = (element: IGroup, targetId: number) => {
        if (element.id === targetId) {
          return true;
        }
      };
      const targetIndex = prevGroups.findIndex((element) =>
        findSameId(element, props.groupId)
      );

      const modifiedGroup = new Group(
        prevGroups[targetIndex].id,
        prevGroups[targetIndex].title,
        prevGroups[targetIndex].color,
        !prevGroups[targetIndex].completed
      );

      const newState = [...prevGroups];
      newState.splice(targetIndex, 1);
      newState.splice(targetIndex, 0, modifiedGroup);

      return newState;
    });

    // selectedGroupIdState 요소가 만약 현재 group id인 경우 배열 받아와서 이전 데이터로 설정 (groupId : 0인 요소는 삭제불가라 무조건 존재)
    setSelectedGroupIdState((prevGroupId) => {
      if (prevGroupId === props.groupId) {
        const targetIndex = groups.findIndex(
          (group) => group.id === props.groupId
        );
        return targetIndex > 0 && groups[targetIndex - 1]!.id !== -1
          ? groups[targetIndex - 1]!.id
          : 0;
      } else {
        return prevGroupId;
      }
    });
  };

  const removeClickHandler = () => {
    // todo 중 해당 group인 아이템 전부 group id -1로 바꾸기 (dedicated)
    setToDos((prevToDos) => {
      const newState = prevToDos.map((todo) => {
        if (todo.groupId === props.groupId) {
          const tmp = { ...todo };
          tmp.groupId = -1;
          return tmp;
        } else return todo;
      });
      return newState;
    });

    // selectedGroupIdState 요소가 만약 현재 group id인 경우 배열 받아와서 이전 데이터로 설정 (groupId : 0인 요소는 삭제불가라 무조건 존재)
    setSelectedGroupIdState((prevGroupId) => {
      if (prevGroupId === props.groupId) {
        const targetIndex = groups.findIndex(
          (group) => group.id === props.groupId
        );
        return targetIndex > 0 && groups[targetIndex - 1]!.id !== -1
          ? groups[targetIndex - 1]!.id
          : 0;
      } else {
        return prevGroupId;
      }
    });

    // 해당 group id 전체 요소에서 찾아서 삭제하기
    setGroups((prevGroups) => {
      const findSameId = (element: IGroup, targetId: number) => {
        if (element.id === targetId) {
          return true;
        }
      };
      const targetIndex = prevGroups.findIndex((element) =>
        findSameId(element, props.groupId)
      );

      const newState = [...prevGroups];
      newState.splice(targetIndex, 1);

      return newState;
    });
  };

  return (
    <Ul>
      {!props.groupCompleted && <Li onClick={completeClickHandler}>완료</Li>}
      <Li onClick={removeClickHandler}>삭제</Li>
    </Ul>
  );
}

export default EditDropdown;

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
