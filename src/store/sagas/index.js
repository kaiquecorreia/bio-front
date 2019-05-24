import { all, takeLatest } from 'redux-saga/effects';

import {
  getCourses, createCourse, selectCourse, updateCourse,
} from './course';
import {
  getStudents, createStudent, selectStudent, updateStudent,
} from './student';
import {
  getEnrolments,
  createEnrolment,
  selectEnrolment,
  updateEnrolment,
  deleteEnrolment,
} from './enrolment';
import { CourseTypes } from '../ducks/course';
import { StudentTypes } from '../ducks/student';
import { EnrolmentTypes } from '../ducks/enrolment';

export default function* rootSaga() {
  return yield all([
    takeLatest(CourseTypes.GET_COURSES_REQUEST, getCourses),
    takeLatest(CourseTypes.CREATE_COURSES_REQUEST, createCourse),
    takeLatest(CourseTypes.SELECT_COURSES_REQUEST, selectCourse),
    takeLatest(CourseTypes.UPDATE_COURSES_REQUEST, updateCourse),

    takeLatest(StudentTypes.GET_STUDENTS_REQUEST, getStudents),
    takeLatest(StudentTypes.CREATE_STUDENTS_REQUEST, createStudent),
    takeLatest(StudentTypes.SELECT_STUDENTS_REQUEST, selectStudent),
    takeLatest(StudentTypes.UPDATE_STUDENTS_REQUEST, updateStudent),

    takeLatest(EnrolmentTypes.GET_ENROLMENTS_REQUEST, getEnrolments),
    takeLatest(EnrolmentTypes.CREATE_ENROLMENTS_REQUEST, createEnrolment),
    takeLatest(EnrolmentTypes.SELECT_ENROLMENTS_REQUEST, selectEnrolment),
    takeLatest(EnrolmentTypes.UPDATE_ENROLMENTS_REQUEST, updateEnrolment),
    takeLatest(EnrolmentTypes.DELETE_ENROLMENTS_REQUEST, deleteEnrolment),
  ]);
}
