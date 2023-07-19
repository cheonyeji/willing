import { styled } from "styled-components";

interface DropdownAttrs {
  id: number;
  title?: string;
  color: string;
}

interface DropdownProps<T> {
  isUlVisible: boolean;
  setIsUlVisible: (x: boolean) => void;
  liClickHandler: (event: React.MouseEvent<HTMLElement>, n?: number) => void;
  dataArray: T[];
}

function Dropdown<T extends DropdownAttrs>(props: DropdownProps<T>) {
  return (
    <Ul visible={props.isUlVisible}>
      {props.dataArray.map((data) => (
        <Li
          key={data.id}
          id={data.id.toString()}
          onClick={props.liClickHandler}
        >
          <ColorCircle colorstring={data.color} />
          {data.title ? <TextSpan>{data.title}</TextSpan> : ""}
        </Li>
      ))}
    </Ul>
  );
}

export default Dropdown;

const Ul = styled.ul<{ visible: boolean }>`
  display: ${(props) => (props.visible ? "block" : "none")};
  list-style: none;
  padding: 4px;
  position: absolute;
  border-radius: 4px;
  background-color: #ffffff;
  box-shadow: 0px 8px 8px 0px rgba(29, 91, 132, 0.25);
  max-width: 160px;
`;

const ColorCircle = styled.div<{ colorstring: string }>`
  min-width: 10px;
  min-height: 10px;
  border-radius: 50%;
  background-color: ${(props) => props.colorstring};
  margin: 8px;
`;

const Li = styled.li`
  display: flex;
  align-items: baseline;
  cursor: pointer;
  &:hover {
    background-color: #cae2fe9c;
  }
  border-radius: 4px;
`;

const TextSpan = styled.span`
  margin: 8px;
`;
