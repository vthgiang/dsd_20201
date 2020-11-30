import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MainLayout from "./containers/MainLayout";
import Home from "./pages/Home";
import AppRouter from "./pages/routes";
import { Provider } from "react-redux";
import store, { persistor } from "../src/services";
import { PersistGate } from "redux-persist/lib/integration/react";

import Login from "../src/modules/user/components/login";
import ForgotPassword from "../src/modules/user/components/forgotPassword";
import Register from "../src/modules/user/components/register";
import ChangePassword from "../src/modules/user/components/changePassword";
import { setHeaders } from "./services/axios";

const App = () => {

  useEffect(() => {
    if(localStorage.getItem('project-type')) {
      setHeaders({'project-type': localStorage.getItem('project-type')});
      setHeaders({'token': localStorage.getItem('token')});
    }
  }, [])

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/forgot-password" component={ForgotPassword} />
            <Route exact path="/change-password" component={ChangePassword} />
            <MainLayout>
              <AppRouter />
            </MainLayout>
          </Switch>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
