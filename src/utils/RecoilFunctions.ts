import Group from "../models/group";
import ToDo from "../models/todo";

export const findSameId = (element: ToDo | Group, targetId: number) => {
  if (element.id === targetId) {
    return true;
  }
};

export const isSameDate = (date1: Date, date2: Date) => {
  return (
    new Date(date1).getFullYear() === new Date(date2).getFullYear() &&
    new Date(date1).getMonth() === new Date(date2).getMonth() &&
    new Date(date1).getDate() === new Date(date2).getDate()
  );
};
