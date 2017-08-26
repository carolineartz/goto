import { combineReducers } from 'redux';

import app from './app';
import images from './images';
import rounds from './rounds';

export default combineReducers({ app, images, rounds });
