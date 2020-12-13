import { Col, Image, Row } from "antd";
import React from "react";
import StyleLogin from "./login/index.style";
import { IMAGES } from "../../../constants";

const ControllerUser = ({ children }) => {
    return (
        <StyleLogin>
            <Row justify="center" align="middle" className="login-row">
                <Col span={15}>
                    <Row className="login-container">
                        <Col span={12}>
                            <Image src={IMAGES.drone} height="100%" />
                        </Col>
                        <Col className="login-form" span={12}>
                            {children}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </StyleLogin>
    );
};

export default ControllerUser;
