import React from "react";
import { shallow } from "enzyme";
import { unwrap } from '@material-ui/core/test-utils'
import NavbarComponent from "./navbar.component";
import observableHandlerService from "../../service/observable-handler/observable-handler.service";

describe("Navbar Component", () => {

  const NavbarComponentNaked = unwrap(NavbarComponent);

  it("should renders without crashing", () => {
    shallow(<NavbarComponentNaked classes={{}} />);
  });

  it('should handle onUserAuthenticated observable', () => {
    const wrapper = shallow(<NavbarComponentNaked classes={{}} />);
    const instance = wrapper.instance();
    observableHandlerService.broadcastUserAuthenticated();
    expect(instance.state.showNavbar).toBe(true);
  });

  it('should handle onSubheaderStateChange observable with route is /rfp', () => {
    const wrapper = shallow(<NavbarComponentNaked classes={{}} />);
    const instance = wrapper.instance();
    observableHandlerService.broadcastSubheaderChange('/rfp');
    expect(instance.state.currrentRoute).toBe('/rfp');
    expect(instance.state.backButtonRoute).toBe('/');
    expect(instance.state.pageTitle).toBe('REQUEST FOR PARTICIPATION');
  });

  it('should handle onSubheaderStateChange observable with route is /home', () => {
    const wrapper = shallow(<NavbarComponentNaked classes={{}} />);
    const instance = wrapper.instance();
    observableHandlerService.broadcastSubheaderChange('/');
    expect(instance.state.currrentRoute).toBe('/');
    expect(instance.state.backButtonRoute).toBe('');
    expect(instance.state.pageTitle).toBe('NETWORK PARTICIPATION');
  });

  it('should handle onSubheaderStateChange observable with route is /testError', () => {
    const wrapper = shallow(<NavbarComponentNaked classes={{}} />);
    const instance = wrapper.instance();
    observableHandlerService.broadcastSubheaderChange('/testError');
    expect(instance.state.currrentRoute).toBe('/testError');
    expect(instance.state.backButtonRoute).toBe('');
    expect(instance.state.pageTitle).toBe('');
  });

});
