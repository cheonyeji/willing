import { IGroup } from "./atoms";

class Group implements IGroup {
  id: number;
  title: string;
  color: string;
  completed: boolean;

  constructor(id: number, title: string, color: string, completed?: boolean) {
    this.id = id;
    this.title = title;
    this.color = color;
    this.completed = completed ? completed : false;
  }
}

export default Group;
