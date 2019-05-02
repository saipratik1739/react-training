import environmentSettings from "../../environment/environment";

class Auth {
  constructor () {
    this.tokenData = true;
    this.routerHistory = null;
  }

  login() {
    window.location = environmentSettings.authorizationRedirect;
  }

  logout() {
    console.log("login");
  }

  isAuthenticated() {
    return this.tokenData ? true : false;
  }
}

export default new Auth();
