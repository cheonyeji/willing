import { styled } from "styled-components";
import { useMediaQuery } from "react-responsive";

import GroupPage from "./GroupPage";
import ProfilePage from "./ProfilePage";
import MemoBtn from "../components/modal/button/MemoBtn";
import CalenderBtn from "../components/modal/button/CalenderBtn";
import { useSetRecoilState } from "recoil";
import { isModalShownState } from "../models/atoms";

type pageProps = { className: string };

function SidebarPage(props: pageProps) {
  const setIsModalShown = useSetRecoilState(isModalShownState);
  const isLess1200 = useMediaQuery({ maxWidth: 1200 });

  if (!isLess1200) {
    setIsModalShown(0);
  }

  return (
    <div className={props.className}>
      <ProfilePage />
      <GroupPage />

      {isLess1200 && (
        <BtnWrapper>
          <MemoBtn />
          <CalenderBtn />
        </BtnWrapper>
      )}
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
`;
