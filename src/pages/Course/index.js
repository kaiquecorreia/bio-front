import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CourseActions from '../../store/ducks/course';

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

class Course extends Component {
  static propTypes = {
    getCoursesRequest: PropTypes.func.isRequired,
    createCoursesRequest: PropTypes.func.isRequired,
    selectCoursesRequest: PropTypes.func.isRequired,
    updateCoursesRequest: PropTypes.func.isRequired,
    cancelCoursesUpdate: PropTypes.func.isRequired,
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
    titleInput: '',
    descriptionInput: '',
    edited: false,
    radioInput: 'title',
  };

  componentDidMount() {
    const { getCoursesRequest } = this.props;

    getCoursesRequest();
  }

  handleInputChange = (e) => {
    const {
      course: { course },
    } = this.props;
    const { edited } = this.state;
    if (!edited) {
      this.setState({ [e.target.name]: e.target.value, edited: false });
    } else if (e.target.name === 'titleInput') {
      this.setState({
        [e.target.name]: e.target.value,
        descriptionInput: course.description,
        edited: false,
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value,
        titleInput: course.title,
        edited: false,
      });
    }
  };

  handleCourse = (e) => {
    e.preventDefault();
    const {
      course: { course },
      createCoursesRequest,
      updateCoursesRequest,
    } = this.props;

    const { titleInput: title, descriptionInput: description } = this.state;

    if (!course) {
      createCoursesRequest({ title, description });
    } else {
      updateCoursesRequest({ id: course._id, title, description });
    }
    this.setState({ titleInput: '', descriptionInput: '', edited: false });
  };

  handleSelectCourse = (id) => {
    const { selectCoursesRequest } = this.props;
    selectCoursesRequest(id);
    this.setState({ edited: true });
  };

  cancelUpdate = () => {
    const { cancelCoursesUpdate } = this.props;
    cancelCoursesUpdate();
    this.setState({ edited: false });
  };

  handleSearch = (e) => {
    const { getCoursesRequest } = this.props;
    const { radioInput } = this.state;
    const search = `?${radioInput}=${e.target.value}`;
    getCoursesRequest(search);
  };

  render() {
    const {
      course: { data, course },
    } = this.props;

    const {
      titleInput, descriptionInput, edited, radioInput,
    } = this.state;

    return (
      <Container>
        <h1>Gerenciamento de cursos</h1>
        <Form onSubmit={this.handleCourse}>
          <label htmlFor="title">
            Título
            <input
              type="text"
              name="titleInput"
              value={course && edited ? course.title : titleInput}
              placeholder="Informe o título do curso"
              onChange={this.handleInputChange}
              required
            />
          </label>
          <label htmlFor="description">
            Description
            <input
              type="text"
              name="descriptionInput"
              value={course && edited ? course.description : descriptionInput}
              placeholder="Descreva o curso"
              onChange={this.handleInputChange}
            />
          </label>

          <button type="submit">
            <span>{!course ? 'Registrar curso' : 'Editar curso'}</span>
          </button>
          {course && (
            <button type="button" onClick={this.cancelUpdate}>
              <span>x</span>
            </button>
          )}
        </Form>
        <Search>
          <LabelSearch>
            <label htmlFor="check-title">
              Título
              <input
                type="radio"
                name="radio-search"
                id="check-title"
                checked={radioInput === 'title'}
                onClick={() => this.setState({ radioInput: 'title' })}
              />
            </label>
            <label htmlFor="check-description">
              Descrição
              <input
                type="radio"
                name="radio-search"
                id="check-description"
                checked={radioInput === 'description'}
                onClick={() => this.setState({ radioInput: 'description' })}
              />
            </label>
          </LabelSearch>
          <SearchInput>
            <img src={SearchIcon} alt="Buscar" />
            <input
              type="text"
              id="search"
              placeholder="Buscar cursos"
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
                <th>Descrição</th>
                <th>Ações</th>
              </TableRows>
            </thead>
            <tbody>
              {data.map(course => (
                <TableRows key={course._id}>
                  <td>{course.title}</td>
                  <td>{course.description}</td>
                  <td>
                    <EditButton
                      type="button"
                      onClick={() => {
                        this.handleSelectCourse(course._id);
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
  course: state.course,
});

const mapDispatchToProps = dispatch => bindActionCreators(CourseActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Course);
