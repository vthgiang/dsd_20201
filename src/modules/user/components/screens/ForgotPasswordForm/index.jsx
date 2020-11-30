import React from "react";
import StyleForgotPasswordForm from "./index.style";
import { Form, Input, Button, Checkbox } from "antd";
import { forgotPassword } from "../../../store/services";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { actions } from "../../../store";
import { Typography } from "antd";
import { withRouter } from "react-router-dom";

const { Title } = Typography;

const ForgotPasswordForm = ({ history }) => {
    const dispatch = useDispatch();

    const [form] = Form.useForm();

    const handleForgotPassword = async () => {
        const res = await forgotPassword(form.getFieldsValue);
    };

    return (
        <StyleForgotPasswordForm>
            <Title level={2}>Hệ thống giám sát bằng Drone</Title>
            <h2>Quên mật khẩu</h2>
            <Form
                form={form}
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
