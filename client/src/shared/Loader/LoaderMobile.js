import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  '@keyframes rotating': {
    '100%': { transform: 'rotate(360deg)' }
  },

  loadCircle: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    background: 'rgba(140, 140, 140, 0.1)',
    border: '3px solid rgba(35, 35, 35, 0.3)',
    borderTopColor: '#rgba(0, 0, 0, 0.3)',
    borderBottomColor: ' rgba(240, 240, 240, 0.9)',
    filter: 'invert(1)',
    animation: '$rotating 0.7s ease infinite'
  }
}));

const Loader = () => {
  const classes = useStyles();

  return <div className={classes.loadCircle} />;
};

export default Loader;
