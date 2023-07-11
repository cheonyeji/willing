import ToDoHeader from "../components/toDo/ToDoHeader";
import NewToDo from "../components/toDo/NewToDo";
import ToDos from "../components/toDo/ToDos";

type ToDoPageProps = { className: string };

function ToDoPage(props: ToDoPageProps) {
  return (
    <div className={props.className}>
      <ToDoHeader />
      <NewToDo />
      <ToDos />
    </div>
  );
}

export default ToDoPage;
