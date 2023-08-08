import { IGroup } from "./atoms";

class Group implements IGroup {
  id: number;
  title: string;
  color: string;
  completed: boolean;

  constructor(id: number, title: string, color: string) {
    this.id = id;
    this.title = title;
    this.color = color;
    this.completed = false;
  }
}

export default Group;
