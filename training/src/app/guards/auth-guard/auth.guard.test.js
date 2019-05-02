import React from "react";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router";
import { AuthGuard } from "./auth.guard";
import auth from "../../components/Auth/auth";
import AddProviderComponent from "../../components/add-provider/add.provider.component";

describe("Auth Guard", () => {
  it("should render the AddProviderComponent component when the user is authorised", () => {
    auth.tokenData = true;
    const privateRoute = mount(
      <MemoryRouter initialEntries={["/"]}>
        <AuthGuard path="/" component={AddProviderComponent} />
      </MemoryRouter>
    );
    expect(privateRoute.find("AddProviderComponent").length).toEqual(1);
  });

  it("should NOT render the AddProviderComponent component when the user is NOT authorised", () => {
    auth.tokenData = false;
    const privateRoute = mount(
      <MemoryRouter initialEntries={["/"]}>
        <AuthGuard path="/" component={AddProviderComponent} />
      </MemoryRouter>
    );
    expect(privateRoute.find("AddProviderComponent").length).toEqual(0);
  });
});
