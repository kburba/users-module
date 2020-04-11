import { combineReducers } from "redux";

import authReducer from "./authReducer";
import errorsReducer from "./errorsReducer";
import profileReducer from "./profileReducer";
import postsReducer from "./postsReducer";
import languagesReducer from "./languagesReducer";
import servicesReducer from "./servicesReducer";
import ordersReducer from "./ordersReducer";
import { routerReducer } from 'react-router-redux';


const RootReducer = combineReducers({
  auth: authReducer,
  errors: errorsReducer,
  profile: profileReducer,
  posts: postsReducer,
  languagesReducer,
  servicesReducer,
  ordersReducer,
  routing: routerReducer
});

export default RootReducer;


export type RootState = ReturnType<typeof RootReducer>