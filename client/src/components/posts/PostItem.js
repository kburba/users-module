import React, { Component } from "react";

export default class PostItem extends Component {
  render() {
    const { post, auth, handleDelete, handleLike } = this.props;
    let deleteButton;

    if (post.user === auth.user.id) {
      deleteButton = (
        <button
          onClick={() => handleDelete(post._id)}
          type="button"
          className="btn btn-danger mr-1"
        >
          <i className="fas fa-times" />
        </button>
      );
    } else {
      deleteButton = null;
    }
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={post.avatar}
                alt={post.name}
              />
            </a>
            <br />
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
            <button
              onClick={() => handleLike(post._id)}
              type="button"
              className="btn btn-light mr-1"
            >
              <i className="text-info fas fa-thumbs-up" />
              <span className="badge badge-light">{post.likes.length}</span>
            </button>
            <a href="post.html" className="btn btn-info mr-1">
              Comments
            </a>
            {deleteButton}
          </div>
        </div>
      </div>
    );
  }
}
