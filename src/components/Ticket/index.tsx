import React from "react";
import { itemObject } from "../../utils/type";
import { IconTicket } from "../Icons";

interface Props {
  children?: React.ReactNode;
  data: itemObject;
}

const Card: React.FC<Props> = ({ data }) => {
  return (
    <div className="flex flex-row w-full h-24 p-4 border border-gray-400 rounded-md bg-gray-50">
      <div className="flex items-center justify-center w-32 h-full rounded-md">
        <IconTicket className="w-12 h-12 text-gray-400" />
      </div>
      <div className="w-full p-2 space-y-1 text-xs">
        <p className="w-full font-bold break-words">{data.title}</p>
        <p className="w-full h-8 break-words">{data.description}</p>
      </div>
    </div>
  );
};

export default Card;
