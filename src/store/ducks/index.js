import { combineReducers } from 'redux';
import { reducer as toastr } from 'react-redux-toastr';

import { reducer as course } from './course';
import { reducer as student } from './student';
import { reducer as enrolment } from './enrolment';

export default combineReducers({
  course,
  student,
  enrolment,
  toastr,
});
