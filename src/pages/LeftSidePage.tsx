import GroupPage from "./GroupPage";
import ProfilePage from "./ProfilePage";
import MemoBtn from "./MemoBtn";
import CalenderBtn from "./CalenderBtn";
import { styled } from "styled-components";
type pageProps = { className: string };

function SidebarPage(props: pageProps) {
  return (
    <div className={props.className}>
      <ProfilePage />
      <GroupPage />
      <BtnWrapper>
        <MemoBtn />
        <CalenderBtn />
      </BtnWrapper>
    </div>
  );
}

export default SidebarPage;

const BtnWrapper = styled.div`
  position: absolute;
  top: 89%;
  left: 20px;
  display: flex;
  gap: 10%;
  z-index: 999;
  @media (max-width: 1200px) {
    left: 30px;
  }
  @media (max-width: 768px) {
    left: 30px;
  }
`;
