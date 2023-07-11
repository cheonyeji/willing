import { styled } from "styled-components";
import Groups from "../components/group/Groups";
import NewGroup from "../components/group/NewGroup";

function GroupPage() {
  return (
    <Wrapper>
      <NewGroup />
      <Groups />
    </Wrapper>
  );
}

export default GroupPage;

const Wrapper = styled.div`
  padding: 0 13px;
`;
