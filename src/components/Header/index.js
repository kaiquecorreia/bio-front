import React from 'react';
import { Link } from 'react-router-dom';

import { Container } from './styles';

const Header = () => (
  <Container>
    <ul>
      <li>
        <Link to="/course">Cursos</Link>
      </li>
      <li>
        <Link to="/student">Alunos</Link>
      </li>
      <li>
        <Link to="/">Matrículas</Link>
      </li>
    </ul>
  </Container>
);

export default Header;
