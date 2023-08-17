import React, { useRef, useEffect } from "react";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import { isModalShownState } from "../../models/atoms";

type ModalProps = {
  children: React.ReactNode;
};

function Modal({ children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isModalShown, setIsModalShown] = useRecoilState(isModalShownState);

  useEffect(() => {
    const closeModal = (e: MouseEvent) => {
      // 이벤트가 발생한 노드가 모달 컴포넌트 내부에 존재하지 않는다면 close
      if (
        isModalShown &&
        modalRef.current &&
        !modalRef.current.contains(e.target as Node)
      ) {
        setIsModalShown(0);
      }
    };
    document.addEventListener("mousedown", closeModal);
    return () => {
      document.removeEventListener("mousedown", closeModal);
    };
  }, [isModalShown]);

  return (
    <Backdrop>
      <ModalWrapper ref={modalRef}>{children}</ModalWrapper>
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
