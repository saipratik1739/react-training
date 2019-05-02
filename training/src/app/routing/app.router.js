import React from "react";
import { Switch, Route } from "react-router-dom";
import LandingComponent from "../components/landing/landing.component";
import AuthCallbackComponent from "../components/auth-callback/auth.callback.component";
import { AuthGuard } from "../guards/auth-guard/auth.guard";
// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/authcb" component={AuthCallbackComponent} />
      <AuthGuard exact path="/" component={LandingComponent} />
    </Switch>
  </main>
);

export default Main;
