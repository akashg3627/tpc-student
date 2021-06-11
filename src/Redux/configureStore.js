import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {Jobs} from './Reducer/Jobs/jobs';
import { User } from './Reducer/User/user';
import { Notifications } from './Reducer/Notifications/notifications';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            
            user: User,
            jobs: Jobs,
            notifications: Notifications
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
};