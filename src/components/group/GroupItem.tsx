import { IGroup } from "../../models/atoms";
import styled from "styled-components";

type IGroupItem = {
  item: IGroup;
};

function GroupItem({ item }: IGroupItem) {
  return (
    <Item>
      <ColorCircle colorstring={item.color} />
      {item.title}
    </Item>
  );
}

export default GroupItem;

const Item = styled.li`
  font-size: 12px;
  display: flex;
  align-items: center;
  margin-bottom: 18px;
  margin-left: 13px;
  margin-right: 13px;

  @media (max-width: 1200px) {
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

const ColorCircle = styled.div<{ colorstring: string }>`
  min-width: 0.8em;
  min-height: 0.8em;
  border-radius: 50%;
  background-color: ${(props) => props.colorstring};
  margin-right: 8px;
`;
