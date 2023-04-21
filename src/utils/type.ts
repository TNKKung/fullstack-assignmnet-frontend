export interface itemObject {
  created: number;
  contact: string;
  description: string;
  title: string;
  status: string;
  latest: number;
  id: string;
}

export interface listItemObject {
  pending: itemObject[];
  accepted: itemObject[];
  resolved: itemObject[];
  rejected: itemObject[];
}
