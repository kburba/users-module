import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../../store/actions/authActions';

import TextFieldGroup from '../common/TextFieldGroup';

class Register extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  handleInputChange = (e) => {
    const { value } = e.target;
    const { name } = e.target;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form onSubmit={this.handleSubmit}>
                <TextFieldGroup
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleInputChange}
                  error={errors.name}
                />

                <TextFieldGroup
                  type="email"
                  placeholder="Email Address"
                  value={this.state.email}
                  name="email"
                  onChange={this.handleInputChange}
                  error={errors.email}
                  info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                />

                <TextFieldGroup
                  type="password"
                  placeholder="Password"
                  value={this.state.password}
                  name="password"
                  onChange={this.handleInputChange}
                  error={errors.password}
                />

                <TextFieldGroup
                  type="password"
                  placeholder="Confirm password"
                  value={this.state.password2}
                  name="password2"
                  onChange={this.handleInputChange}
                  error={errors.password2}
                />

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
  errors: propTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  registerUser: (newUser, history) => dispatch(registerUser(newUser, history)),
});

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Register));
