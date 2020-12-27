import React from "react";
import { Tabs } from "antd";
import { useSelector } from "react-redux";
import ListUser from "./listUser";
import ListDepartment from "./listDepartment";
import ListRole from "./listRole";
import ListPermission from "./listPermission";
import ListRolePermission from "./listRolePermission";

function callback(key) {
  console.log(key);
}

function Task5() {

  const { TabPane } = Tabs;
  return (
    <Tabs defaultActiveKey="1" onChange={callback}>
      <TabPane tab="Quản lý người dùng" key="1">
        <ListUser />
      </TabPane>
      <TabPane tab="Quản lý phòng ban" key="2">
        <ListDepartment />
      </TabPane>
    </Tabs>
  );
}
export default Task5;
