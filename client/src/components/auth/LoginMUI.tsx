import React, { Dispatch } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm } from 'react-hook-form';
import { RootState } from '../../store/reducers';
import { AuthActions } from '../../store/types/authTypes';
import { loginUser } from '../../store/actions/authActions';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

type FormData = {
  email: string;
  password: string;
};

function LoginMUI({ loginUser, authErrors }: ReduxProps) {
  const classes = useStyles();

  const { handleSubmit, register, errors } = useForm<FormData>();

  function onSubmit(data: FormData) {
    loginUser(data);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            error={!!authErrors.email || !!errors.email}
            inputRef={register({ required: 'Required' })}
            helperText={authErrors.email || errors.email?.message}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={!!authErrors.password || !!errors.password}
            inputRef={register({ required: 'Required' })}
            helperText={authErrors.password || errors.password?.message}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <RouterLink to="/signup">
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </RouterLink>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

const mapStateToProps = ({ auth }: RootState) => ({
  isAuthenticated: auth.isAuthenticated,
  authErrors: auth.errors,
});

const mapDispatchToProps = (dispatch: Dispatch<AuthActions>) => ({
  loginUser: (user: FormData) => dispatch(loginUser(user.email, user.password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginMUI);

type ReduxProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;
