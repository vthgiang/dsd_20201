import React from 'react';
import { singletonHook } from 'react-singleton-hook';

let LOGGED_IN = true;
let INFO = {
  uid: 11,
  token: '4e3fe3463afd3a705c0be7ec2322c335',
  projectType: 'LUOI_DIEN',
  role: 'MANAGER',
};

const getInitialState = () => ({
  isLoggedIn: true,
  info: null,
});

function useUserStateImpl() {
  const [userState, setUserState] = React.useState({
    ...getInitialState(),
  });

  const updateUserInfo = React.useCallback(async () => {
    if (LOGGED_IN) {
      setUserState({
        isLoggedIn: LOGGED_IN,
        info: INFO,
      });
    } else {
      setUserState({
        ...getInitialState(),
      });
    }
  }, []);

  const login = React.useCallback((info) => {
    LOGGED_IN = true;
    INFO = info || INFO;
    updateUserInfo();
  }, [updateUserInfo]);

  const logout = React.useCallback(() => {
    LOGGED_IN = false;
    updateUserInfo();
  }, [updateUserInfo]);

  React.useEffect(() => {
    updateUserInfo();
  }, [updateUserInfo]);

  return {
    userState,
    updateUserInfo,
    login,
    logout,
  };
}

export const useUserState = singletonHook(
  {
    userState: { ...getInitialState() },
    updateUserInfo: null,
    login: null,
    logout: null,
  },
  useUserStateImpl,
);
