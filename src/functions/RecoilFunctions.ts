import ToDo from "../models/todo";

export const findSameId = (element: ToDo, targetId: number) => {
  if (element.id === targetId) {
    return true;
  }
};

export const isSameDate = (date1: Date, date2: Date) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};
