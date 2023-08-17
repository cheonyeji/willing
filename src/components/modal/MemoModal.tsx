import { styled } from "styled-components";
import Modal from "../UI/Modal";
import Memos from "../memo/Memos";
import NewMemo from "../memo/NewMemo";

function MemoModal() {
  return (
    <Modal>
      <Wrapper>
        <Memos />
        <NewMemo />
      </Wrapper>
    </Modal>
  );
}

export default MemoModal;

const Wrapper = styled.div`
  background-color: #ffffff;

  width: 300px;
  height: 300px;
`;
