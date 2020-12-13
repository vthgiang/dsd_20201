import React, { useState } from "react";
import StyleForgotPasswordForm from "./index.style";
import { Form, Input, Button, Checkbox, notification } from "antd";
import { forgotPassword } from "../../../store/services";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../../store";
import { Typography } from "antd";
import { withRouter } from "react-router-dom";

const { Title } = Typography;

const ForgotPasswordForm = ({ history }) => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const handleForgotPassword = async () => {
        if (!email || email === "") {
            notification.error({
                message: "Lỗi",
                description: "Vui lòng điền email",
            });
            return;
        }
        if (!validateEmail(email)) {
            notification.error({
                message: "Lỗi",
                description: "Email không đúng định dạng",
            });
            return;
        }
        const res = await forgotPassword({ email: email });
        if (res.status == "successful") {
            notification.success({
                message: "Thành công",
                description: "Vui lòng kiểm tra email của bạn",
            });
            setTimeout(() => {
                history.push("/login");
            }, 2500);
        } else {
            notification.error({
                message: "Lỗi",
                description: res.message,
            });
        }
    };

    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    return (
        <StyleForgotPasswordForm>
            <Title level={2}>Hệ thống giám sát bằng Drone</Title>
            <h2>Quên mật khẩu</h2>
            <Form
                name="normal_login"
                initialValues={{
                    remember: true,
                }}
            >
                <Form.Item name="email">
                    <Input
                        prefix={
                            <UserOutlined className="site-form-item-icon" />
                        }
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Item>
                <Form.Item>
                    <a
                        className="first-button"
                        onClick={() => history.push("/login")}
                    >
                        Đăng nhập
                    </a>
                    <a
                        className="second-button"
                        onClick={() => history.push("/register")}
                    >
                        Đăng ký
                    </a>
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                        onClick={handleForgotPassword}
                    >
                        Gửi
                    </Button>
                </Form.Item>
            </Form>
        </StyleForgotPasswordForm>
    );
};

export default withRouter(ForgotPasswordForm);
