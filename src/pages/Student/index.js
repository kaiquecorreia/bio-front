import React, { Component } from 'react';

import PropTypes from 'prop-types';
// import moment from 'moment';
import timezone from 'moment-timezone';
import moment, { now } from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import StudentActions from '../../store/ducks/student';

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

class Student extends Component {
  static propTypes = {
    getStudentsRequest: PropTypes.func.isRequired,
    createStudentsRequest: PropTypes.func.isRequired,
    selectStudentsRequest: PropTypes.func.isRequired,
    updateStudentsRequest: PropTypes.func.isRequired,
    cancelStudentsUpdate: PropTypes.func.isRequired,
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
  };

  state = {
    nameInput: '',
    emailInput: '',
    dateBirthInput: '2000-01-01',
    edited: false,
    radioInput: 'name',
  };

  componentDidMount() {
    const { getStudentsRequest } = this.props;

    getStudentsRequest();
  }

  handleInputChange = (e) => {
    const {
      student: { student },
    } = this.props;
    const { edited } = this.state;
    if (!edited) {
      this.setState({ [e.target.name]: e.target.value, edited: false });
    } else if (e.target.name === 'nameInput') {
      this.setState({
        [e.target.name]: e.target.value,
        emailInput: student.email,
        dateBirthInput: student.dateBirth,
        edited: false,
      });
    } else if (e.target.name === 'emailInput') {
      this.setState({
        [e.target.name]: e.target.value,
        nameInput: student.name,
        dateBirthInput: student.dateBirth,
        edited: false,
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value,
        nameInput: student.name,
        emailInput: student.email,
        edited: false,
      });
    }
  };

  handleStudent = (e) => {
    e.preventDefault();
    const {
      student: { student },
      createStudentsRequest,
      updateStudentsRequest,
    } = this.props;

    const { nameInput: name, emailInput: email, dateBirthInput: dateBirth } = this.state;

    if (!student) {
      createStudentsRequest({ name, email, dateBirth });
    } else {
      updateStudentsRequest({
        id: student._id,
        name,
        email,
        dateBirth,
      });
    }
    this.setState({
      nameInput: '',
      emailInput: '',
      dateBirthInput: '2000-01-01',
      edited: false,
    });
  };

  handleSelectStudent = (id) => {
    const { selectStudentsRequest } = this.props;
    selectStudentsRequest(id);
    this.setState({ edited: true });
  };

  cancelUpdate = () => {
    const { cancelStudentsUpdate } = this.props;
    cancelStudentsUpdate();
    this.setState({ edited: false });
  };

  handleSearch = (e) => {
    const { getStudentsRequest } = this.props;
    const { radioInput } = this.state;
    const search = `?${radioInput}=${e.target.value}`;
    getStudentsRequest(search);
  };

  render() {
    const {
      student: { data, student },
    } = this.props;
    const {
      nameInput, emailInput, dateBirthInput, edited, radioInput,
    } = this.state;

    return (
      <Container>
        <h1>Gerenciamento de Alunos</h1>
        <Form onSubmit={this.handleStudent}>
          <label htmlFor="name">
            Nome
            <input
              type="text"
              name="nameInput"
              value={student && edited ? student.name : nameInput}
              placeholder="Informe o nome do aluno"
              onChange={this.handleInputChange}
              required
            />
          </label>

          <label htmlFor="emailInput">
            E-mail
            <input
              type="text"
              name="emailInput"
              value={student && edited ? student.email : emailInput}
              onChange={this.handleInputChange}
              required
            />
          </label>
          <label htmlFor="dateBirthInput">
            Data de nascimento
            <input
              type="date"
              name="dateBirthInput"
              value={
                student && edited
                  ? timezone(student.dateBirth)
                    .add(1, 'days')
                    .format('YYYY-MM-DD')
                  : timezone(dateBirthInput)
                    .add(1, 'days')
                    .format('YYYY-MM-DD')
              }
              onChange={this.handleInputChange}
            />
          </label>

          <button type="submit">
            <span>{!student ? 'Registrar aluno' : 'Editar aluno'}</span>
          </button>
          {student && (
            <button type="button" onClick={this.cancelUpdate}>
              <span>x</span>
            </button>
          )}
        </Form>
        <Search>
          <LabelSearch>
            <label htmlFor="check-name">
              Nome
              <input
                type="radio"
                name="radio-search"
                id="check-name"
                checked={radioInput === 'name'}
                onClick={() => this.setState({ radioInput: 'name' })}
              />
            </label>
            <label htmlFor="check-email">
              E-mail
              <input
                type="radio"
                name="radio-search"
                id="check-email"
                checked={radioInput === 'email'}
                onClick={() => this.setState({ radioInput: 'email' })}
              />
            </label>
          </LabelSearch>
          <SearchInput>
            <img src={SearchIcon} alt="Buscar" />
            <input
              type="text"
              id="search"
              placeholder="Buscar alunos"
              autoComplete="off"
              onChange={this.handleSearch}
            />
          </SearchInput>
        </Search>
        <TableScroll>
          <Table>
            <thead>
              <TableRows>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Data de nascimento</th>
                <th>Ações</th>
              </TableRows>
            </thead>
            <tbody>
              {data.map(student => (
                <TableRows key={student._id}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.dateBirth}</td>
                  <td>
                    <EditButton
                      type="button"
                      onClick={() => {
                        this.handleSelectStudent(student._id);
                      }}
                    >
                      Editar
                    </EditButton>
                    <ExcludeButton type="button" onClick={() => {}}>
                      Excluir
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
  student: state.student,
});

const mapDispatchToProps = dispatch => bindActionCreators(StudentActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Student);
