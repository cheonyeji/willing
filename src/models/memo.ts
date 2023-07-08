import { IMemo } from "./atoms";

class Memo implements IMemo {
  id: number;
  text: string;
  sendTime: Date;

  constructor(id: number, text: string, sendTime: Date) {
    this.id = id;
    this.text = text;
    this.sendTime = sendTime;
  }
}

export default Memo;
