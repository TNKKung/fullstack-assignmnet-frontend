import {
  DragDropContext,
  Draggable,
  DraggableProvided,
} from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import axios from "axios";

import Card from "../Card/index";
import List from "../List/index";

interface itemObject {
  created: number;
  contact: string;
  description: string;
  title: string;
  status: string;
  latest: number;
  id: string;
}

interface listItemObject {
  pending: itemObject[];
  accepted: itemObject[];
  resolved: itemObject[];
  rejected: itemObject[];
}

interface Props {
  propItems: listItemObject;
}

const BoardTab: React.FC<Props> = ({ propItems }) => {
  const [items, setItems] = useState<listItemObject>({
    pending: [],
    accepted: [],
    resolved: [],
    rejected: [],
  });

  const removeFromList = (list: any, index: any) => {
    const result = Array.from(list);
    const [removed] = result.splice(index, 1);
    return [removed, result];
  };

  const addToList = (list: any, index: any, element: any) => {
    const result = Array.from(list);
    result.splice(index, 0, element);
    return result;
  };

  const changeStatus = (id: string, newStatus: string) => {
    axios
      .patch("//localhost:4000/v1/ticket/", { id, newStatus })
      .then((response) => console.log(response));
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const listCopy: any = { ...items };
    const sourceList = listCopy[result.source.droppableId];
    const [removedElement, newSourceList] = removeFromList(
      sourceList,
      result.source.index
    );

    listCopy[result.source.droppableId] = newSourceList;

    const destinationList = listCopy[result.destination.droppableId];
    listCopy[result.destination.droppableId] = addToList(
      destinationList,
      result.destination.index,
      removedElement
    );

    changeStatus(result.draggableId, result.destination.droppableId);
    setItems(listCopy);
  };

  useEffect(() => {
    setItems(propItems);
  }, [propItems]);

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex w-full h-full px-10 space-x-2">
          <List title="Pending" onDragEnd={onDragEnd} name="pending">
            {items.pending.map((item: itemObject, index: number) => (
              <Draggable key={item.id} draggableId={item.id + ""} index={index}>
                {(provided: DraggableProvided | any) => (
                  <div>
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Card data={item} />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
          </List>
          <List title="Accepted" onDragEnd={onDragEnd} name="accepted">
            {items.accepted.map((item: itemObject, index: number) => (
              <Draggable draggableId={item.id} index={index} key={item.id}>
                {(provided: DraggableProvided | any) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Card data={item} />
                  </div>
                )}
              </Draggable>
            ))}
          </List>
          <List title="Resolved" onDragEnd={onDragEnd} name="resolved">
            {items.resolved.map((item: itemObject, index: number) => (
              <Draggable draggableId={item.id} index={index} key={item.id}>
                {(provided: DraggableProvided | any) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Card data={item} />
                  </div>
                )}
              </Draggable>
            ))}
          </List>
          <List title="Rejected" onDragEnd={onDragEnd} name="rejected">
            {items.rejected.map((item: itemObject, index: number) => (
              <Draggable draggableId={item.id} index={index} key={item.id}>
                {(provided: DraggableProvided | any) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Card data={item} />
                  </div>
                )}
              </Draggable>
            ))}
          </List>
        </div>
      </DragDropContext>
    </>
  );
};

export default BoardTab;
