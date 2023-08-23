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
  height: 400px;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
  @media (max-width: 360px) {
    width: 260px;
    height: 360px;
  }
`;
