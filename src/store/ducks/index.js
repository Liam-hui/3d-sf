import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import { reducer as location } from './location'

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    location
  });
