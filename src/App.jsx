import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MainLayout from "./containers/MainLayout";
import appRoute from "./pages/routes";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route exact path="/login" component={() => <div>Login</div>} /> */}
        <Route>
          <MainLayout>{appRoute()}</MainLayout>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
