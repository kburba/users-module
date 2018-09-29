import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import propTypes from "prop-types";

import { addExperience } from "../../actions/profileActions";

import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaField from "../common/TextAreaField";

class AddExperience extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      company: "",
      location: "",
      from: "",
      to: "",
      current: false,
      description: "",
      disabled: "",
      errors: {}
    };
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onCheck = () => {
    const newCheck = !this.state.current;
    const newDisabled = !this.state.disabled;
    this.setState({
      current: newCheck,
      disabled: newDisabled
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const newExperience = {
      title: this.state.title,
      company: this.state.company,
      expLocation: this.state.expLocation,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };

    this.props.addExperience(newExperience, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="section add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Your Experience</h1>
              <p className="lead text-center">
                Add any developer/programming positions that you have had in the
                past
              </p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.handleSubmit}>
                <TextFieldGroup
                  type="text"
                  placeholder="* Job Title"
                  name="title"
                  onChange={this.onChange}
                  value={this.state.title}
                  error={errors.title}
                />

                <TextFieldGroup
                  type="text"
                  placeholder="* Company"
                  name="company"
                  onChange={this.onChange}
                  value={this.state.company}
                  error={errors.company}
                />

                <TextFieldGroup
                  type="text"
                  placeholder="Location"
                  name="location"
                  onChange={this.onChange}
                  value={this.state.location}
                  error={errors.expLocation}
                />

                <h6>From Date</h6>
                <TextFieldGroup
                  type="date"
                  placeholder="Date"
                  name="from"
                  onChange={this.onChange}
                  value={this.state.from}
                  error={errors.from}
                />

                <h6>To</h6>
                <TextFieldGroup
                  type="date"
                  placeholder="Date"
                  name="to"
                  onChange={this.onChange}
                  value={this.state.to}
                  error={errors.to}
                  disabled={this.state.disabled ? "disabled" : ""}
                />

                <input
                  type="checkbox"
                  className="form-check-input"
                  name="current"
                  id="current"
                  value={this.state.current}
                  checked={this.state.current}
                  onChange={this.onCheck}
                />
                <label htmlFor="current" className="form-check-label">
                  Is current
                </label>

                <TextAreaField
                  type="text"
                  placeholder="Job Description"
                  name="description"
                  onChange={this.onChange}
                  value={this.state.description}
                  error={errors.description}
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

AddExperience.propTypes = {
  errors: propTypes.object.isRequired,
  profile: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { addExperience }
)(withRouter(AddExperience));
