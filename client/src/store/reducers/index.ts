import { combineReducers } from 'redux';

import authReducer from './authReducer';
import errorsReducer from './errorsReducer';
import profileReducer from './profileReducer';
import postsReducer from './postsReducer';
import languagesReducer from './languagesReducer';
import servicesReducer from './servicesReducer';
import ordersReducer from './ordersReducer';
import variousReducer from './variousReducer';
import clientsReducer from './clientsReducer';
import { routerReducer } from 'react-router-redux';

const RootReducer = combineReducers({
    auth: authReducer,
    clientsReducer,
    errors: errorsReducer,
    languagesReducer,
    ordersReducer,
    posts: postsReducer,
    profile: profileReducer,
    routing: routerReducer,
    servicesReducer,
    variousReducer,
});

export default RootReducer;

export type RootState = ReturnType<typeof RootReducer>;
