import { useRef, useEffect } from "react";
import { IGroup } from "../../models/atoms";
import styled from "styled-components";

type IGroupItem = {
  item: IGroup;
};

function GroupItem({ item }: IGroupItem) {
  const itemRef = useRef<HTMLLIElement>(null);
  // width 계산해서 circleDiv 안찌그러지게 꽉차게 하려고 했는데 잘 안되서 일단 고정 px값으로
  // console.log(itemRef);
  // let itemWidth = itemRef.current!.offsetWidth;
  // let size: number = +window
  //   .getComputedStyle(itemRef.current!, null)
  //   .getPropertyValue("font-size");

  // useEffect(() => {
  //   itemWidth = itemRef.current!.offsetWidth;
  //   // size = +window
  //   //   .getComputedStyle(itemRef.current!, null)
  //   //   .getPropertyValue("font-size");
  // }, [itemRef.current]);

  const textwidth = 150;
  return (
    <Item ref={itemRef}>
      <ColorCircle colorstring={item.color} />
      <TextSpan textwidth={textwidth}>{item.title}</TextSpan>
    </Item>
  );
}

export default GroupItem;

const Item = styled.li`
  font-size: 12px;
  display: flex;
  align-items: center;
`;

const ColorCircle = styled.div<{ colorstring: string }>`
  width: 0.8em;
  height: 0.8em;
  border-radius: 50%;
  background-color: ${(props) => props.colorstring};
  margin-right: 8px;
`;

const TextSpan = styled.span<{ textwidth: number }>`
  width: ${(props) => props.textwidth}px;
`;
