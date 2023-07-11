import { useRecoilValue } from "recoil";
import { memosByDateSelector } from "../../models/atoms";
import MemoItem from "./MemoItem";
import { styled } from "styled-components";

function Memos() {
  const memosByDate = useRecoilValue(memosByDateSelector);

  return (
    <Ul>
      {memosByDate.map((item) => (
        <MemoItem key={item.id} item={item} />
      ))}
    </Ul>
  );
}

export default Memos;

const Ul = styled.ul`
  // Allow drag only in todo list area
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  user-select: text;

  // remove list default css
  list-style: none;

  padding: 10px 12px;

  // set 100% height for auto-scroll only in ToDos.tsx
  height: 100%;
  overflow-y: auto;

  // custom scrollbar
  &::-webkit-scrollbar {
    width: 8px; /* width of scrollbar */
  }
  &::-webkit-scrollbar-thumb {
    height: 25%; /* height of scrollbar */
    background: #cae2fe; /* color of scollbar */
    border-radius: 3px;
  }
  &::-webkit-scrollbar-track {
    border-radius: 3px;
    background: #abcbfc3b; /* scrollbar background color*/
  }

  // show memo from bottom
  display: flex;
  flex-direction: column-reverse;
`;
