import { call, put } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';

import api from '../../services/api';

import StudentActions from '../ducks/student';

export function* getStudents({ filter }) {
  const url = filter ? `students${filter}` : 'students';
  const response = yield call(api.get, url);

  yield put(StudentActions.getStudentsSuccess(response.data));
}

export function* createStudent({ data }) {
  yield put(toastrActions.clean());
  try {
    const response = yield call(api.post, 'students', data);

    yield put(StudentActions.createStudentsSuccess(response.data));
    yield put(
      toastrActions.add({
        type: 'success',
        title: 'Concluído',
        message: 'Novo aluno inserido com sucesso!',
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

export function* selectStudent({ id }) {
  try {
    const response = yield call(api.get, `students/${id}`);

    yield put(StudentActions.selectStudentsSuccess(response.data));
  } catch (error) {
    yield put(
      toastrActions.add({
        type: 'error',
        title: 'Oops!',
        message: 'Ocorreu um erro ao buscar o aluno selecionado. :(',
      }),
    );
  }
}

export function* updateStudent({ data }) {
  yield put(toastrActions.clean());
  try {
    const student = data;
    const url = `students/${student.id}`;
    delete student.id;
    const response = yield call(api.put, url, data);

    yield put(StudentActions.updateStudentsSuccess(response.data));
    yield put(
      toastrActions.add({
        type: 'success',
        title: 'Concluído',
        message: 'Aluno atualizado com sucesso!',
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
