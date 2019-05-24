import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EnrolmentActions from '../../store/ducks/enrolment';
import StudentsActions from '../../store/ducks/student';
import CoursesActions from '../../store/ducks/course';

import {
  Container,
  Form,
  Table,
  TableRows,
  EditButton,
  ExcludeButton,
  SearchInput,
  TableScroll,
  Search,
  LabelSearch,
} from '../styles';

import SearchIcon from '../../assets/images/search.png';

class Enrolment extends Component {
  static propTypes = {
    getEnrolmentsRequest: PropTypes.func.isRequired,
    createEnrolmentsRequest: PropTypes.func.isRequired,
    selectEnrolmentsRequest: PropTypes.func.isRequired,
    updateEnrolmentsRequest: PropTypes.func.isRequired,
    cancelEnrolmentsUpdate: PropTypes.func.isRequired,
    enrolment: PropTypes.shape({
      data: PropTypes.arrayOf(
        PropTypes.shape({
          _id: PropTypes.string,
        }),
      ),
    }).isRequired,
    student: PropTypes.shape({
      data: PropTypes.arrayOf(
        PropTypes.shape({
          _id: PropTypes.string,
          name: PropTypes.string,
          email: PropTypes.string,
          dateBirth: PropTypes.date,
        }),
      ),
    }).isRequired,
    course: PropTypes.shape({
      data: PropTypes.arrayOf(
        PropTypes.shape({
          _id: PropTypes.string,
          title: PropTypes.string,
          description: PropTypes.string,
        }),
      ),
    }).isRequired,
  };

  state = {
    courseInput: '',
    studentInput: '',
    edited: false,
    radioInput: 'student',
  };

  componentDidMount() {
    const { getEnrolmentsRequest, getStudentsRequest, getCoursesRequest } = this.props;

    getEnrolmentsRequest();
    getStudentsRequest();
    getCoursesRequest();
  }

  handleInputChange = (e) => {
    const {
      enrolment: { enrolment },
    } = this.props;
    const { edited } = this.state;
    if (!edited) {
      this.setState({ [e.target.name]: e.target.value, edited: false });
    } else if (e.target.name === 'courseInput') {
      this.setState({
        [e.target.name]: e.target.value,
        studentInput: enrolment.student._id,
        edited: false,
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value,
        courseInput: enrolment.course._id,
        edited: false,
      });
    }
  };

  handleEnrolment = (e) => {
    e.preventDefault();
    const {
      enrolment: { enrolment },
      createEnrolmentsRequest,
      updateEnrolmentsRequest,
    } = this.props;

    const { courseInput: course, studentInput: student } = this.state;

    if (!enrolment) {
      createEnrolmentsRequest({ course, student });
    } else {
      updateEnrolmentsRequest({ id: enrolment._id, course, student });
    }
  };

  handleSelectEnrolment = (id) => {
    const { selectEnrolmentsRequest } = this.props;
    selectEnrolmentsRequest(id);
    this.setState({ edited: true });
  };

  cancelUpdate = () => {
    const { cancelEnrolmentsUpdate } = this.props;
    cancelEnrolmentsUpdate();
    this.setState({ edited: false });
  };

  handleSearch = (e) => {
    const { getEnrolmentsRequest } = this.props;
    const { radioInput } = this.state;
    const search = `?${radioInput}=${e.target.value}`;
    getEnrolmentsRequest(search);
  };

  renderStudentOptions = student => (
    <option key={student._id} value={student._id}>
      {student.name}
      {' -> Email: '}
      {student.email}
    </option>
  );

  renderCourseOptions = course => (
    <option key={course._id} value={course._id}>
      {course.title}
      {' -> '}
      {course.description}
    </option>
  );

  render() {
    const {
      enrolment: { data, enrolment },
      student: { data: students },
      course: { data: courses },
      deleteEnrolmentsRequest,
    } = this.props;
    const { radioInput } = this.state;
    return (
      <Container>
        <h1>Gerenciamento de matrículas</h1>
        <Form onSubmit={this.handleEnrolment}>
          <label htmlFor="studentInput">
            Aluno
            <select name="studentInput" id="studentInput" onChange={this.handleInputChange}>
              <option>Selecione um aluno</option>
              {students.map(this.renderStudentOptions)}
            </select>
          </label>
          <label htmlFor="courseInput">
            Curso
            <select name="courseInput" id="courseInput" onChange={this.handleInputChange}>
              <option>Selecione um curso</option>
              {courses.map(this.renderCourseOptions)}
            </select>
          </label>

          <button type="submit">
            <span>{!enrolment ? 'Matricular' : 'Editar matrícula'}</span>
          </button>
          {enrolment && (
            <button type="button" onClick={this.cancelUpdate}>
              <span>x</span>
            </button>
          )}
        </Form>
        <TableScroll>
          <Table>
            <thead>
              <TableRows>
                <th>Aluno</th>
                <th>Curso</th>
                <th>Ações</th>
              </TableRows>
            </thead>
            <tbody>
              {data.map(enrolment => (
                <TableRows key={enrolment._id}>
                  <td>{enrolment.student.name}</td>
                  <td>{enrolment.course.title}</td>
                  <td>
                    <ExcludeButton
                      type="button"
                      onClick={() => {
                        deleteEnrolmentsRequest(enrolment._id);
                      }}
                    >
                      Desfazer matrícula
                    </ExcludeButton>
                  </td>
                </TableRows>
              ))}
            </tbody>
          </Table>
        </TableScroll>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  enrolment: state.enrolment,
  student: state.student,
  course: state.course,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    ...EnrolmentActions,
    ...StudentsActions,
    ...CoursesActions,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Enrolment);
