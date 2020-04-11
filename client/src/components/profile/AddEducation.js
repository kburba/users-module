import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import propTypes from "prop-types";

import { addEducation } from "../../store/actions/profileActions";

import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaField from "../common/TextAreaField";

class AddEducation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      school: "",
      degree: "",
      fieldofstudy: "",
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

    const newEducation = {
      school: this.state.school,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };

    this.props.addEducation(newEducation, this.props.history);
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
              <h1 className="display-4 text-center">Add Your Education</h1>
              <p className="lead text-center">
                Add any developer/programming positions that you have had in the
                past
              </p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.handleSubmit}>
                <TextFieldGroup
                  type="text"
                  placeholder="* School"
                  name="school"
                  onChange={this.onChange}
                  value={this.state.school}
                  error={errors.school}
                />

                <TextFieldGroup
                  type="text"
                  placeholder="* degree"
                  name="degree"
                  onChange={this.onChange}
                  value={this.state.degree}
                  error={errors.degree}
                />

                <TextFieldGroup
                  type="text"
                  placeholder="Field of study"
                  name="fieldofstudy"
                  onChange={this.onChange}
                  value={this.state.fieldofstudy}
                  error={errors.expfieldofstudy}
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

AddEducation.propTypes = {
  errors: propTypes.object.isRequired,
  profile: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  profile: state.profile
});

export default connect(mapStateToProps, { addEducation })(
  withRouter(AddEducation)
);
