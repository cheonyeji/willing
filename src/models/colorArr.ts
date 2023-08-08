/* 디폴트 색상 배열 */
export interface IColor {
  id: number;
  color: string;
}

export const colors = <IColor[]>[
  { id: 0, color: "#AEE4FF" },
  { id: 1, color: "#e1aeff" },
  { id: 2, color: "#6bd2bf" },
  { id: 3, color: "#bb8787" },
  { id: 4, color: "#98ae6e" },
];

export const getColorItemById = (id: number) =>
  colors.find((color) => color.id === id);
