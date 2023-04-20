import React from "react";
import { Droppable, DroppableProvided } from "react-beautiful-dnd";

interface ListProps {
  children?: React.ReactNode;
  title: string;
  onDragEnd: (data: any) => void;
  name: string;
}

const List: React.FC<ListProps> = ({ children, title, name }) => {
  return (
    <div className="flex flex-col w-1/4 h-full">
      <h2 className="mx-3 mb-2 text-2xl font-bold">{title}</h2>
      <div className="w-full py-2 overflow-y-auto border border-yellow-600 rounded-md h-5/6">
        <Droppable droppableId={name}>
          {(provided: DroppableProvided) => (
            <div ref={provided.innerRef}>
              <div className="flex flex-col h-full p-2 mx-2 rounded-md min-h-max gap-y-3">
                {children}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
};

export default List;