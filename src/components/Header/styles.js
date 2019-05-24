import styled from 'styled-components';
import metrics from '../../styles/metrics';
import colors from '../../styles/colors';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 80px;
  background: ${colors.primary};
  ul {
    display: flex;
    margin-left: ${`${metrics.baseMargin * 2}px`};
    align-items: center;
    list-style: none;
    li {
      margin: ${`${metrics.baseMargin}px`};

      a {
        font-size: 24px;
        text-decoration: none;
        color: ${colors.white};
        font-weight: bold;
      }
    }
  }
`;
