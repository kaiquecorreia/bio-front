import { call, put } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';

import api from '../../services/api';

import EnrolmentActions from '../ducks/enrolment';

export function* getEnrolments({ filter }) {
  const url = filter ? `enrolments${filter}` : 'enrolments';
  const response = yield call(api.get, url);

  yield put(EnrolmentActions.getEnrolmentsSuccess(response.data));
}

export function* createEnrolment({ data }) {
  yield put(toastrActions.clean());
  try {
    const response = yield call(api.post, 'enrolments', data);
    yield put(EnrolmentActions.createEnrolmentsSuccess(response.data));
    yield put(
      toastrActions.add({
        type: 'success',
        title: 'Concluído',
        message: 'Nova matrícula registrada com sucesso!',
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

export function* selectEnrolment({ id }) {
  try {
    const response = yield call(api.get, `enrolments/${id}`);

    yield put(EnrolmentActions.selectEnrolmentsSuccess(response.data));
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

export function* updateEnrolment({ data }) {
  yield put(toastrActions.clean());
  try {
    const enrolment = data;
    const url = `enrolments/${enrolment.id}`;
    delete enrolment.id;
    const response = yield call(api.put, url, data);

    yield put(EnrolmentActions.updateEnrolmentsSuccess(response.data));
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
export function* deleteEnrolment({ id }) {
  yield put(toastrActions.clean());
  try {
    const url = `enrolments/${id}`;
    yield call(api.delete, url);

    yield put(EnrolmentActions.deleteEnrolmentsSuccess(id));
    yield put(
      toastrActions.add({
        type: 'success',
        title: 'Concluído',
        message: 'O aluno não está mais matriculado neste curso!',
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
