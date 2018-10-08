import React, { Component } from "react";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

export default class Comments extends Component {
  render() {
    const { comments } = this.props;
    const commentsAll = comments.map(comment => {
      return <CommentItem key={comment._id} data={comment} />;
    });
    return (
      <div className="row">
        <div className="col-md-12">
          {commentsAll}
          <CommentForm postID={this.props.postID} />
        </div>
      </div>
    );
  }
}
