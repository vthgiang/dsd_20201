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
  const user = useSelector((state) => state.user.user);
const projectType = user.type;
const role = user.role;
  const { TabPane } = Tabs;
  return (
    <Tabs defaultActiveKey="1" onChange={callback}>
      <TabPane tab="Quản lý người dùng" key="1">
        <ListUser />
      </TabPane>
      <TabPane tab="Quản lý phòng ban" key="2">
        <ListDepartment />
      </TabPane>
      {role == "SUPER_ADMIN" ? (
        <TabPane tab="Quản lý chức vụ" key="3">
          <ListRole />
        </TabPane>
      ) : (
        <TabPane tab="Quản lý chức vụ" key="3" disabled>
          <ListRole />
        </TabPane>
      )}
      {role == "SUPER_ADMIN" ? (
        <TabPane tab="Quản lý quyền" key="4">
          <ListPermission />
        </TabPane>
      ) : (
        <TabPane tab="Quản lý quyền" key="4" disabled>
          <ListPermission />
        </TabPane>
      )}
      {role == "SUPER_ADMIN" ? (
        <TabPane tab="Phân quyền" key="5">
          <ListRolePermission />
        </TabPane>
      ) : (
        <TabPane tab="Quản lý chức vụ" key="5" disabled>
          <ListRolePermission />
        </TabPane>
      )}
    </Tabs>
  );
}
export default Task5;
