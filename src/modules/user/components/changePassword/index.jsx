import React from 'react';
import ChangePasswordForm from '../screens/ChangePasswordForm';
import ControllerUser from "../ControllerUser";

const ChangePassword = () => {
    return (
        <ControllerUser>
            <ChangePasswordForm />
        </ControllerUser>
    );
};

export default ChangePassword;
