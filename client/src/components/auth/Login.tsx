import React, { Dispatch, useEffect } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../store/actions/authActions';

import { customHistory as history } from '../../App';
import { RootState } from '../../store/reducers';
import { AuthActions } from '../../store/types/authTypes';
import { useForm } from 'react-hook-form';
import classnames from 'classnames';

type FormData = {
    email: string;
    password: string;
};

function Login({ loginUser, isAuthenticated, errors }: LoginProps) {
    const { handleSubmit, register } = useForm<FormData>();

    useEffect(() => {
        if (isAuthenticated) {
            history.push('/dashboard');
        }
    }, [isAuthenticated]);

    function onSubmit(data: FormData) {
        loginUser(data);
    }

    return (
        <div className="login">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Log In</h1>
                        <p className="lead text-center">Sign in to your DevConnector account</p>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="Email Address"
                                    autoFocus={true}
                                    ref={register()}
                                    className={classnames('form-control form-control-lg', {
                                        'is-invalid': !!errors.email,
                                    })}
                                />
                                {!!errors.email && <div className="invalid-feedback">{errors.email}</div>}
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    ref={register()}
                                    className={classnames('form-control form-control-lg', {
                                        'is-invalid': !!errors.password,
                                    })}
                                />
                                {!!errors.password && <div className="invalid-feedback">{errors.password}</div>}
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
    errors: auth.errors,
});

const mapDispatchToProps = (dispatch: Dispatch<AuthActions>) => ({
    loginUser: (user: FormData) => dispatch(loginUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

type LoginProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
