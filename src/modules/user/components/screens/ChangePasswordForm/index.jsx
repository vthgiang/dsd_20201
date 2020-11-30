import React, { useCallback, useState } from "react";
import StyleChangePasswordForm from "./index.style";
import { Form, Input, Button, Checkbox } from "antd";
import { changePassword } from "../../../store/services";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { actions } from "../../../store";
import { Typography } from "antd";
import { withRouter } from "react-router-dom";

const { Title } = Typography;

const ChangePasswordForm = ({ history }) => {
    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = useState({
        oldPassword: "",
        email: "",
        password: "",
        repassword: "",
    });
    const [message, setMessage] = useState("");
    const handleChangePassword = async () => {
        try {
            if (!validateData()) {
                return;
            }

            const dataChangePassword = {
                oldPassword: userInfo.oldPassword,
                email: userInfo.email,
                password: userInfo.password,
                repassword: userInfo.repassword,
            };
            setMessage("");
            const res = await changePassword(dataChangePassword);
            if (res.status == "successful") {
                dispatch(actions.setUserData({}));
                history.push({
                    pathname: "/login",
                    state: { message: "Vui lòng đăng nhập lại!" },
                });
            } else {
                setMessage(res.message);
            }
        } catch (error) {
            
        }
    };

    const validateData = useCallback(() => {
        var retval = true;
        if (typeof userInfo.email === "undefined" || userInfo.email === "") {
            retval = false;
            setMessage("Vui lòng nhập email!");
            return retval;
        }
        if (typeof userInfo.oldPassword === "undefined" || userInfo.oldPassword === "") {
            retval = false;
            setMessage("Vui lòng nhập mật khẩu cũ!");
            return retval;
        }
        if (typeof userInfo.password === "undefined" || userInfo.password === "") {
            retval = false;
            setMessage("Vui lòng nhập mật khẩu!");
            return retval;
        }
        if (typeof userInfo.repassword === "undefined") {
            retval = false;
            setMessage("Vui lòng xác nhận mật khẩu!");
            return retval;
        }
        if (userInfo.repassword !== userInfo.password) {
            retval = false;
            setMessage("Xác nhận mật khẩu không đúng!");
            return retval;
        }
        return retval;
    }, [userInfo]);

    return (
        <StyleChangePasswordForm>
            <Title level={2}>Hệ thống giám sát bằng Drone</Title>
            <h2>Đổi mật khẩu</h2>
            <Form
                name="normal_login"
                initialValues={{
                remember: true,
                }}
            >
                <Form.Item name="email">
                    <Input
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="Email"
                        value={userInfo.email}
                        onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                    />
                </Form.Item>
                <Form.Item name="oldPassword">
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Mật khẩu cũ"
                        value={userInfo.oldPassword}
                        onChange={(e) => setUserInfo({ ...userInfo, oldPassword: e.target.value })}
                    />
                </Form.Item>
                <Form.Item name="password">
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Mật khẩu mới"
                        value={userInfo.password}
                        onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
                    />
                </Form.Item>
                <Form.Item name="re-password">
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Xác nhận mật khẩu"
                        value={userInfo.repassword}
                        onChange={(e) => setUserInfo({ ...userInfo, repassword: e.target.value })}
                    />
                </Form.Item>
                {message && <p className="noti-message">{message}</p>}
                <Form.Item>
                    <a className="first-button" onClick={() => history.push("/login")}>
                        Đăng nhập
                    </a>
                    <a className="second-button" onClick={() => history.push("/register")}>
                        Đăng ký
                    </a>
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                        onClick={handleChangePassword}
                    >
                        Đăng ký
                    </Button>
                </Form.Item>
            </Form>
        </StyleChangePasswordForm>
    );
};

export default withRouter(ChangePasswordForm);
