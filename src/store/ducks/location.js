import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */

const { Types, Creators } = createActions({
  setLocation: ['location'],
});

export const LocationTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = Immutable({
  current: 'home'
});

/* Reducers */

const setLocation = (state, { location }) => state.merge({
  current: location
});

/* Reducers to types */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_LOCATION]: setLocation,
});
