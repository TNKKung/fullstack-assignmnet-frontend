import React, { useCallback } from "react";

import { IconClose, IconSpin } from "../Icons";
import { Modal } from "../Modal";
import { IModalCreateTicketProps } from "./type";

const ModalCreateTicket: React.FC<IModalCreateTicketProps> = ({
  isLoading,
  isOpenCreateTicket,
  handleCreatedTicket,
  handleClickCloseModalCreateTicket,
  setTitle,
  setContact,
  setDescription,
}) => {
  const handleInputTitle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    },
    [setTitle]
  );

  const handleInputDescription = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setDescription(e.target.value);
    },
    [setDescription]
  );

  const handleInputContact = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setContact(e.target.value);
    },
    [setContact]
  );

  return (
    <Modal isOpen={isOpenCreateTicket} size="md">
      <div className="flex flex-col w-full h-full">
        <div className="flex items-center justify-between">
          Create Ticket
          <button
            className="p-1 text-red-500 border border-red-200 rounded-md hover:bg-red-500 hover:text-gray-50"
            onClick={handleClickCloseModalCreateTicket}
          >
            <IconClose className="w-6 h-6" />
          </button>
        </div>
        <div className="flex flex-col px-2 py-5 space-y-4 text-base">
          <div className="space-y-1">
            <p>Ticket Title</p>
            <input
              onChange={handleInputTitle}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
            />
          </div>
          <div className="w-full h-full space-y-1">
            <p>Description</p>
            <textarea
              onChange={handleInputDescription}
              className="w-full h-56 p-2 border border-gray-300 rounded-md resize-none focus:outline-none"
            />
          </div>
          <div className="w-full h-full space-y-1">
            <p>Contract</p>
            <textarea
              onChange={handleInputContact}
              className="w-full h-32 p-2 border border-gray-300 rounded-md resize-none focus:outline-none"
            />
          </div>
        </div>
        <div className="flex items-center justify-center w-full ">
          <button
            type="button"
            className="w-24 p-2 space-x-1 text-green-700 border border-green-500 rounded-md bg-green-50 hover:bg-green-600 hover:text-gray-100"
            onClick={handleCreatedTicket}
          >
            {isLoading ? (
              <IconSpin className="w-16 h-16 animate-spin" />
            ) : (
              <p>Create</p>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalCreateTicket;
