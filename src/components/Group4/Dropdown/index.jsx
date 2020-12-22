import React from "react";
import { Menu, Dropdown, Button, message, Space, Tooltip } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { ref } from '../config4';

const FilterDropDown = (props) => {

  const { reset } = props;

  const handleMenuClick = (e) => {
    message.info('Click on menu item.');
    reset(parseInt(e.key), 0)
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      {Object.keys(ref.prop).map(key => (
        <Menu.Item
          key={ref.prop[key]["value"]}
          icon={<i className={`${ref.prop[key]['icon']} menu-item-icon`} style={{ marginRight: 10 }} />}
        >
          {ref.prop[key]["name"]}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Space wrap style={{ marginLeft: 35 }}>
      <Dropdown overlay={menu}>
        <Button size="large" style={{ width: 189 }}>
          Tất cả cảnh báo <DownOutlined />
        </Button>
      </Dropdown>
    </Space>
  );
}

export default FilterDropDown;