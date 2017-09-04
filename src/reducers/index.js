import { combineReducers } from 'redux';

import app from './app';
import images from './images';
import round from './round';
import game from './game';

export default combineReducers({ app, images, round, game });
