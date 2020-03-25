import React, { useEffect, useState } from 'react';
import {
  Switch,
  Route,
  Redirect,
  withRouter
  , useHistory
} from 'react-router-dom';
import PropTypes from 'prop-types';

import './App.css';
import { CSSTransition } from 'react-transition-group';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { socketAuthOpen } from './shared/websocket';
import cancelToken from './shared/cancel-token';
import { validateUser } from './modules/Auth/api';
import {
  successSignIn,
  failSignIn
} from './modules/Auth/actions/user';
import Sidebar from './modules/Sidebar';
import MapHolder from './modules/MapHolder';
import StartModal from './modules/MapHolder/components/StartModal';
import SignUpPassword from './modules/Auth/submodules/SignUp/submodules/SignUpPassword';
import ResetPassword from './modules/Auth/submodules/Reset/submodules/ResetPassword';
import { setActive } from './modules/Sidebar/components/ItemList/actions/list';

const ValidateCancelToken = cancelToken();

const useStyles = makeStyles({
  mainStyle: {
    display: 'flex',
    justifyContent: 'flex-start',
    width: '100%'
  },
  startModalFadeEnter: {
    opacity: 0,
    transform: 'translateY(-150px)'
  },
  startModalFadeEnterActive: {
    opacity: 1,
    transform: 'translateY(0)',
    transition:
      'opacity 0.5s ease, transform 0.5s ease-in-out'
  },
  startModalFadeExit: {
    opacity: 1
  },
  startModalFadeExitActive: {
    opacity: 0,
    transform: 'translateY(150px)',
    transition:
      'opacity 0.5s linear, transform 0.5s ease-in-out'
  },
  startModalFadeAppear: {
    opacity: 0,
    transform: 'translateY(150px)'
  },
  startModalFadeAppearActive: {
    opacity: 1,
    transform: 'translateY(0)',
    transition:
      'opacity 0.5s linear, transform 0.5s ease-in-out'
  }
});

const Main = () => {
  const [visible, setVisible] = useState(true);

  return (
    <>
      <Sidebar setVisible={setVisible} visible={visible} />
      <MapHolder
        setVisible={setVisible}
        visible={visible}
      />
    </>
  );
};

const App = ({
  success,
  fail,
  location,
  mapData,
  makeItemActive,
  user
}) => {
  const classes = useStyles();
  const transitionClasses = {
    enter: classes.startModalFadeEnter,
    enterActive: classes.startModalFadeEnterActive,
    exit: classes.startModalFadeExit,
    exitActive: classes.startModalFadeExitActive,
    appear: classes.startModalFadeAppear,
    appearActive: classes.startModalFadeAppearActive
  };
  const { pathname, search } = location;
  const closeModal =
    sessionStorage.getItem('startModal') === 'close';
  const [isStartModalOpen, setStartModal] = useState(
    !closeModal
  );
  const history = useHistory();
  const [didMount, setDidMount] = useState(false);

  if (pathname === '/' && search && mapData.length) {
    makeItemActive(search.split('=')[1]);
  }

  useEffect(() => {
    setDidMount(true);
    (async () => {
      try {
        const { data, headers } = await validateUser();
        const { authorization } = headers;
        success(data, authorization);
        socketAuthOpen();
        setStartModal(false);
      } catch (e) {
        fail();
      }
    })();

    return () => {
      ValidateCancelToken.cancel();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (didMount) history.push('/');
    // eslint-disable-next-line
  }, [user]);

  return (
    <div className="App">
      <div className={classes.mainStyle}>
        <Switch>
          <Route
            path="/signup/:email/:token"
            component={SignUpPassword}
          />
          <Route
            path="/reset/:email/:token"
            component={ResetPassword}
          />
          <Route path="/" component={Main} />
          <Redirect from="*" to="/" />
        </Switch>
      </div>
      {(location.pathname === '/') && (
        <CSSTransition
          in={isStartModalOpen}
          classNames={transitionClasses}
          appear
          timeout={1000}
          unmountOnExit
        >
          <StartModal setStartModal={setStartModal} />
        </CSSTransition>
      )}
    </div>
  );
};

App.defaultProps = {
  user: null
};

App.propTypes = {
  success: PropTypes.func.isRequired,
  fail: PropTypes.func.isRequired,
  mapData: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string,
      address: PropTypes.string,
      location: PropTypes.shape({
        type: PropTypes.string,
        coordinates: PropTypes.arrayOf(PropTypes.number)
      })
    })
  ).isRequired,
  makeItemActive: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired
  }).isRequired,
  user: PropTypes.shape({
    _id: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string
  })
};

export default connect(
  state => ({
    mapData: state.defs.mapData,
    user: state.user.user
  }),
  dispatch => ({
    success: (user, authorization) =>
      dispatch(successSignIn(user, authorization)),
    fail: () => dispatch(failSignIn()),
    makeItemActive: itemId => dispatch(setActive(itemId))
  })
)(withRouter(App));
