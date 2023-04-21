import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Menu, Transition } from "@headlessui/react";
import axios from "axios";

import { ITableTabProps } from "./type";

import { IconChevronUp, IconFilter } from "../Icons";

import { itemObject } from "../../utils/type";
import config from "../../config";

const TableTab: React.FC<ITableTabProps> = ({ propItems }) => {
  const [items, setItems] = useState<itemObject[]>([]);
  const [statusSortBy, setStatusSortBy] = useState<number>(0);
  const [latestSortBy, setLatestSortBy] = useState<number>(0);
  const [stateFilter, setStateFilter] = useState<string>("all");

  const filterItem = useMemo(() => {
    return items.filter(
      (item) => item.status === stateFilter || stateFilter === "all"
    );
  }, [items, stateFilter]);

  useEffect(() => {
    axios.get(`//${config.endPoint}`).then((response) => {
      setItems(response.data);
    });
  }, [propItems]);

  const handleClickSortStatus = useCallback(() => {
    setLatestSortBy(0);
    if (statusSortBy === 1) {
      setItems((prevzitems) => [
        ...prevzitems.sort((a, b) => (a.status < b.status ? 1 : -1)),
      ]);
      setStatusSortBy(-1);
    } else {
      setItems((prevzitems) => [
        ...prevzitems.sort((a, b) => (a.status > b.status ? 1 : -1)),
      ]);
      setStatusSortBy(1);
    }
  }, [statusSortBy]);

  const handleClickSortLatest = useCallback(() => {
    setStatusSortBy(0);
    if (latestSortBy === 1) {
      setItems((prevzitems) => [
        ...prevzitems.sort((a, b) => (a.latest < b.latest ? 1 : -1)),
      ]);
      setLatestSortBy(-1);
    } else {
      setItems((prevzitems) => [
        ...prevzitems.sort((a, b) => (a.latest > b.latest ? 1 : -1)),
      ]);
      setLatestSortBy(1);
    }
  }, [latestSortBy]);

  return (
    <div className="w-full h-full">
      <div className="z-0 w-full px-10 mb-2 text-right">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex items-center justify-center w-full px-3 py-2 space-x-1 text-sm font-medium text-gray-700 border rounded-md bg-gray-50 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
              <IconFilter className="w-4 h-4" />
              <p>Filter</p>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1 ">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      type="button"
                      className={`${
                        active ? "bg-gray-100 text-gray-500" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm space-x-2`}
                      onClick={() => {
                        setStateFilter("all");
                      }}
                    >
                      <input type="checkbox" checked={stateFilter === "all"} />
                      <p>All</p>
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      type="button"
                      className={`${
                        active ? "bg-gray-100 text-gray-500" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm space-x-2`}
                      onClick={() => {
                        setStateFilter("pending");
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={stateFilter === "pending"}
                      />
                      <p>Pending</p>
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      type="button"
                      className={`${
                        active ? "bg-gray-100 text-gray-500" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm space-x-2`}
                      onClick={() => {
                        setStateFilter("accepted");
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={stateFilter === "accepted"}
                      />
                      <p>Accepted</p>
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      type="button"
                      className={`${
                        active ? "bg-gray-100 text-gray-500" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm space-x-2`}
                      onClick={() => {
                        setStateFilter("resolved");
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={stateFilter === "resolved"}
                      />
                      <p>Resolved</p>
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      type="button"
                      className={`${
                        active ? "bg-gray-100 text-gray-500" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm space-x-2`}
                      onClick={() => {
                        setStateFilter("rejected");
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={stateFilter === "rejected"}
                      />
                      <p>Rejected</p>
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      <div className="z-0 px-10 overflow-y-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Tiltle
              </th>
              <th scope="col" className="px-6 py-3 ">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                <button
                  type="button"
                  className={`flex flex-row items-center h-full py-2 uppercase ${
                    statusSortBy === 0 && "text-transparent hover:text-gray-400"
                  } `}
                  onClick={handleClickSortStatus}
                >
                  <IconChevronUp
                    className={`w-4 h-4 absolute -translate-x-5 ${
                      statusSortBy === 1 ? "rotate-0" : "rotate-180"
                    }`}
                  />
                  <p className="text-gray-700">Status</p>
                </button>
              </th>

              <th scope="col" className="px-6 py-3">
                <button
                  type="button"
                  className={`flex flex-row items-center h-full py-2 uppercase ${
                    latestSortBy === 0 && "text-transparent hover:text-gray-400"
                  } `}
                  onClick={handleClickSortLatest}
                >
                  <IconChevronUp
                    className={`w-4 h-4 absolute -translate-x-5  ${
                      latestSortBy === 1 ? "rotate-0" : "rotate-180"
                    }`}
                  />
                  <p className="text-gray-700">Latest</p>
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {filterItem.map((item: itemObject) => {
              const theDate = new Date(item.latest);
              const dateString = theDate.toLocaleString();

              return (
                <tr key={item.id} className="bg-white border-b">
                  <td className="px-6 py-4 font-medium whitespace-nowrap">
                    {item.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{dateString}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableTab;
