import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */

const { Types, Creators } = createActions({
  getLocationRequest: [],
  getLocationSuccess: ['data'],
  getLocationFailure: [],
});

export const LocationTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = Immutable({
  loading: false,
  data: [],
  error: false,
});

/* Reducers */

const getLocationRequest = (state) => state.merge({
  ...state,
  loading: true,
});

const getLocationSuccess = (state, { data }) => state.merge({
  data,
  loading: false,
  error: false,
});

const getLocationFailure = (state) => state.merge({
  ...state,
  error: true,
  loading: false,
});

/* Reducers to types */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_LOCATION_REQUEST]: getLocationRequest,
  [Types.GET_LOCATION_SUCCESS]: getLocationSuccess,
  [Types.GET_LOCATION_FAILURE]: getLocationFailure,
});
