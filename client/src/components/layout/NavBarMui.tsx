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
      flexGrow: 1,
    },
  })
);

function NavBarMUI({ auth, logoutUser }: ReduxProps) {
  const classes = useStyles();

  const guestList = (
    <>
      <Button
        className={classes.menuButton}
        component={RouterLink}
        to="/register"
      >
        Sign Up
      </Button>
      <Button component={RouterLink} to="/login">
        Login
      </Button>
    </>
  );

  const authenticatedList = (
    <>
      <span></span>
      <Button onClick={logoutUser}>Logout</Button>
    </>
  );

  return (
    <div className={classes.root}>
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
          <Typography variant="h6" className={classes.title}>
            Verti App
          </Typography>
          {auth.isAuthenticated ? authenticatedList : guestList}
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
