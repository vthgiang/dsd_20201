import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Dashboard from "./Dashboard";

export const routes = [
  {
    path: "/dashboard",
    component: Dashboard,
    exact: true,
  },
  {
    path: "/drones",
    component: () => <div>DroneManagement</div>,
  },
  {
    path: "/payloads",
    component: () => <div>PayloadManagement</div>,
  },
];

export default () => (
  <Switch>
    {routes.map(({ path, exact = false, component: Component, ...rest }) => {
      return (
        <Route
          key={path}
          exact={exact}
          path={path}
          component={Component}
          {...rest}
        />
      );
    })}
    <Redirect to="/dashboard" />
  </Switch>
);
