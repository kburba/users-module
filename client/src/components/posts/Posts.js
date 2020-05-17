import React, { Component } from 'react';

import PostForm from './PostForm';
import PostFeed from './PostFeed';

class Posts extends Component {
  render() {
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
              <PostFeed />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Posts;
