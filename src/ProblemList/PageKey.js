import React from 'react';
import { Button, withStyles } from '@material-ui/core';

const StyledKeyButton = withStyles({
  root: {
    margin: '1%',
    padding: '1%',
    fontSize: 'medium',
  },
})(Button);

const PageKey = ({ direction, curPage, onClick }) => {
  if (direction === 'prev') {
    return <StyledKeyButton onClick={() => onClick(Number(curPage) - 1)}>👈</StyledKeyButton>;
  }
  return <StyledKeyButton onClick={() => onClick(Number(curPage) + 1)}>👉</StyledKeyButton>;
};

export default PageKey;