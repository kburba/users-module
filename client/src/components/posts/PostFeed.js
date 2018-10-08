import React, { Component } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts, deletePost, likePost } from "../../actions/postActions";

import PostItem from "./PostItem";
import Spinner from "../common/Spinner";

class PostFeed extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  handleDelete = id => {
    console.log(id);
    this.props.deletePost(id);
  };

  handleLike = id => {
    this.props.likePost(id);
  };

  render() {
    const { posts, loading } = this.props.posts;
    let postsContent;

    if (posts === null || loading) {
      postsContent = <Spinner />;
    } else {
      if (posts.length === 0) {
        postsContent = "No posts yet.";
      } else {
        postsContent = posts.map((post, index) => {
          return (
            <PostItem
              key={index}
              post={post}
              auth={this.props.auth}
              handleDelete={this.handleDelete}
              handleLike={this.handleLike}
            />
          );
        });
      }
    }
    return <div className="posts">{postsContent}</div>;
  }
}

PostFeed.propTypes = {
  getPosts: propTypes.func.isRequired,
  deletePost: propTypes.func.isRequired,
  likePost: propTypes.func.isRequired,
  posts: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  posts: state.posts
});

export default connect(
  mapStateToProps,
  { getPosts, deletePost, likePost }
)(PostFeed);
