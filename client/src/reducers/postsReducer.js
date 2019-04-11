import {
  POST_LOADING,
  GET_POSTS,
  ADD_POST,
  DELETE_POST,
  LIKE_POST,
  ADD_COMMENT
} from "./../actions/types";

const initialState = {
  post: null,
  posts: [],
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMMENT:
      const newPosts = state.posts.map(post => {
        if (post._id === action.payload.post_id) {
          return action.payload.response;
        } else {
          return post;
        }
      });
      return { ...state, posts: [...newPosts], loading: false };
    case LIKE_POST:
      let posts = state.posts;
      posts.map(post => {
        // find matching post
        if (post._id === action.payload.post_id) {
          // if this user already liked this post, remove like
          if (
            post.likes.filter(like => like.user === action.payload.user_id)
              .length > 0
          ) {
            const removeIndex = post.likes
              .map(like2 => like2.user.toString())
              .indexOf(action.payload.user_id);

            //splice out of array
            return post.likes.splice(removeIndex, 1);
          } else {
            // add like
            return post.likes.unshift({ user: action.payload.user_id });
          }
        } else {
          return post;
        }
      });
      return { ...state, posts: posts };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => {
          return post._id !== action.payload;
        })
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        loading: false
      };
    case GET_POSTS:
      return { ...state, posts: action.payload, loading: false };
    case POST_LOADING:
      return { ...state, loading: true };
    default:
      return state;
  }
};
