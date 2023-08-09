import styled from "styled-components";

import LeftSidePage from "./LeftSidePage";
import RightSidePage from "./RightSidePage";
import ToDoPage from "./ToDoPage";

type pageProps = { className: string };

function MainPage() {
  return (
    <Wrapper>
      <LeftSidePageWrapper className="" />
      <ToDoPageWrapper className="" />
      <RightSidePageWrapper className="" />
    </Wrapper>
  );
}

export default MainPage;

const Wrapper = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: repeat(12, 1fr);
  gap: 30px;

  /* 배경 */
  @media (max-width: 1200px) {
    display: flex;
    gap: 0;
    height: 100vh;
  }
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 0;
    height: 100vh;
  }
`;

const ToDoPageWrapper = styled((props: pageProps) => <ToDoPage {...props} />)`
  margin: 30px 0;
  grid-column: 3/10;
  background-color: rgb(255, 255, 255);
  border-radius: 7px;

  /* 리스트 */
  @media (max-width: 1200px) {
    margin-top: 30px;
    margin-bottom: 30px;
    margin-right: 30px;
    flex-grow: 1;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    height: 100vh;
    margin-top: 30px;
    margin-bottom: 30px;
    margin-left: 30px;
    margin-right: 30px;
  }
`;
const RightSidePageWrapper = styled((props: pageProps) => (
  <RightSidePage {...props} />
))`
  margin: 0px 0;
  grid-column: 10/13;
  margin-right: 30px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  /* 달력/채팅 */
  @media (max-width: 1200px) {
    margin-left: 30px;
    margin-right: 30px;
    flex-direction: column-reverse;
    display: none;
  }
  @media (max-width: 768px) {
    margin-left: 30px;
    margin-right: 30px;
    flex-direction: column-reverse;
    display: none;
  }
`;

const LeftSidePageWrapper = styled((props: pageProps) => (
  <LeftSidePage {...props} />
))`
  background-color: #ffffff;
  grid-column: 1/3;
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  /* 프로필 */
  @media (max-width: 1200px) {
    flex-direction: column;
    display: flex;
    align-items: center;
    overflow-y: hidden;
    background-color: white;
    margin-right: 30px;

    /* 프로필 */
  }
  @media (max-width: 768px) {
    flex-direction: row;
    display: flex;
    height: 130px;
    align-items: center;
    overflow-y: hidden;
    background-color: white;
    margin-left: 30px;
    margin-right: 30px;
    margin-top: 30px;
    border-radius: 7px;
  }
`;
