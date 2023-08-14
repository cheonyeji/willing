import React from "react";
import { useSetRecoilState } from "recoil";
import { styled } from "styled-components";
import { isModalShownState } from "../../models/atoms";

type ModalProps = {
  children: React.ReactNode;
};

function Modal({ children }: ModalProps) {
  const setIsModalShown = useSetRecoilState(isModalShownState);

  return (
    <Backdrop>
      <ModalWrapper>{children}</ModalWrapper>
    </Backdrop>
  );
}

export default Modal;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 9999;
`;

const ModalWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
