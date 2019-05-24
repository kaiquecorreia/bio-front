import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */

const { Types, Creators } = createActions({
  getStudentsRequest: ['filter'],
  getStudentsSuccess: ['data'],

  createStudentsRequest: ['data'],
  createStudentsSuccess: ['student'],

  selectStudentsRequest: ['id'],
  selectStudentsSuccess: ['student'],

  updateStudentsRequest: ['data'],
  updateStudentsSuccess: ['student'],

  cancelStudentsUpdate: null,
});

export const StudentTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = Immutable({
  data: [],
  student: null,
});

/* Reducers */

export const cancelUpdate = state => state.merge({ student: null });

export const getSuccess = (state, { data }) => state.merge({ data });

export const createSuccess = (state, { student }) => state.merge({
  data: [...state.data, student],
});

export const selectSuccess = (state, { student }) => state.merge({ student });

export const updateSuccess = (state, { student }) => state.merge({
  data: [...state.data.filter(c => c._id !== student._id), student],
  student: null,
});

/* Reducers to types */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_STUDENTS_SUCCESS]: getSuccess,
  [Types.CREATE_STUDENTS_SUCCESS]: createSuccess,
  [Types.SELECT_STUDENTS_SUCCESS]: selectSuccess,
  [Types.UPDATE_STUDENTS_SUCCESS]: updateSuccess,
  [Types.CANCEL_STUDENTS_UPDATE]: cancelUpdate,
});
