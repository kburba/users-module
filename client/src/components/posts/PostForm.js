import React, { Component } from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";

import { addPost } from "../../store/actions/postActions";
import TextAreaField from "../common/TextAreaField";

class PostForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();

    const newPost = {
      text: this.state.text,
      name: this.props.auth.user.name,
      avatar: this.props.auth.user.avatar
    };

    this.props.addPost(newPost);
    this.setState({ text: "" });
  };
  render() {
    const { errors } = this.state;

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Say Somthing...</div>
          <div className="card-body">
            <div className="col-md-2">
              <img
                className="rounded-circle d-none d-md-block"
                src={this.props.auth.avatar}
                alt={this.props.auth.name}
              />
              <br />
              <p className="text-center">{this.props.auth.name}</p>
            </div>
            <div className="col-md-6">
              <form onSubmit={this.handleSubmit}>
                <TextAreaField
                  name="text"
                  placeholder="Create a post"
                  value={this.state.text}
                  error={errors.text}
                  onChange={this.handleChange}
                />
                <button type="submit" className="btn btn-dark">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PostForm.propTypes = {
  addPost: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
  errors: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(mapStateToProps, { addPost })(PostForm);
