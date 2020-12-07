import React, { useEffect, useState } from "react";
import {
  StyleNavItem,
  StyleUserName,
  StyleUserProfileContainer,
} from "./index.style";
import { Popover, Avatar, Badge } from "antd";

import { BellOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../modules/user/store";
import { useHistory, useLocation } from "react-router-dom";
import {
  Input,
  Row,
  Modal,
  Form,
} from "antd";
import { updateUser } from "../../modules/user/store/services";
import UploadImage from "../../modules/user/components/listUser/UploadImage";
import { userHost } from "../../modules/user/config/UserConfig";

const Navbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [user, setUser] = useState(useSelector(state => state.user.user));
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  const notification = () => (
    <div>
      <p>Thông báo</p>
    </div>
  );

  const handleLogout = () => {
    dispatch(actions.setUserData({}));
    dispatch(actions.setProjectType(""));
    dispatch(actions.setLogin(false));
    localStorage.removeItem('token');
    localStorage.removeItem('project-type');
    history.push("/login");
  };

  const handleEdit = () => {
    setVisible(true);
  }

  const profile = () => (
    <div>
      <p onClick={handleEdit} style={{ cursor: "pointer" }}>Tài khoản</p>
      <p onClick={handleChangePassword} style={{ cursor: "pointer" }}>Đổi mật khẩu</p>
      <p onClick={handleLogout} style={{ cursor: "pointer" }}>
        Đăng xuất
      </p>
    </div>
  );

  const handleSave = async () => {
    const res = await updateUser(user);
  }

  const handleChangePassword = () => {
    history.push({
      pathname: '/change-password',
      state: { lastRoute: location.pathname },
    });
  }

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
          title="Thông tin tài khoản"
          content={profile}
          trigger="click"
        >
          <StyleUserProfileContainer>
            <Badge dot color="#04B653">
              <Avatar shape="circle" size="large" src={userHost + user.avatar} />
            </Badge>
            <StyleUserName>
              <span className="text-info role">{user.role}</span>
              <span className="text-info username">{user.full_name}</span>
            </StyleUserName>
          </StyleUserProfileContainer>
        </Popover>
      </StyleNavItem>
      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
        title="Profile"
        onOk={handleSave}
        okText="Lưu"
      >
        <Form>
          <Row gutter={[16, 16]}>
            <Form.Item name="name" style={{ width: "45%", marginRight: 10 }}>
              <label htmlFor="">Tên:</label>
              <Input
                className="input-box"
                placeholder="Tên"
                value={user?.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
            </Form.Item>
            <Form.Item name="email" style={{ width: "45%" }}>
              <label htmlFor="">Email</label>
              <Input
                className="input-box"
                type="email"
                placeholder="Email"
                value={user?.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </Form.Item>
          </Row>
          <Row gutter={[16, 16]}>
            <Form.Item name="phone" style={{ width: "45%", marginRight: 10 }}>
              <label htmlFor="">Sdt:</label>
              <Input
                className="input-box"
                placeholder="Số điện thoại"
                value={user?.phone}
                onChange={(e) => setUser({ ...user, phone: e.target.value })}
              />
            </Form.Item>
            <Form.Item name="address" style={{ width: "45%" }}>
              <label htmlFor="">Address</label>
              <Input
                className="input-box"
                type="text"
                placeholder="Địa chỉ"
                value={user?.address}
                onChange={(e) => setUser({ ...user, address: e.target.value })}
              />
            </Form.Item>
          </Row>
          <Row>
            <Form.Item name="status" style={{ margin: "0 auto" }}>
              <label htmlFor="">Avatar</label>
              <UploadImage
                imageUrl={
                  user.avatar ? userHost + user.avatar : `/images/blank.png`
                }
              />
            </Form.Item>
          </Row>
        </Form>
      </Modal>
    </Row>
  );
};

export default Navbar;
