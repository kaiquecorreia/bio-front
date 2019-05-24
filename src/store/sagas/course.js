import { call, put } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';

import api from '../../services/api';

import CourseActions from '../ducks/course';

export function* getCourses({ filter }) {
  const url = filter ? `courses${filter}` : 'courses';
  const response = yield call(api.get, url);

  yield put(CourseActions.getCoursesSuccess(response.data));
}

export function* createCourse({ data }) {
  yield put(toastrActions.clean());
  try {
    const response = yield call(api.post, 'courses', data);

    yield put(CourseActions.createCoursesSuccess(response.data));
    yield put(
      toastrActions.add({
        type: 'success',
        title: 'Concluído',
        message: 'Novo curso inserido com sucesso!',
      }),
    );
  } catch (error) {
    yield put(
      toastrActions.add({
        type: 'error',
        title: 'Oops!',
        message: error.response.data.error,
      }),
    );
  }
}

export function* selectCourse({ id }) {
  try {
    const response = yield call(api.get, `courses/${id}`);

    yield put(CourseActions.selectCoursesSuccess(response.data));
  } catch (error) {
    yield put(
      toastrActions.add({
        type: 'error',
        title: 'Oops!',
        message: 'Ocorreu um erro ao buscar o curso selecionado. :(',
      }),
    );
  }
}

export function* updateCourse({ data }) {
  yield put(toastrActions.clean());
  try {
    const course = data;
    const url = `courses/${course.id}`;
    delete course.id;
    const response = yield call(api.put, url, data);

    yield put(CourseActions.updateCoursesSuccess(response.data));
    yield put(
      toastrActions.add({
        type: 'success',
        title: 'Concluído',
        message: 'Curso atualizado com sucesso!',
      }),
    );
  } catch (error) {
    yield put(
      toastrActions.add({
        type: 'error',
        title: 'Oops!',
        message: error.response.data.error,
      }),
    );
  }
}
