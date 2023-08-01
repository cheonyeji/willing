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
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  @media (max-width: 768px) {
  
   
   
    flex-direction:row ;
    display: flex;
   
   
 
}
`;
