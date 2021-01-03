import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import classnames from 'classnames';
import { loginUser } from '../../store/actions/authActions';

import { RootState } from '../../store/reducers';
import { AuthActions } from '../../store/types/authTypes';

import './login.scss';

type FormData = {
  email: string;
  password: string;
};

function Login({ loginUser, authErrors }: LoginProps) {
  const { handleSubmit, register, errors } = useForm<FormData>();

  function onSubmit(data: FormData) {
    loginUser(data);
  }

  return (
    <div className="login">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Log In</h1>
            <p className="lead text-center">
              Sign in to your DevConnector account
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  autoFocus
                  ref={register({ required: 'Required' })}
                  className={classnames('form-control form-control-lg', {
                    'is-invalid': !!authErrors.email || !!errors.email,
                  })}
                />
                {(!!authErrors.email || !!errors.email) && (
                  <div className="invalid-feedback">
                    {authErrors.email || errors.email?.message}
                  </div>
                )}
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  ref={register({ required: 'Required' })}
                  className={classnames('form-control form-control-lg', {
                    'is-invalid': !!authErrors.password || !!errors.password,
                  })}
                />
                {(!!authErrors.password || !!errors.password) && (
                  <div className="invalid-feedback">
                    {authErrors.password || errors.password?.message}
                  </div>
                )}
              </div>
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ auth }: RootState) => ({
  isAuthenticated: auth.isAuthenticated,
  authErrors: auth.errors,
});

const mapDispatchToProps = (dispatch: Dispatch<AuthActions>) => ({
  loginUser: (user: FormData) => dispatch(loginUser(user.email, user.password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

type LoginProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;
