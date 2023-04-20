import React from "react";
import { TabListProps, TabProps } from "react-tabs";

export interface CustomTabListProps extends TabListProps {
  direction: "horizontal" | "vertical";
}

export interface ICustomTabList extends React.FC<CustomTabListProps> {
  tabsRole: string;
}

export interface ICustomTab extends React.FC<TabProps> {
  tabsRole: string;
}
