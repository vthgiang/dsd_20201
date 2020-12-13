import React from "react";
import LoginForm from "../screens/LoginForm";
import ControllerUser from "../ControllerUser";

const Login = () => {
    return (
        <ControllerUser>
            <LoginForm />
        </ControllerUser>
    );
};

export default Login;
