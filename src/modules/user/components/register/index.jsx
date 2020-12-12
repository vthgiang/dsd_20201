import React from 'react';
import RegisterForm from '../screens/RegisterForm';
import ControllerUser from "../ControllerUser";

const Register = () => {
    return (
        <ControllerUser>
            <RegisterForm />
        </ControllerUser>
    );
};

export default Register;
