import { useCallback, useEffect, useState } from "react";
import axios from "axios";

import { IconTicket, IconTable, IconColumn } from "./components/Icons";
import Incorporate from "./components/BoardTab";
import { Tab, TabList, TabPanel, Tabs } from "./components/Tabs";
import TableTab from "./components/TableTab";
import { formatItem } from "./utils/formatItem";
import { itemObject, listItemObject } from "./utils/type";
import ModalCreateTicket from "./components/ModalCreateTicket";

function App() {
  const [isOpenCreateTicket, setIsOpenCreateTicket] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [responseData, setResponseData] = useState<itemObject[]>([]);
  const [items, setItems] = useState<listItemObject>({
    pending: [],
    accepted: [],
    resolved: [],
    rejected: [],
  });

  const handleClickOpenModalCreateTicket = useCallback(() => {
    setIsOpenCreateTicket(true);
  }, []);

  const handleClickCloseModalCreateTicket = useCallback(() => {
    setIsOpenCreateTicket(false);
  }, []);

  const handleCreatedTicket = useCallback(() => {
    setIsLoading(true);
    try {
      axios
        .post("//localhost:4000/v1/ticket/", {
          title,
          description,
          contact,
        })
        .then((response) => {
          setResponseData(response.data);
          const formatData = formatItem(response.data);
          setItems(formatData);
        });
      handleClickCloseModalCreateTicket();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.response?.data);
      }
    }
    setIsLoading(false);
  }, [contact, description, handleClickCloseModalCreateTicket, title]);

  useEffect(() => {
    axios.get("//localhost:4000/v1/ticket/").then((response) => {
      setResponseData(response.data);
      const formatData = formatItem(response.data);
      setItems(formatData);
    });
  }, []);

  return (
    <>
      <div className="w-full h-full">
        <div className="flex justify-center w-full py-10">
          <button
            type="button"
            className="flex flex-row items-center p-2 space-x-2 text-green-700 border border-green-500 rounded-md bg-green-50 hover:bg-green-600 hover:text-gray-100"
            onClick={handleClickOpenModalCreateTicket}
          >
            <IconTicket className="w-4 h-4" />
            <p>Create Ticket</p>
          </button>
        </div>
        <Tabs className="flex flex-col w-full h-full space-y-4">
          <TabList direction="horizontal" className="items-center mx-10">
            <Tab className="flex flex-row items-center space-x-2 focus:outline-none">
              <IconTable className="w-5 h-5" />
              <p>All Ticket</p>
            </Tab>
            <Tab className="flex flex-row items-center space-x-2 focus:outline-none">
              <IconColumn className="w-5 h-5" />
              <p>Board By Status</p>
            </Tab>
          </TabList>
          <div className="relative flex w-full h-full">
            <div className="w-full h-full">
              <TabPanel className="w-full h-full">
                <TableTab propItems={responseData} />
              </TabPanel>
              <TabPanel className="w-full h-full">
                <Incorporate propItems={items} />
              </TabPanel>
            </div>
          </div>
        </Tabs>
      </div>
      {isOpenCreateTicket && (
        <ModalCreateTicket
          isLoading={isLoading}
          isOpenCreateTicket={isOpenCreateTicket}
          setTitle={setTitle}
          setDescription={setDescription}
          setContact={setContact}
          handleCreatedTicket={handleCreatedTicket}
          handleClickCloseModalCreateTicket={handleClickCloseModalCreateTicket}
        />
      )}
    </>
  );
}

export default App;
