import jss from 'jss';
// eslint-disable-next-line import/no-extraneous-dependencies
import preset from 'jss-preset-default';

jss.setup(preset());

const styles = {
  pointCard: {
    padding: '20px 10px',
    minHeight: '100px',
    '&:not(:last-of-type)': {
      borderBottom: '1px solid #fff'
    },
    overflow: 'hidden',
    '&:hover': {
      background: '#686c7458',
      cursor: 'pointer'
    }
  },
  listOuterStyle: {
    width: '100%',
    height: 'calc(100vh - 100px)'
  },
  listStyle: {
    borderTop: '1px solid #fff3',
    borderBottom: '1px solid #fff3',
    paddingRight: '5px',
    '&:focus': {
      outline: 'none'
    },
    '&::-webkit-scrollbar': {
      width: '5px'
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: 'rgba(0,0,0,0.1)'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(255,255,255,0.3)'
    }
  },
  titleStyle: {
    color: '#fff',
    fontSize: '19px',
    lineHeight: '23px',
    marginBottom: '10px'
  },
  descStyle: {
    color: '#bbb',
    fontSize: '13px',
    lineHeight: '16px'
  },
  sidebarStyle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '360px',
    padding: '20px',
    maxHeight: '100vh',
    flexShrink: '0'
  },
  sidebarSetVisible: {
    display: 'none',
  },
  coordsStyle: {
    display: 'block',
    position: 'absolute',
    top: '0',
    left: '0',
    margin: '12px',
    backgroundColor: '#3c3c3c',
    color: '#ffffff',
    zIndex: '1',
    padding: '7px',
    fontWeight: 'bold'
  },

  mapStyle: {
    position: 'absolute',
    top: '0',
    right: '0',
    left: '0',
    bottom: '0',
    width: '100%',
    height: '100%'
  },

  mapOuterStyle: {
    position: 'relative',
    height: '100vh',
    overflow: 'hidden',
  },
  mainStyle: {
    display: 'flex',
    justifyContent: 'flex-start',
    width: '100%'
  }
};

const { classes } = jss.createStyleSheet(styles).attach();

export default classes;
