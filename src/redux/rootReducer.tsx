import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import repoReducer from './slices/repoReducer';
import userReducer from './slices/userReducer';
import bookmarkReducer from './slices/bookmarkReducer';

const rootPersistConfig = {
    key: 'root',
    storage: storage,
    keyPrefix: 'redux-',
    whitelist: ['settings']
};

const rootReducer = combineReducers({
    repo: repoReducer,
    user: userReducer,
    bookmark: bookmarkReducer,
});

export { rootPersistConfig, rootReducer };