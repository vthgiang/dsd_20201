import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import React, { useState, useEffect } from "react";

function ControlledTabs() {
  const [key, setKey] = useState('home');

  return (
   <div>dash board</div>
  );
}

export default function App() {
    return (<ControlledTabs />)
};