import { atom, selector, selectorFamily } from "recoil";

/* 선택된 날짜 State */
// 서비스 시작 화면은 오늘날짜, 날짜 기준 수정 가능
const today = new Date();
export const selectedDateState = atom<Date>({
  key: "selectedDateState",
  default: today,
});

/* ToDo Group State */
// ToDo Group 요소의 설계도
export interface IGroup {
  id: number;
  title: string;
  color: string;
}

// ToDo Group
export const groupsState = atom<IGroup[]>({
  key: "groupsState",
  default: [{ id: 0, title: "DEFAULT", color: "#000000" }],
});

// return groupColor code (find by groupId). use selectorFamily for parameter
export const groupColorById = selectorFamily({
  key: "groupColorById",
  get:
    (groupId: number) =>
    ({ get }) => {
      const groups = get(groupsState);
      return groups.find((item) => item.id === groupId)!.color;
    },
});

// return group Item (find by groupId). use selectorFamily for parameter
export const groupItemById = selectorFamily({
  key: "groupItemById",
  get:
    (groupId: number) =>
    ({ get }) => {
      const groups = get(groupsState);
      return groups.find((item) => item.id === groupId);
    },
});

/* ToDo State */
// ToDo 요소의 설계도
export interface IToDo {
  text: string;
  id: number;
  isDone: boolean;
  groupId: number;
  dueDate: Date;
  createdDate: Date;
}

// 전체 ToDo 요소 배열
export const toDosState = atom<IToDo[]>({
  key: "toDosState",
  default: [],
});

export const isSameDate = (date1: Date, date2: Date) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export const toDosByDateSelector = selector({
  key: "toDosByDateSelector",
  get: ({ get }) => {
    const toDos = get(toDosState);
    const selectedDate = get(selectedDateState);
    const toDosBySelectedDate: IToDo[] = toDos.filter((todo) =>
      isSameDate(todo.dueDate, selectedDate)
    );
    return toDosBySelectedDate;
  },
});

/* Memo State */
// Memo 요소의 설계도
export interface IMemo {
  id: number;
  text: string;
  sendTime: Date;
}

// 전체 Memo 요소 배열
export const memosState = atom<IMemo[]>({
  key: "memosState",
  default: [],
});
