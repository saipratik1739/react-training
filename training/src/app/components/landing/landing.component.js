import React, { Component } from "react";
import { AppBar, Button, Grid, Toolbar, Typography } from "@material-ui/core";
import { withStyles } from '@material-ui/styles';
import AppContext from "../../context/app.context";

const styles = {
};


class LandingComponent extends Component {
  static contextType = AppContext;
  constructor () {
    super();
    this.state = {
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
          THIS IS LANDING COMPONENT
      </div>
    );
  }
}

export default withStyles(styles)(LandingComponent);
