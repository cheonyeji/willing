import ToDoHeader from "../components/toDo/ToDoHeader";
import NewToDo from "../components/toDo/NewToDo";
import ToDos from "../components/toDo/ToDos";
import { styled } from "styled-components";

type ToDoPageProps = { className: string };

function ToDoPage(props: ToDoPageProps) {
  return (
    <Wrapper className={props.className}>
      <ToDoHeader />
      <NewToDo />
      <ToDos />
    </Wrapper>
  );
}

export default ToDoPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;
