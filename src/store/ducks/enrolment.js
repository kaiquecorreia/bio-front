import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */

const { Types, Creators } = createActions({
  getEnrolmentsRequest: ['filter'],
  getEnrolmentsSuccess: ['data'],

  createEnrolmentsRequest: ['data'],
  createEnrolmentsSuccess: ['enrolment'],

  selectEnrolmentsRequest: ['id'],
  selectEnrolmentsSuccess: ['enrolment'],

  updateEnrolmentsRequest: ['data'],
  updateEnrolmentsSuccess: ['enrolment'],

  deleteEnrolmentsRequest: ['id'],
  deleteEnrolmentsSuccess: ['id'],

  cancelEnrolmentsUpdate: null,
});

export const EnrolmentTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = Immutable({
  data: [],
  enrolment: null,
});

/* Reducers */

export const cancelUpdate = state => state.merge({ enrolment: null });

export const getSuccess = (state, { data }) => state.merge({ data });

export const createSuccess = (state, { enrolment }) => state.merge({
  data: [...state.data, enrolment],
});

export const selectSuccess = (state, { enrolment }) => state.merge({ enrolment });

export const updateSuccess = (state, { enrolment }) => state.merge({
  data: [...state.data.filter(c => c._id !== enrolment._id), enrolment],
  enrolment: null,
});
export const deleteSuccess = (state, { id }) => state.merge({
  data: [...state.data.filter(c => c._id !== id)],
  enrolment: null,
});

/* Reducers to types */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_ENROLMENTS_SUCCESS]: getSuccess,
  [Types.CREATE_ENROLMENTS_SUCCESS]: createSuccess,
  [Types.SELECT_ENROLMENTS_SUCCESS]: selectSuccess,
  [Types.UPDATE_ENROLMENTS_SUCCESS]: updateSuccess,
  [Types.CANCEL_ENROLMENTS_UPDATE]: cancelUpdate,
  [Types.DELETE_ENROLMENTS_SUCCESS]: deleteSuccess,
});
