import React from "react";
import ForgotPasswordForm from "../screens/ForgotPasswordForm";
import ControllerUser from "../ControllerUser";

const ForgotPassword = () => {
    return (
        <ControllerUser>
            <ForgotPasswordForm />
        </ControllerUser>
    );
};

export default ForgotPassword;
