import { IToDo } from "./atoms";

class ToDo implements IToDo {
  text: string;
  id: number;
  isDone: boolean;
  groupId: number;
  dueDate: Date;
  createdDate: Date;

  constructor(
    text: string,
    groupId: number,
    dueDate: Date,
    createdDate: Date,
    isDone: boolean
  ) {
    this.text = text;
    this.id = Date.now();
    this.groupId = groupId;
    this.isDone = isDone;
    this.dueDate = dueDate;
    this.createdDate = createdDate;
  }
}

export default ToDo;
