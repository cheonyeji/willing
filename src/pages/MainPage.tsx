import LeftSidePage from "./LeftSidePage";
import RightSidePage from "./RightSidePage";
import ToDoPage from "./ToDoPage";
import styled from "styled-components";

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
`;

const ToDoPageWrapper = styled((props: pageProps) => <ToDoPage {...props} />)`
  margin: 30px 0;
  grid-column: 3/10;
  background-color: #ffffff;
  border-radius: 7px;
`;
const RightSidePageWrapper = styled((props: pageProps) => (
  <RightSidePage {...props} />
))`
  margin: 30px 0;
  grid-column: 10/13;
  margin-right: 30px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const LeftSidePageWrapper = styled((props: pageProps) => (
  <LeftSidePage {...props} />
))`
  background-color: #ffffff;
  grid-column: 1/3;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;
