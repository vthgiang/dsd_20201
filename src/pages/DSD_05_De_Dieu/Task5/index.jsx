import React from 'react';
import {Tabs} from 'antd';
function callback(key){
    console.log(key);
}
function Task5(){
    const { TabPane } = Tabs;
    return(
        <Tabs defaultActiveKey="1" onChange={callback} style={{height:200}}>
            <TabPane tab="Quản lý người dùng" key="1">HEllo</TabPane>
            <TabPane tab="Quản lý phòng ban" key="2">Hi</TabPane>
            <TabPane tab="Quản lý chức vụ" key="3">HEllo</TabPane>
            <TabPane tab="Quản lý quyền" key="4">HEllo</TabPane>
            <TabPane tab="Phân quyền" key="5">hi</TabPane>
        </Tabs>
    )
}
export default Task5;