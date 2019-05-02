import React, { Component } from "react";
import { AppBar, Button, Grid, Toolbar, Typography } from "@material-ui/core";
import { withStyles } from '@material-ui/styles';
import AppContext from "../../context/app.context";
import appLogo from '../../../../src/logo.svg';

const styles = {
  logo: {
    width: 175,
    height: 38
  },
  grid: {
    height: "inherit"
  },
  welcomeMsg: {
    fontSize: "1.25rem"
  }
};


class NavbarComponent extends Component {
  static contextType = AppContext;
  constructor () {
    super();
    this.state = {
      pageTitle: '',
      showNavbar: true
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <>
        {this.state.showNavbar ? (
          <>
            <AppBar>
              <Toolbar>
                <Grid
                  container
                  justify="space-between"
                  alignContent="center"
                >
                  <Grid item>
                    <img
                      alt="United Health Care Logo"
                      className={classes.logo}
                      src={appLogo}
                    />
                  </Grid>
                  <Grid item>
                    <Typography className={classes.welcomeMsg} inline variant="subtitle2">
                      WELCOME USER
                    </Typography>
                    <Button
                      data-id="logout-btn"
                      variant="text"
                      size="large"
                      color="primary"
                    >
                      Logout
                    </Button>
                  </Grid>
                </Grid>
              </Toolbar>
            </AppBar>
          </>
        ) : (
            <div />
          )}
      </>
    );
  }
}

export default withStyles(styles)(NavbarComponent);
