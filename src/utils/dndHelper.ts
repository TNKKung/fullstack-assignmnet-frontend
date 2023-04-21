import axios from "axios";

import { itemObject } from "./type";

import config from "../config";

export const removeFromList = (list: itemObject[], index: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(index, 1);
  return [removed, result];
};

export const addToList = (list: itemObject[], index: number, element: any) => {
  const result = Array.from(list);
  result.splice(index, 0, element);
  return result;
};

export const changeStatus = (id: string, newStatus: string) => {
  axios
    .patch(`//${config.endPoint}/`, { id, newStatus })
    .then((response) => console.log(response));
};
