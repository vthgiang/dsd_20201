import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import React, { useState, useEffect } from "react";

function ControlledTabs() {
  const [key, setKey] = useState('home');

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
    >
      <Tab eventKey="home" title="Home">
        <h2>NA 1</h2>
      </Tab>
      <Tab eventKey="profile" title="Profile">
        <h1> NA 2</h1>
      </Tab>
      <Tab eventKey="contact" title="Contact" disabled>
        <h1> NA 3</h1>
      </Tab>
    </Tabs>
  );
}

export default function App() {
    return (<ControlledTabs />)
};