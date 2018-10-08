import React, { Component } from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";

import { addComment } from "../../actions/postActions";
import TextAreaField from "../common/TextAreaField";

class CommentForm extends Component {
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

    const newComment = {
      text: this.state.text,
      name: this.props.auth.user.name,
      avatar: this.props.auth.user.avatar,
      post_id: this.props.postID
    };
    this.props.addComment(newComment);
  };
  render() {
    const { errors } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="col-auto">
            <TextAreaField
              name="text"
              placeholder="Add you comment here"
              value={this.state.text}
              error={errors.text}
              onChange={this.handleChange}
            />
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-sm btn-outline-info">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

CommentForm.propTypes = {
  addComment: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
  errors: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { addComment }
)(CommentForm);
