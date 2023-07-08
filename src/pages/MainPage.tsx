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
  gap: 10px;
`;

const ToDoPageWrapper = styled((props: pageProps) => <ToDoPage {...props} />)`
  grid-column: 3/10;
`;
const RightSidePageWrapper = styled((props: pageProps) => (
  <RightSidePage {...props} />
))`
  grid-column: 10/13;
`;

const LeftSidePageWrapper = styled((props: pageProps) => (
  <LeftSidePage {...props} />
))`
  grid-column: 1/3;
`;
