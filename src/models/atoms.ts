import { atom, selector, selectorFamily } from "recoil";

import { isSameDate } from "../utils/RecoilFunctions";

const localStorageEffect = (key:string) => ({setSelf, onSet}: any) => {
  const savedValue = localStorage.getItem(key)
  // setSelf : Callbacks to set or reset the value of the atom.
  if (savedValue != null) {
    setSelf(JSON.parse(savedValue));
  }
  // onSet : Subscribe to changes in the atom value.
  onSet((newValue:any, _:any, isReset:any) => {
    isReset
      ? localStorage.removeItem(key)
      : localStorage.setItem(key, JSON.stringify(newValue));
  });
};


/* 선택된 날짜 State */
// 서비스 시작 화면은 오늘날짜, 날짜 기준 수정 가능
const today = new Date();
export const selectedDateState = atom<Date>({
  key: "selectedDateState",
  default: today,
  effects: [localStorageEffect('selected_date')]
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
  default: [{ id: 0, title: "DEFAULT", color: "#707070" }],
  effects: [localStorageEffect('groups')]
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
  effects: [localStorageEffect('todos')]
});

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
  effects: [localStorageEffect('memos')]
});

// 날짜에 맞는 메모
export const memosByDateSelector = selector({
  key: "memosByDateSelector",
  get: ({ get }) => {
    const memos = get(memosState);
    const selectedDate = get(selectedDateState);
    const memosBySelectedDate: IMemo[] = memos.filter((memo) =>
      isSameDate(memo.sendTime, selectedDate)
    );
    memosBySelectedDate.reverse();
    return memosBySelectedDate;
  },
});

/* 드래그 중인 여부 체크 (쓰레기통 visibility) */
export const isDraggingState = atom<boolean>({
  key: "isDraggingState",
  default: false,
});

/* 쓰레기통 위에 있는 여부 체크 (글자색 변경) */
export const isOverTrashCanState = atom<boolean>({
  key: "isOverTrashCanState",
  default: false,
});

/* 디폴트 색상 배열 */
export interface IColor {
  id: number;
  color: string;
}

export const colorsState = atom<IColor[]>({
  key: "colorsState",
  default: [
    { id: 0, color: "#AEE4FF" },
    { id: 1, color: "#e1aeff" },
    { id: 2, color: "#6bd2bf" },
    { id: 3, color: "#bb8787" },
    { id: 4, color: "#98ae6e" },
  ],
});

// return color Item (find by colorId). use selectorFamily for parameter
export const colorItemByIdSelector = selectorFamily({
  key: "colorItemByIdSelector",
  get:
    (colorId: number) =>
    ({ get }) => {
      const colors = get(colorsState);
      return colors.find((item) => item.id === colorId)!;
    },
});
