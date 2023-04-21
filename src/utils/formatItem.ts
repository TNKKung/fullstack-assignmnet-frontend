import { itemObject } from "./type";

export const formatItem = (data: any) => {
  let pending: itemObject[] = [];
  let accepted: itemObject[] = [];
  let resolved: itemObject[] = [];
  let rejected: itemObject[] = [];
  data.forEach((item: itemObject) => {
    if (item.status === "pending") {
      pending.push(item);
    } else if (item.status === "accepted") {
      accepted.push(item);
    } else if (item.status === "resolved") {
      resolved.push(item);
    } else {
      rejected.push(item);
    }
  });

  return { pending, accepted, resolved, rejected };
};
