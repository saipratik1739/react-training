import React, { Component } from "react";
import axios from "axios";
import auth from "../Auth/auth";
import AppContext from "../../context/app.context";
import environmentSettings from "../../environment/environment";
import { withRouter } from "react-router-dom";

/* istanbul ignore next */
withRouter(props => <AuthCallbackComponent {...props} />);

class AuthCallbackComponent extends Component {
  static contextType = AppContext;

  /**
   * This function is a part of react life cycle hook and mainly use for fetching any data over http.
   * @returns void
   */
  componentDidMount() {
    this.props.history.push("/");
  }

  render() {
    return (
      <div>
        <h5> Authenticating please wait... </h5>
      </div>
    );
  }
}

export default AuthCallbackComponent;
