import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */

const { Types, Creators } = createActions({
  getCoursesRequest: ['filter'],
  getCoursesSuccess: ['data'],

  createCoursesRequest: ['data'],
  createCoursesSuccess: ['course'],

  selectCoursesRequest: ['id'],
  selectCoursesSuccess: ['course'],

  updateCoursesRequest: ['data'],
  updateCoursesSuccess: ['course'],

  cancelCoursesUpdate: null,

  // searchCoursesRequest: ['search'],
  // searchCoursesSuccess: ['data'],
});

export const CourseTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = Immutable({
  data: [],
  course: null,
});

/* Reducers */

export const cancelUpdate = state => state.merge({ course: null });

export const getSuccess = (state, { data }) => state.merge({ data });

export const createSuccess = (state, { course }) => state.merge({ data: [...state.data, course] });

export const selectSuccess = (state, { course }) => state.merge({ course });

export const updateSuccess = (state, { course }) => state.merge({
  data: [...state.data.filter(c => c._id !== course._id), course],
  course: null,
});

/* Reducers to types */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_COURSES_SUCCESS]: getSuccess,
  [Types.CREATE_COURSES_SUCCESS]: createSuccess,
  [Types.SELECT_COURSES_SUCCESS]: selectSuccess,
  [Types.UPDATE_COURSES_SUCCESS]: updateSuccess,
  [Types.CANCEL_COURSES_UPDATE]: cancelUpdate,
});
