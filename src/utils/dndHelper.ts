import axios from "axios";

export const removeFromList = (list: any, index: any) => {
  const result = Array.from(list);
  const [removed] = result.splice(index, 1);
  return [removed, result];
};

export const addToList = (list: any, index: any, element: any) => {
  const result = Array.from(list);
  result.splice(index, 0, element);
  return result;
};

export const changeStatus = (id: string, newStatus: string) => {
  axios
    .patch("//localhost:4000/v1/ticket/", { id, newStatus })
    .then((response) => console.log(response));
};
