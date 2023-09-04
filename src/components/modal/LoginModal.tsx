import { styled } from "styled-components";
import Modal from "../UI/Modal";
import IconLogo from "../icons/IconLogo";
import IconMail from "../icons/IconMail";

function LoginModal() {
  return (
    <Modal>
      <Wrapper>
        <IconLogo />
        <LoginBtn>
          <IconMail />
          메일로 로그인하기
        </LoginBtn>
        <RegisterBtn>가입하기</RegisterBtn>
      </Wrapper>
    </Modal>
  );
}

export default LoginModal;

const Wrapper = styled.div`
  background-color: #ffffff;
`;

const LoginBtn = styled.div`
  background-color: #6a9cfd;
  color: white;
  &:hover {
    cursor: pointer;
  }
`;

const RegisterBtn = styled.div`
  &:hover {
    cursor: pointer;
  }
`;
