import { styled } from "styled-components";
import Memos from "../components/memo/Memos";
import NewMemo from "../components/memo/NewMemo";
type MemoPageProps = { className: string };

function MemoPage(props: MemoPageProps) {
  return (
    <Wrapper className={props.className}>
      <Memos />
      <NewMemo />
    </Wrapper>
  );
}

export default MemoPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
`;
