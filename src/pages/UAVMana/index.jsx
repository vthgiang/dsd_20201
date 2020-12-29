import React from 'react';
import 'antd/dist/antd.css';
import { Tabs } from 'antd';
import TableDroneState from '../TableDroneState';
import ManualDroneControl from '../../components/Drone/ManualUAVControl';

const { TabPane } = Tabs;

function callback(key) {
    console.log(key);
}

function UAVMana(props) {

    return (
        <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="Trạng thái drone" key="1">
                <TableDroneState/>
            </TabPane>
            <TabPane tab="Điều khiển drone" key="2">
                <ManualDroneControl />
            </TabPane>
        </Tabs>
    );
}

export default UAVMana;