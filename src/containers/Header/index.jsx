import React from 'react';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BellOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Row, Popover, Avatar, Badge,  } from 'antd';
import StyleHeader, {
  StyleNavItem,
  StyleUserName,
  StyleUserProfileContainer,
} from './index.style';


const Header = ({ collapsed, toggle }) => {
  const content = () => (
    <div>
      <p>Thông báo</p>
      <p>Đăng xuất</p>
    </div>
  );

  return (
    <StyleHeader>
      <Layout.Header className="header-content">
        {React.createElement(
          collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
          {
            className: 'trigger',
            onClick: toggle,
          },
        )}
        <Row
          type="flex"
          justify="space-between"
          align="middle"
          className="right-header"
        >
          <StyleNavItem>
          </StyleNavItem>

          <StyleNavItem>
            <Popover
              placement="bottom"
              title="Thông báo"
              content={content}
              trigger="click"
            >
              <BellOutlined style={{ color: 'gray' ,fontSize: 32 }}/>
            </Popover>
          </StyleNavItem>

          <StyleNavItem>
            <Popover
              placement="bottom"
              title="Profile"
              content={content}
              trigger="click"
            >
              <StyleUserProfileContainer>
                <Badge dot color='#04B653'>
                  <Avatar style={{ backgroundColor: '#87d068' }} shape="circle" icon={<UserOutlined   />} size="large" />
                </Badge>
                <StyleUserName>
                  <span className="text-info role">Admin</span>
                  <span className="text-info username">Vũ Đức Đam</span>
                </StyleUserName>
              </StyleUserProfileContainer>
            </Popover>
          </StyleNavItem>
        </Row>
      </Layout.Header>
    </StyleHeader>
  );
};

export default Header;
