export interface IModalCreateTicketProps {
  isLoading: boolean;
  isOpenCreateTicket: boolean;
  handleClickCloseModalCreateTicket: () => void;
  handleCreatedTicket: () => void;
  setTitle: (title: string) => void;
  setDescription: (title: string) => void;
  setContact: (title: string) => void;
}
