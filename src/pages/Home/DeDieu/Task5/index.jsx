import React from 'react';
import {Tabs} from 'antd';

import ListUser from "../../../../modules/user/components/listUser";
import ListDepartment from "../../../../modules/user/components/listDepartment";
import ListRole from "../../../../modules/user/components/listRole";
// import ListRole from '../../../../modules/user/components/listPermission'
function callback(key) {
  console.log(key);
}

function Task5() {
  const { TabPane } = Tabs;
  return (
    <Tabs defaultActiveKey="1" onChange={callback} style={{ height: 200 }}>
      <TabPane tab="Quản lý người dùng" key="1">
        <ListUser />
      </TabPane>
      <TabPane tab="Quản lý phòng ban" key="2">
        <ListDepartment />
      </TabPane>
      <TabPane tab="Quản lý chức vụ" key="3">
        <ListRole />
      </TabPane>
      <TabPane tab="Quản lý quyền" key="4">
        <ListRole />
      </TabPane>
      <TabPane tab="Phân quyền" key="5">
        hi
      </TabPane>
    </Tabs>
  );
}
export default Task5;
