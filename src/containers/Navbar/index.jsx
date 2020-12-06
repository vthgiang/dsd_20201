import React, { useCallback } from "react";
import {
  StyleNavItem,
  StyleUserName,
  StyleUserProfileContainer,
} from "./index.style";
import { Row, Popover, Avatar, Badge } from "antd";

import { BellOutlined, UserOutlined } from "@ant-design/icons";

import { useUserState } from '../../hooks/useUserState';

const Navbar = () => {
  const { userState, login } = useUserState();

  const onLoginManager = useCallback(() => {
    login({
      uid: 11,
      token: '4e3fe3463afd3a705c0be7ec2322c335',
      projectType: 'LUOI_DIEN',
      role: 'MANAGER',
    });
  }, [login]);

  const onLoginStaff = useCallback(() => {
    login({
      uid: 3,
      token: '4e3fe3463afd3a705c0be7ec2322c335',
      projectType: 'LUOI_DIEN',
      role: 'DRONE_STAFF',
    });
  }, [login]);

  const notification = () => (
    <div>
      <p>Thông báo</p>
    </div>
  );

  const profile = () => (
    <div>
      <p>
        <a onClick={onLoginManager}>Login Manager</a>
      </p>
      <p>
        <a onClick={onLoginStaff}>Login Staff</a>
      </p>
      <p>Tài khoản</p>
      <p>Đăng xuất</p>
    </div>
  );

  return (
    <Row type="flex" justify="end" align="middle" className="right-header">
      <StyleNavItem>
        <Popover
          placement="bottom"
          title="Thông báo"
          content={notification}
          trigger="click"
        >
          <BellOutlined style={{ color: "gray", fontSize: 32 }} />
        </Popover>
      </StyleNavItem>

      <StyleNavItem>
        <Popover
          placement="bottom"
          title="Profile"
          content={profile}
          trigger="click"
        >
          <StyleUserProfileContainer>
            <Badge dot color="#04B653">
              <Avatar
                style={{ backgroundColor: "#87d068" }}
                shape="circle"
                icon={<UserOutlined />}
                size="large"
              />
            </Badge>
            <StyleUserName>
              <span className="text-info role">{userState?.info?.role}</span>
              <span className="text-info username">Vũ Đức Đam</span>
            </StyleUserName>
          </StyleUserProfileContainer>
        </Popover>
      </StyleNavItem>
    </Row>
  );
};

export default Navbar;
