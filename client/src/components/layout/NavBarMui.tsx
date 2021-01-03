import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { logoutUser } from '../../store/actions/authActions';
import { AuthActions } from '../../store/types/authTypes';
import { Link as RouterLink } from 'react-router-dom';

import { RootState } from '../../store/reducers';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
      color: 'white',
    },
    title: {
      color: 'white',
      textDecoration: 'none',
    },
    mainMenu: {
      marginRight: theme.spacing(5),
    },
  })
);

function NavBarMUI({ auth, logoutUser }: ReduxProps) {
  const classes = useStyles();

  const guestList = (
    <div>
      <Button
        className={classes.menuButton}
        component={RouterLink}
        to="/signup"
      >
        Sign Up
      </Button>
      <Button className={classes.menuButton} component={RouterLink} to="/login">
        Login
      </Button>
    </div>
  );

  const authenticatedList = (
    <div>
      <span></span>
      <Button className={classes.menuButton} onClick={logoutUser}>
        Logout
      </Button>
    </div>
  );

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography
            className={classes.title}
            variant="h6"
            component={RouterLink}
            to="/"
          >
            Verti App
          </Typography>
          <Box flexGrow="1" display="flex" justifyContent="flex-end">
            {auth.isAuthenticated && (
              <div className={classes.mainMenu}>
                <Button
                  className={classes.menuButton}
                  component={RouterLink}
                  to="/orders"
                >
                  Orders
                </Button>
                <Button
                  className={classes.menuButton}
                  component={RouterLink}
                  to="/clients"
                >
                  Clients
                </Button>
                <Button
                  className={classes.menuButton}
                  component={RouterLink}
                  to="/services"
                >
                  Services
                </Button>
                <Button
                  className={classes.menuButton}
                  component={RouterLink}
                  to="/languages"
                >
                  Languages
                </Button>
              </div>
            )}
            {auth.isAuthenticated ? authenticatedList : guestList}
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapDispatchToProps = (dispatch: Dispatch<AuthActions>) => ({
  logoutUser: () => dispatch(logoutUser()),
});

const mapStateToProps = ({ auth }: RootState) => ({
  auth: auth,
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBarMUI);

type ReduxProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;
