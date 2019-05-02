import React from "react";
import auth from "./auth";
import { shallow } from "enzyme";

describe("Auth Service", () => {
  it("auth - renders without crashing", () => {
    shallow(<auth />);
  });

  it("auth - should perform login", () => {
    auth.login();
  });

  it("auth - should perform logout", () => {
    auth.logout();
  });

  it("auth - should return false if authenticated is set to false", () => {
    auth.tokenData = false;
    expect(auth.isAuthenticated()).toBe(false);
  });
});
