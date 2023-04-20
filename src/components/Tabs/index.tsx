import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { ICustomTab, ICustomTabList } from './types';
import './Tabs.css';

const CustomTabList: ICustomTabList = ({
  ref,
  className,
  direction = 'horizontal',
  ...rest
}) => {
  const classes = ['tab-list'];

  classes.push(`tab-list-${direction}`);

  if (className && typeof className === 'string') {
    classes.push(className);
  }

  return (
    <TabList ref={ref as undefined} className={classes.join(' ')} {...rest} />
  );
};

CustomTabList.tabsRole = 'TabList';

const CustomTab: ICustomTab = ({ ref, className, ...rest }) => {
  const classes = ['tab'];

  if (className && typeof className === 'string') {
    classes.push(className);
  }

  return (
    <Tab
      {...rest}
      ref={ref as undefined}
      className={classes.join(' ')}
      selectedClassName="active"
    />
  );
};

CustomTab.tabsRole = 'Tab';

export { CustomTab as Tab, Tabs, CustomTabList as TabList, TabPanel };
