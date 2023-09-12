import { IToDo } from "./atoms";

class ToDo implements IToDo {
  text: string;
  id: number;
  isDone: boolean;
  groupId: number;
  dueDate: Date;
  createdDate: Date;
  pinned: boolean;

  constructor(
    text: string,
    groupId: number,
    dueDate: Date,
    createdDate: Date,
    isDone: boolean,
    pinned?: boolean,
    id?: number
  ) {
    this.text = text;
    this.id = id ? id : Date.now();
    this.groupId = groupId;
    this.isDone = isDone;
    this.dueDate = dueDate;
    this.createdDate = createdDate;
    this.pinned = pinned ? pinned : false;
  }
}

export default ToDo;
