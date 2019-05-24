import styled from 'styled-components';
import metrics from '../styles/metrics';
import colors from '../styles/colors';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;

  h1 {
    margin: ${`${metrics.baseMargin * 2}px`};
  }
`;

export const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  margin-bottom: ${`${metrics.baseMargin * 3}px`};

  label {
    width: 100%;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    margin: ${`${metrics.baseMargin}px`};
  }

  input {
    margin-top: ${`${metrics.baseMargin}px`};
    padding: 5px;
    color: ${colors.white};
    border: none;
    border-radius: ${`${metrics.baseRadius}px`};
    background-color: ${colors.primaryLight};
    font-size: 20px;
  }
  button {
    margin-top: ${`${metrics.baseFontSize}px`};
    width: 100%;
    height: 50px;
    padding: 0 ${`${metrics.basePadding}px`};
    color: #fff;
    font-size: 20px;
    font-weight: bold;
    border: none;
    border-radius: ${`${metrics.baseRadius}px`};
    background-color: ${colors.primary};
  }
  select {
    padding: 5px;
    margin-top: 10px;
    font-size: 18px;
    color: white;
    background-color: ${colors.primaryLight};
  }
  a {
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    color: ${colors.regular};
  }
`;
export const TableScroll = styled.div`
  overflow: auto;
  width: 80%;
  height: 50%;
  border: solid thin ${colors.primary};
`;
export const Table = styled.table`
  border: solid thin ${colors.primary};
  border-radius: 3px;
  border-collapse: collapse;
  width: 100%;
  overflow: scroll;
`;

export const TableRows = styled.tr`
  td,
  th {
    border: 1px solid ${colors.primary};
    text-align: center;
    padding: 8px;
    font-size: 16px;
  }
`;

export const EditButton = styled.button`
  height: 20px;
  padding: 0 ${`${metrics.basePadding}px`};
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: ${`${metrics.baseRadius}px`};
  background-color: ${colors.warning};
`;
export const ExcludeButton = styled.button`
  height: 20px;
  padding: 0 ${`${metrics.basePadding}px`};
  margin: 0 0 0 40px;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: ${`${metrics.baseRadius}px`};
  background-color: ${colors.primary};
`;
export const Search = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
export const LabelSearch = styled.div`
  label {
    margin-right: ${`${metrics.baseMargin}px`};
    margin-left: ${`${metrics.baseMargin}px`};
  }
`;
export const SearchInput = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: ${`${metrics.basePadding - 10}px`};
  margin: ${`${metrics.basePadding}px`} 0;
  background-color: ${colors.primaryLight};
  border-radius: ${`${metrics.baseRadius}px`};
  input {
    outline: none;
    width: 100%;
    font-size: ${`${metrics.baseFontSize + 3}px`};
    color: ${colors.white};
    border: none;
    background-color: transparent;
  }
  img {
    width: 16px;
    height: 16px;
    margin-right: ${`${metrics.baseMargin}px`};
  }
`;
